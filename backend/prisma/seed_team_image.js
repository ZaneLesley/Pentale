const {runTeamImageFile} = require('../python/scraper_controller');
const fs = require('fs');
const {PrismaClient} = require('../generated/prisma');

const prisma = new PrismaClient();

async function main() {
    // await runTeamImageFile('team_image_scrapper.py');

    const data = JSON.parse(fs.readFileSync('team_image.json', 'utf8'));
    try {
        for (const row of data) {
            for ([team, fileLocation] of Object.entries(row)) {
                await prisma.team.update({
                    data: {
                        Image: fileLocation
                    },
                    where: {
                        name: team
                    }
                });
            }
        }
    } catch (error) {
        console.log(error);
    } finally {
        await prisma.$disconnect();
    }
}

main();