const {PrismaClient} = require("../generated/prisma");
const path = require("path");
const prisma = new PrismaClient();

exports.fetchTeam = async (teamId) => {
    return prisma.team.findUnique({
        where: {
            id: teamId,
        },
        select: {
            name: true,
            league: true,
            abbreviation: true,
            image: true,
        }
    })
};

exports.fetchTeamImagePath = (imagePath) => {
    return path.join(__dirname, '../prisma', imagePath)
}