const prismaClient = require("../prismaClient");
const playerServiceData = require("../services/playerService");
const faker = require('./__fixtures__/faker.json');

jest.mock("../prismaClient.js", () => ({
    player: {
        count: jest.fn(),
        findMany: jest.fn(),
    }
}));
describe('fetchRandomPlayerByDate', () => {
    it('returns an array of a single player with expected shape', async () => {
        prismaClient.player.count.mockResolvedValue(10);
        prismaClient.player.findMany.mockResolvedValue([faker]);

        const result = await playerServiceData.fetchRandomPlayerByDate('2024');

        expect(prismaClient.player.count).toHaveBeenCalledWith({
            where: {
                PlayerPerSplit: {
                    some: {
                        date: {
                            gte: new Date(`2024-01-01`),
                        }
                    }
                }
            }
        });

        expect(prismaClient.player.findMany).toHaveBeenCalledWith({
            skip: expect.any(Number),
            take: 1,
            where: {
                PlayerPerSplit: {
                    some: {
                        date: {
                            gte: new Date(`2024-01-01`),
                        }
                    }
                }
            }
        })

        expect(result).toEqual([faker])
    });

    it('if no id is found, returns null', async () => {
        prismaClient.player.findMany.mockResolvedValue(null);
        const result = await playerServiceData.fetchRandomPlayerByDate('1000');
        expect(result).toBeNull();
    })
});

