const {runStatsFile} = require('../python/scraper_controller');
const fs = require("fs");
const {PrismaClient} = require('../generated/prisma')

const prisma = new PrismaClient();
async function main(){
    await runStatsFile();

    const data = JSON.parse(fs.readFileSync('temp_player_stats.json', 'utf8'));

    try {
        for (const row of data) {
            for (const [player, stats] of Object.entries(row)) {
                const cspm = stats["Gamelength Number"] === 0 ? 0 : Math.round((stats.CS / stats["Gamelength Number"]) * 10) / 10;
                await prisma.player.update({
                    data: {
                        kills: stats.Kills,
                        assists: stats.Assists,
                        deaths: stats.Deaths,
                        cspm: cspm,
                        record: `${stats.Win} - ${stats.Loss}`
                    },
                    where: {
                        name: player
                    }
                })
            }
        }
    } catch (error) {
        console.log(error);
    } finally {
        prisma.$disconnect()
        console.log("records added")
    }

}

main()