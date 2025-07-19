const {fetchPlayerPerSplitData} = require('../services/playerPerSplitService');
const prismaClient = require('../prismaClient');
const faker = require('./__fixtures__/faker');

jest.mock("../prismaClient.js", () => ({
    playerPerSplit: {
        findFirst: jest.fn()
    }
}));


describe('playerPerSplitServiceData', () => {
    it('Test shape of the data, and ensure it gets right data for id', async () => {
        const mockData = faker.playerPerSplit
        prismaClient.playerPerSplit.findFirst.mockResolvedValue(mockData);

        const result = await fetchPlayerPerSplitData(faker.id)

        expect(prismaClient.playerPerSplit.findFirst).toHaveBeenCalledWith({
            where: { playerId: faker.id },
            orderBy: {date: "desc"},
            select: {
                id: true,
                teamId: true,
                role: true,
                flag: true
            }
        });

        expect(result).toEqual(mockData)
    })

    it("returns null if the playerId is not a match", async () => {
        prismaClient.playerPerSplit.findFirst.mockResolvedValue(null);

        const result = await fetchPlayerPerSplitData(1)
        expect(result).toBeNull()
    })
})
