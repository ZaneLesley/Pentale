const {PrismaClient} = require('../generated/prisma');
const {runScraperFile} = require('../python/scraper_controller');
const prisma = new PrismaClient();

async function main() {
    try {
        await prisma.playerPerSplit.deleteMany({});
        await prisma.$executeRaw`TRUNCATE TABLE "PlayerPerSplit" RESTART IDENTITY CASCADE;`;
        await prisma.player.deleteMany({});
        await prisma.$executeRaw`TRUNCATE TABLE "Player" RESTART IDENTITY CASCADE;`;
    } catch (e) {
        console.error(e);

    }
    const jsonFile = ['unique_player_data.json', 'player_data.json'];
    const result = await runScraperFile('player_scraper.py', jsonFile);
    for (const eventData of Object.values(result[jsonFile[1]])) {
        for (const teamData of Object.values(eventData)) {
            for (const playerData of Object.values(teamData)) {
                for (const player of Object.values(playerData)) {
                    for (const entry of player) {
                        try {
                            // don't update anything if it exists
                            await prisma.player.upsert({
                                where: { name: entry.PlayerPage },
                                update: {},
                                create: {
                                    name: entry.PlayerPage,
                                },
                            });
                        } catch (e) {
                            console.error(e);
                        }
                        try {
                            const playerRecord = await prisma.player.findUnique({where: {name: entry.PlayerPage}});
                            const teamRecord = await prisma.team.findFirst({where: {name: entry.Team}});

                            if (!playerRecord || !teamRecord) {
                                // console.warn(`Missing data for ${entry.Player} (${entry.Team})`);
                                continue;
                            }

                            await prisma.playerPerSplit.create({
                                data: {
                                    playerId: playerRecord.id,
                                    teamId: teamRecord.id,
                                    role: entry.Role,
                                    flag: entry.Flag,
                                    link: entry.Link,
                                    event: entry.OverviewPage,
                                    date: new Date(entry.Date),
                                }
                            });
                        } catch (e) {
                            console.log(e);
                        }
                    }

                }
            }
        }
    }
}

main();