import express from "express";
import { PrismaClient, Invoice, GroceryStore } from "@prisma/client";
import { validateUserId } from "./helpers";

const prisma = new PrismaClient();
const router = express.Router();

// * THIS SHOULD BE DELETED ON PRODUCTION
router.get("/invoices", async function (_, res) {
  try {
    // Fetch all users from the database using Prisma
    const invoices = await prisma.invoice.findMany();

    res.json(invoices);
  } catch (error) {
    // Handle errors
    console.error("Error fetching invoices:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/invoices/byUser", async function (req, res) {
  const userId = req.query.userId;
  const { userId: parsedUserId, isValid, message } = validateUserId(userId);

  if (!isValid) {
    return res.status(400).json({ error: message });
  }

  try {
    const invoices = await prisma.invoice.findMany({
      where: {
        userId: parsedUserId,
      },
      include: {
        groceryStore: true,
      },
    });

    if (!invoices) {
      return res.status(404).json({ error: "Invoices not found" });
    }

    const responseData = invoices.map(
      (invoice: Invoice & { groceryStore: GroceryStore }) => ({
        id: invoice.id,
        title: invoice.title,
        created_at: invoice.createdAt,
        grocery_store: {
          id: invoice.groceryStore.id,
          title: invoice.groceryStore.title,
          location: invoice.groceryStore.location,
        },
      })
    );
    res.status(200).json({ data: responseData });
  } catch (error) {
    // Handle errors
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/invoices/byId", async function (req, res) {
  const invoiceId = req.query.invoiceId;
  try {
    const invoice = await prisma.invoice.findUnique({
      where: {
        id: Number(invoiceId),
      },
      include: {
        items: true,
      },
    });

    if (!invoice) {
      return res.status(404).json({ error: "Invoice not found" });
    }

    // Validate that each item has a valid productId
    const invalidItems = invoice.items.filter((item) => !item.productId);
    if (invalidItems.length > 0) {
      return res
        .status(400)
        .json({ error: "Some items are not related to a product" });
    }

    // Get products for each item
    const products = await Promise.all(
      invoice.items.map(async (item) => {
        const product = await prisma.product.findUnique({
          where: {
            id: item.productId,
          },
          include: {
            category: true,
          },
        });
        if (!product) {
          throw new Error(`Product not found for item ${item.id}`);
        }
        return product;
      })
    );

    // Modify the response to include items and products
    const responseData = invoice.items.map((item, index) => ({
      id: item.id,
      reference: products[index].reference,
      title: products[index].title,
      createdAt: products[index].createdAt,
      unitPrice: item.unitPrice,
      quantity: item.quantity,
      totalPrice: item.totalPrice,
      category: products[index].category.title,
    }));
    res.status(200).json({ data: responseData });
  } catch (error) {
    // Handle errors
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/invoice", async (req, res) => {
  const { title, userId, groceryStoreId } = req.body;
  const { userId: parsedUserId, isValid, message } = validateUserId(userId);

  if (!isValid) {
    return res.status(400).json({ error: message });
  }

  try {
    const invoice = await prisma.invoice.create({
      data: {
        title: title,
        userId: parsedUserId,
        groceryStoreId: groceryStoreId,
      },
    });
    res.status(201).json(invoice);
  } catch (error) {
    res.status(500).json({ error: "Error logging in" });
  }
});
router.delete("/invoice", async (req, res) => {
  const { invoiceId } = req.query;

  try {
    await prisma.invoice.delete({
      where: {
        id: Number(invoiceId),
      },
    });
    res.status(201).json("OK");
  } catch (error) {
    res.status(500).json({ error: "marche po" });
  }
});

export default router;
