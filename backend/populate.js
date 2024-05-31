const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { v4: uuidv4 } = require("uuid");

async function main() {
  await resetDatabase();

  console.log("---------- Database reset complete.----------");

  await seedDatabase();

  console.log("----------Population complete.----------");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

async function seedDatabase() {
  await seedUsers();

  await seedCategories();

  await seedGroceryStores();

  await seedProducts();

  await seedInvoices();

  await seedItems();
}
async function resetDatabase() {
  await prisma.item.deleteMany();
  await prisma.invoice.deleteMany();
  await prisma.product.deleteMany();
  await prisma.groceryStore.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();
}

async function seedUsers() {
  try {
    const users = [
      { username: "User 1", email: "user1@user1.com", password: "password1" },
      { username: "User 2", email: "user2@user2.com", password: "password2" },
    ];
    // Create users in the database
    await Promise.all(
      users.map(async (user) => {
        await prisma.user.create({
          data: user,
        });
      }),
    );

    console.log("*** Users populated successfully.***");
  } catch (error) {
    console.error("Error populating users:", error);
    process.exit(1); // Exit with error code
  }
}

async function seedCategories() {
  try {
    const categories = [
      { title: "home" },
      { title: "fruit" },
      { title: "vegetable" },
      { title: "meat" },
      { title: "fish" },
      { title: "alcohol" },
      { title: "drink" },
      { title: "hygenic" },
      { title: "beauty" },
      { title: "saltedItems" },
      { title: "sweetItems" },
      { title: "baby" },
      { title: "animals" },
      { title: "bio" },
      { title: "other" },
    ];

    // Create categories in the database
    await Promise.all(
      categories.map(async (category) => {
        await prisma.category.create({
          data: category,
        });
      }),
    );

    console.log("*** Categories populated successfully.***");
  } catch (error) {
    console.error("Error populating categories:", error);
    process.exit(1); // Exit with error code
  }
}

async function seedGroceryStores() {
  try {
    const groceryStores = [
      { title: "Auchan", location: "3 rue des connards" },
      { title: "Liddl", location: "10 avenue des violettes" },
    ];
    // Fetch all users from the database
    const users = await prisma.user.findMany();
    // Create grocery stores in the database
    await Promise.all(
      users.map(async (user) => {
        await Promise.all(
          groceryStores.map(async (groceryStore) => {
            await prisma.groceryStore.create({
              data: {
                ...groceryStore,
                userId: user.id, // Assuming there is a userId field in the groceryStore model
              },
            });
          }),
        );
      }),
    );

    console.log("*** Grocery stores populated successfully.***");
  } catch (error) {
    console.error("Error populating grocery stores:", error);
    process.exit(1); // Exit with error code
  }
}

async function seedProducts() {
  try {
    const categories = await prisma.category.findMany();

    const users = await prisma.user.findMany();

    await Promise.all(
      users.map(async (user) => {
        await Promise.all(
          categories.map(async (category) => {
            await prisma.product.createMany({
              data: [
                {
                  title: `Product1 of ${category.title} for user ${user.id}`,
                  reference: uuidv4(),
                  categoryId: category.id,
                  userId: user.id,
                },
                {
                  title: `Product2 of ${category.title} for user ${user.id}`,
                  reference: uuidv4(),
                  categoryId: category.id,
                  userId: user.id,
                },
              ],
            });
          }),
        );
      }),
    );
    console.log("*** Products populated successfully.***");
  } catch (error) {
    console.error("Error populating products:", error);
    process.exit(1); // Exit with error code
  }
}

async function seedInvoices() {
  try {
    // Fetch all users from the database
    const users = await prisma.user.findMany();

    // Fetch all grocery stores from the database
    const groceryStores = await prisma.groceryStore.findMany();

    // Create invoices for each user for each grocery store
    await Promise.all(
      users.map(async (user) => {
        await Promise.all(
          groceryStores.map(async (store) => {
            await prisma.invoice.create({
              data: {
                title: `Invoice for ${user.username} at ${store.title}`,
                userId: user.id,
                groceryStoreId: store.id,
              },
            });
          }),
        );
      }),
    );

    console.log("***Invoices populated successfully.***");
  } catch (error) {
    console.error("Error populating invoices:", error);
    process.exit(1); // Exit with error code
  }
}

async function seedItems() {
  try {
    // Fetch all invoices from the database
    const invoices = await prisma.invoice.findMany();

    // Fetch all products from the database
    const products = await prisma.product.findMany();

    // Create items for each product within each invoice
    await Promise.all(
      invoices.map(async (invoice) => {
        let price = 1;
        await Promise.all(
          products.map(async (product) => {
            await prisma.item.create({
              data: {
                quantity: 1, // Adjust quantity as needed
                totalPrice: price, // Assuming price is stored in the product model
                productId: product.id,
                invoiceId: invoice.id,
                totalPrice: price * 1,
                unitPrice: price,
              },
            });
            price += 1;
          }),
        );
      }),
    );
    console.log("***Items populated successfully.***");
  } catch (error) {
    console.error("Error populating items:", error);
    process.exit(1); // Exit with error code
  }
}
