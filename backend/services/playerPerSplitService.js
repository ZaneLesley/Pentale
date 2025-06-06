const {PrismaClient} = require("../generated/prisma");
const prisma = new PrismaClient()

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