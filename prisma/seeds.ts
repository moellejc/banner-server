// api/db/seeds.js

const { PrismaClient } = require("@prisma/client");
const dotenv = require("dotenv");

dotenv.config();
const db = new PrismaClient();

async function main() {
  console.warn("Please define your seed data.");

  // return Promise.all(
  //   data.map(async (user) => {
  //     const record = await db.user.create({
  //       data: { name: user.name, email: user.email },
  //     })
  //     console.log(record)
  //   })
  // )
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await db.$disconnect();
  });
