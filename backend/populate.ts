import { Category, PostUserPayload } from "./types";

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {

  await resetDatabase();

  console.log('---------- Database reset complete.----------');

  await seedDatabase();

  console.log("----------Population complete.----------");
  
}

main()
  .catch(e => {
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
    const users : PostUserPayload[] = [
      { name: 'User 1', email: 'user1@user1.com', password : "password1" },
      { name: 'User 2', email: 'user2@user2.com', password: "password2" },
    ];  
    // Create users in the database
    await Promise.all(
      users.map(async (user) => {
        await prisma.user.create({
          data: user,
        });
      })
    );

    console.log('*** Users populated successfully.***');
  } catch (error) {
    console.error('Error populating users:', error);
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
      })
    );

    console.log('*** Categories populated successfully.***');
  } catch (error) {
    console.error('Error populating categories:', error);
    process.exit(1); // Exit with error code
  }
}

async function seedGroceryStores() {
  try {
    const groceryStores = [
      { title: 'Auchan', location: '3 rue des connards' },
      { title: 'Liddl', location: '10 avenue des violettes' },
    ];
    // Create grocery stores in the database
    await Promise.all(
      groceryStores.map(async (groceryStore) => {
        await prisma.groceryStore.create({
          data: groceryStore,
        });
      })
    );

    console.log('*** Grocery stores populated successfully.***');
  } catch (error) {
    console.error('Error populating grocery stores:', error);
    process.exit(1); // Exit with error code
  }
}

async function seedProducts() {
  try {
    const categories = await prisma.category.findMany();  

    const category1 = categories[0];
    const category2 = categories[1];
    let count = 0;
    await Promise.all(
      categories.map(async (category : Category) => {
        await prisma.category.update({
          where: {
            id: category.id,
          },
          data: {
            products: {
              create: [
                { title: `Product1 of ${category.title}`, reference: count, categoryId: category1.id},
                { title: `Product1 of ${category.title}`, reference: count+1, categoryId : category2.id },
              ],
            },
          },
        });
        count += 2;
      }));
    const products =  categories.map(async (category : Category) => {
    
              { title: `Product1 of ${category.title}`, reference: count, categoryId: category1.id},
              { title: `Product1 of ${category.title}`, reference: count+1, categoryId : category2.id },
         
          
        },
      });
      count += 2;
    }));
    // Create products in the database
    await Promise.all(
      products.map(async (product) => {
        await prisma.product.create({
          data: product,
        });
      })
    );

    console.log('*** Products populated successfully.***');
  } catch (error) {
    console.error('Error populating products:', error);
    process.exit(1); // Exit with error code
  }
}

async function seedInvoices() {
  try {
    const invoices = [
      { title: 'Invoice 1', userId: 1, groceryStoreId: 1 },
      { title: 'Invoice 2', userId: 2, groceryStoreId: 2 },
    ];
    // Create invoices in the database
    await Promise.all(
      invoices.map(async (invoice) => {
        await prisma.invoice.create({
          data: invoice,
        });
      })
    );
    // const invoice1 = await prisma.invoice.create({
    //   data: {
    //     title: 'Invoice 1',
    //     userId: user1.id,
    //     createdAt: new Date(),
    //     groceryStoreId: groceryStore1.id,
    //   },
    // });

    console.log('Invoices populated successfully.');
  } catch (error) {
    console.error('Error populating invoices:', error);
    process.exit(1); // Exit with error code
  }
}

async function seedItems(){
  try {
    const items = [
      { unitPrice: 10, totalPrice: 20, quantity: '2', invoiceId: 1, productId: 1 },
      { unitPrice: 15, totalPrice: 30, quantity: '2', invoiceId: 2, productId: 2 },
    ];
    // Create items in the database
    await Promise.all(
      items.map(async (item) => {
        await prisma.item.create({
          data: item,
        });
      })
    );
      // Create Items
  // await prisma.item.create({
  //   data: {
  //     unitPrice: 10,
  //     totalPrice: 20,
  //     quantity: '2',
  //     invoiceId: invoice1.id,
  //     productId: product1.id,
  //   },
  // });

    console.log('Items populated successfully.');
  } catch (error) {
    console.error('Error populating items:', error);
    process.exit(1); // Exit with error code
  }
}