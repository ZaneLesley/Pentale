const {runPlayerImageFile} = require('../python/scraper_controller');
const fs = require("fs");
const {PrismaClient} = require('../generated/prisma');

const prisma = new PrismaClient();

async function main() {
    await runPlayerImageFile('player_image_scraper.py');

    const data = JSON.parse(fs.readFileSync('player_image.json', 'utf8'));
    try {
        for (const row of data) {
            for ([player, fileLocation] of Object.entries(row)) {
                await prisma.player.update({
                    data: {
                        image: fileLocation
                    },
                    where: {
                        name: player
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