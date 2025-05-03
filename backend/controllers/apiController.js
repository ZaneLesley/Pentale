const {PrismaClient} = require('../generated/prisma');
const prisma = new PrismaClient();

exports.getRandomPlayerByDate = async (req, res) => {
    // Get how many entries are in 2024 for playerPerSplits
    try {
        const count = await prisma.player.count({
            where: {
                PlayerPerSplit: {
                    some: {
                        date: {
                            gte: new Date('2025-01-01'),
                        }
                    }
                }
            }
        });

        const index = Math.floor(Math.random() * count);

        const randomPlayer = await prisma.player.findMany({
            skip: index,
            take: 1,
            where: {
                PlayerPerSplit: {
                    some: {
                        date: {
                            gte: new Date('2025-01-01'),
                        }
                    }
                }
            }
        });

        res.json(randomPlayer);
    } catch (error) {
        res.status(500).json({error: `${error}`});
    }
};
