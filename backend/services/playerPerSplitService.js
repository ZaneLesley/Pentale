const prisma = require("../prismaClient.js");

exports.fetchPlayerPerSplitData = async (playerId) => {
    return prisma.playerPerSplit.findFirst({
        where: {
            playerId: playerId,
        },
        orderBy: {
            date: "desc"
        },
        select: {
            id: true,
            teamId: true,
            role: true,
            flag: true,
        }
    })
}