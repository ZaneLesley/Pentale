const {runStatsFile} = require('../python/scraper_controller');
const fs = require("fs");
const {PrismaClient} = require('../generated/prisma');

const prisma = new PrismaClient();

async function main() {
    // await runStatsFile();

    const data = JSON.parse(fs.readFileSync('temp_player_stats.json', 'utf8'));

    try {
        for (const row of data) {
            for (const [player, stats] of Object.entries(row)) {
                const cspm = stats["Gamelength Number"] === 0 ? 0 : Math.round((stats.CS / stats["Gamelength Number"]) * 10) / 10;
                const playerRecord = await prisma.player.findFirst({
                    where: {
                        // This is the link attribute, need to compare it to the playerId and update it there
                        PlayerPerSplit: {
                            some: {
                                link: player
                            }
                        }
                    },
                    select: {
                        id: true
                    }
                });
                if (playerRecord) {
                    await prisma.player.update({
                        where: {
                            id: playerRecord.id
                        },
                        data: {
                            kills: {
                                increment: stats.Kills
                            },
                            assists: {
                                increment: stats.Assists
                            },
                            deaths: {
                                increment: stats.Deaths
                            },
                            cspm: {
                                increment: cspm
                            },
                            wins : {
                                increment: stats.Win
                            },
                            losses : {
                                increment: stats.Loss
                            }
                        }
                    });
                }
            }
        }
    } catch (error) {
        console.log(error);
    } finally {
        prisma.$disconnect();
        console.log("records added");
    }

}

main();