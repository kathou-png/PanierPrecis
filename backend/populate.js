#!/usr/bin/env node

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  try {
    // Create users
    const user1 = await prisma.user.create({
      data: {
        email: "user1@example.com",
        username: "user1",
        password: "password1",
      },
    });

    const user2 = await prisma.user.create({
      data: {
        email: "user2@example.com",
        username: "user2",
        password: "password2",
      },
    });
    const marketPlace1 = await prisma.marketplace.create({
      data: {
        id: 1,
        name: "Auchan",
        invoices: [],
        userId: 1,
      },
    });
    const marketPlace2 = await prisma.marketplace.create({
      data: {
        id: 1,
        name: "Atac",
        invoices: [],
        userId: 2,
      },
    });

    // Create categories
    const category1 = await prisma.category.create({
      data: {
        name: "Category 1",
      },
    });

    const category2 = await prisma.category.create({
      data: {
        name: "Category 2",
      },
    });

    // Create invoices
    const invoice1 = await prisma.invoice.create({
      data: {
        name: "Invoice 1",
        userId: user1.id,
        marketPlaceId: 1,
      },
    });

    const invoice2 = await prisma.invoice.create({
      data: {
        name: "Invoice 2",
        userId: user2.id,
        marketPlaceId: 2,
      },
    });

    // Create items
    const item1 = await prisma.item.create({
      data: {
        name: "Item 1",
        categoryId: category1.id,
        date: new Date(),
        price: 10.99,
        invoiceId: invoice1.id,
      },
    });

    const item2 = await prisma.item.create({
      data: {
        name: "Item 2",
        categoryId: category2.id,
        date: new Date(),
        price: 20.99,
        invoiceId: invoice2.id,
      },
    });

    console.log("Database populated successfully");
  } catch (error) {
    console.error("Error populating database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
