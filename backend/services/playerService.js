const prisma = require("../prismaClient.js");
const path = require("path");

const playerPerSplitService = require('../services/playerPerSplitService');
const teamService = require('../services/teamService');

exports.fetchRandomPlayerByDate = async (date = '2024') => {
    // FIXME: What if there is no count for that date ?
    try {
        const count = await prisma.player.count({
            where: {
                PlayerPerSplit: {
                    some: {
                        date: {
                            gte: new Date(`${date}-01-01`),
                        }
                    }
                }
            }
        });
        const index = Math.floor(Math.random() * count);
        return await prisma.player.findMany({
            skip: index,
            take: 1,
            where: {
                PlayerPerSplit: {
                    some: {
                        date: {
                            gte: new Date(`${date}-01-01`),
                        }
                    }
                }
            }
        });
    } catch (error) {
        console.log(error);
    }
};

exports.fetchPlayerFullData = async (year) => {
    try {
        const player = await exports.fetchRandomPlayerByDate(year);
        const playerPerSplit = await playerPerSplitService.fetchPlayerPerSplitData(player[0].id);
        const team = await teamService.fetchTeam(playerPerSplit.teamId);
        return {
            ...player[0],
            playerPerSplit: playerPerSplit,
            team: team,
        };
    } catch (e) {
        console.error(e);
    }
};

exports.fetchPlayerData = async (username) => {
    return prisma.player.findFirst({
        where: {
            name: {
                equals: username
            }
        }
    });
};

exports.fetchPlayerByPerSplitId = async (perSplitId) => {
    try {
        const playerPerSplit = await prisma.playerPerSplit.findUnique({
            where: {
                id: perSplitId,
            }
        });
        const player = await prisma.player.findUnique({
            where: {
                id: playerPerSplit.playerId
            }
        });
        const team = await teamService.fetchTeam(playerPerSplit.teamId);
        return {
            player: {
                ...player,
                playerPerSplit,
                team
            }
        };
    } catch (e) {
        console.error(e);
    }
};

exports.fetchPlayerImagePath = (imagePath) => {
    return path.join(__dirname, '../prisma', imagePath);
};

exports.fetchSuggestions = async (username) => {
    try {
        return await prisma.player.findMany({
            where: {
                name: {
                    startsWith: username,
                    mode: 'insensitive'
                }
            },
            take: 10,
            orderBy: {
                name: 'asc'
            },
            select: {
                id: true,
                name: true
            }
        });
    } catch (error) {
        console.error("Error getting Suggestions:", error);
        throw error;
    }
};
