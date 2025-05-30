const {PrismaClient} = require("../generated/prisma");
const prisma = new PrismaClient();
const path = require("path");


exports.getRandomPlayerByDate = async (date = '2011') => {
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

exports.getPlayerData = async (username) => {
    return prisma.player.findFirst({
        where: {
            name: {
                equals: username,
                mode: "insensitive"
            }
        }
    });
};

exports.getPlayerImagePath = (imagePath) => {
    return path.join(__dirname, '../prisma', imagePath)
}

exports.getSuggestions = async (username) => {
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
}
