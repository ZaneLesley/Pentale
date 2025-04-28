const {PrismaClient} = require('../generated/prisma');
const {runScraperFile} = require('../python/scraper_controller');

const prisma = new PrismaClient();

const abbreviations = {
    "Europe League Championship Series": "LEC",
    "League of Legends Championship Series": "LCS",
    "LoL Champions Korea": "LCK",
    "League of Legends Championship of The Americas North": "LTA North",
    "League of Legends Championship of The Americas South": "LTA South",
    "North America League Championship Series": "LCS",
    "Tencent LoL Pro League": "LPL",
    "LoL The Champions": "LCK",
    "LoL EMEA Championship": "LEC",
};

async function main() {
    try {
        await prisma.playerPerSplit.deleteMany({});
        await prisma.$executeRaw`TRUNCATE TABLE "PlayerPerSplit" RESTART IDENTITY CASCADE;`;
        await prisma.player.deleteMany({});
        await prisma.$executeRaw`TRUNCATE TABLE "Player" RESTART IDENTITY CASCADE;`;
        await prisma.team.deleteMany({});
        await prisma.$executeRaw`TRUNCATE TABLE "Team" RESTART IDENTITY CASCADE;`;

        const jsonFile = 'team_scraper.json';

        const result = await runScraperFile('team_scraper.py', [jsonFile]);
        const teamsByLeague = result[jsonFile];

        for (const [league, teams] of Object.entries(teamsByLeague)) {
            for (const team of teams) {
                await prisma.team.create({
                    data: {
                        name: team,
                        league: league,
                        abbreviation: abbreviations[league],
                    },
                });
                console.log(`Inserted team ${team} into league ${league}`);
            }
        }

        console.log('All teams inserted into database');
    } catch (err) {
        console.error(err);
    } finally {
        await prisma.$disconnect();
    }
}

main();
