const {PrismaClient} = require('../generated/prisma');
const {runScraperFile} = require('../python/scraper_controller');

const prisma = new PrismaClient();

function normalizeString(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

async function main() {
    try {
        await prisma.playerPerSplit.deleteMany({});
        await prisma.$executeRaw`TRUNCATE TABLE "PlayerPerSplit" RESTART IDENTITY CASCADE;`;
        await prisma.player.deleteMany({});
        await prisma.$executeRaw`TRUNCATE TABLE "Player" RESTART IDENTITY CASCADE;`;

        const jsonFile = ['unique_player_data.json', 'player_data.json'];

        const result = await runScraperFile('player_scraper.py', jsonFile);

        for (const key of jsonFile) {

            if (key === jsonFile[0]) {
                for (const player of result[jsonFile[0]]) {
                    await prisma.player.create({
                        data: {
                            name: player
                        },
                    });

                    console.log(`Inserted player ${player} into player database successfully.`);
                }
            }

            if (key === jsonFile[1]) {
                for (const eventData of Object.values(result[jsonFile[1]])) {
                    for (const teamData of Object.values(eventData)) {
                        for (const playerData of Object.values(teamData)) {
                            for (const player of Object.values(playerData)) {
                                for (const entry of player) {
                                    try {
                                        const playerRecord = await prisma.player.findUnique({ where: { name: entry.Player } });
                                        const teamRecord = await prisma.team.findFirst({ where: { name: entry.Team } });

                                        if (!playerRecord || !teamRecord) {
                                            console.warn(`Missing data for ${entry.Player} (${entry.Team})`);
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
        }
    } catch (error) {
        console.log(error);
    } finally {
        console.log("Successfully finished.")
        await prisma.$disconnect();
    }
}

main();