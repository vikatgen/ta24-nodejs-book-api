import prisma from "../src/config/prisma.js";
import { faker } from "@faker-js/faker/locale/en";

const databaseSeeder = async () => {
    for(let i = 0; i < 50; i++) {
        const book = await prisma.book.create({
            data: {
                title: faker.book.title(),
                description: faker.lorem.sentence(),
                thumbnail_url: faker.image.url(),
                release_year: new Date(faker.date.anytime()).getFullYear(),
            }
        })
    }
}

try {
    await databaseSeeder();
    prisma.$disconnect();
} catch (exception) {
    console.error(exception);
    prisma.$disconnect();
    process.exit(1);
}


