import prisma from "../src/config/prisma.js";
import { faker } from "@faker-js/faker/locale/en";

const databaseSeeder = async () => {
    await prisma.booking.deleteMany();
    await prisma.book.deleteMany();
    await prisma.author.deleteMany();
    await prisma.category.deleteMany();

    console.log('🌱 Starting to seed database...');

    let authors = [];
    let categories = faker.helpers.uniqueArray(() => faker.book.genre(), 15);

    let categoriesFromDatabase = [];

    console.log("🍆🍆🍆 Generating categories...")

    for (const category of categories) {
        const createdCategory = await prisma.category.create({
            data: {
                name: category,
            }
        });
        categoriesFromDatabase.push(createdCategory);
    }

    console.log("🧐 Generating authors...");

    for (let i = 0; i < faker.number.int({ min: 30, max: 50}); i++) {
        const author = await prisma.author.create({
            data: {
                name: faker.person.fullName()
            }
        });

        authors.push(author);
    }

    console.log(categoriesFromDatabase);

    console.log("📚 Generating books...");

    for(let i = 0; i < 50; i++) {
        const randomAuthor = authors[faker.number.int({ min: 0, max: authors.length - 1})];
        const randomCategory = categoriesFromDatabase[faker.number.int({ min: 0, max: categoriesFromDatabase.length - 1})];
        const stock = faker.number.int({ min: 0, max: 20 });

        let status;
        if (stock <= 0) status = 'OUT_OF_STOCK';
        else if (stock <= 3) status = 'LOW_STOCK';
        else status = 'AVAILABLE';

        const book = await prisma.book.create({
            data: {
                title: faker.book.title(),
                description: faker.lorem.sentence(),
                thumbnail_url: faker.image.url(),
                release_year: new Date(faker.date.anytime()).getFullYear(),
                stock: stock,
                rent_price: parseFloat(faker.commerce.price({ min: 1, max: 15, dec: 2 })),
                status: status,
                categories: {
                    create: {
                        category: {
                            connect: { id: randomCategory.id }
                        }
                    }
                },
                authors: {
                    create: {
                        author: {
                            connect: { id: randomAuthor.id }
                        }
                    }
                }
            }
        })
    }

    console.log("✅ Finished seeding database!")
}

try {
    await databaseSeeder();
    prisma.$disconnect();
} catch (exception) {
    console.error(exception);
    prisma.$disconnect();
    process.exit(1);
}