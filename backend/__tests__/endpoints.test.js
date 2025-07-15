const app = require("../app");
const supertest = require("supertest");
const request = supertest(app);

const prisma = app.locals.prisma;

it("Gets the test endpoint", async () => {
    const res = await request.get("/");

    expect(res.status).toBe(200);
});

afterAll(async () => {
    await prisma.$disconnect();
});

