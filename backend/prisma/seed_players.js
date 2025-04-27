const { PrismaClient } = require('../generated/prisma');
const { runScraperFile } = require('../python/scraper_controller');

const prisma = new PrismaClient();

async function main() {
    try {
        await prisma.team.deleteMany({});
        await prisma.$executeRaw`TRUNCATE TABLE "Team" RESTART IDENTITY CASCADE;`;

        const jsonFile = ['player_data.json', 'unique_player_data.json']

        const result = await runScraperFile('player_scraper.py', [jsonFile]);

        jsonFile.forEach((key) => {
            console.log(result[key]);
        })

    } catch (error) {
        console.log(error);
    } finally {
        await prisma.$disconnect()
    }
}

main()