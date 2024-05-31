import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

router.post("/invoice/newItem", async function (req, res) {
  const { unitPrice, totalPrice, quantity, productReference, invoiceId } =
    req.body;
  console.log(req.body);

  try {
    const invoice = await prisma.invoice.findUnique({
      where: {
        id: Number(invoiceId),
      },
    });

    if (!invoice) {
      return res.status(404).json({ error: "Invoice not found" });
    }
    console.log(productReference);
    console.log(await prisma.product.findMany());
    const product = await prisma.product.findUnique({
      where: {
        reference: String(productReference),
      },
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const newItem = await prisma.item.create({
      data: {
        unitPrice: unitPrice,
        totalPrice: totalPrice,
        quantity: Number(quantity),
        invoiceId: Number(invoiceId),
        productId: Number(product.id),
      },
    });

    res.status(201).json({ data: newItem });
  } catch (error) {
    console.error("Error adding item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/invoice/item", async function (req, res) {
  const { id, invoiceId } = req.query;
  try {
    const item = await prisma.item.delete({
      where: {
        id: Number(id),
        invoiceId: Number(invoiceId),
      },
    });
    res.status(201).json("OK");
  } catch (error) {
    res.status(500).json({ error: "marche po" });
  }
});
export default router;
