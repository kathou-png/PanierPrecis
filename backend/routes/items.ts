import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

router.post("/invoice/newItem", async function (req, res) {
  const { unitPrice, totalPrice, quantity, productId, invoiceId} = req.body;

  try {
    const invoice = await prisma.invoice.findUnique({
      where: {
        id: Number(invoiceId),
      },
    });

    if (!invoice) {
      return res.status(404).json({ error: "Invoice not found" });
    }
    const products = await prisma.product.findMany();
    console.log(products);

    if (!products) {
      return res.status(404).json({ error: "Product not found" });
    }

    const newItem = await prisma.item.create({
      data: {
        unitPrice: unitPrice,
        totalPrice: totalPrice,
        quantity: quantity,
        invoiceId: Number(invoiceId),
        productId: Number(products[0].id),
      },
    });

    res.status(201).json({ data: newItem });
  } catch (error) {
    console.error("Error adding item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
export default router;