import express from "express";
import { device } from "../controllers/controllers";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();
const bcrypt = require("bcrypt");

router.get("/invoices", async function (req, res) {
  try {
    // Fetch all users from the database using Prisma
    const invoices = await prisma.invoice.findMany();

    // Return the users as a response
    res.json(invoices);
  } catch (error) {
    // Handle errors
    console.error("Error fetching invoices:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/invoices/byUser", async function (req, res) {
  const userId = req.query.userId ? Number(req.query.userId) : 0;
  try {
    const invoices = await prisma.invoice.findMany({
      where: {
        userId: userId,
      },
    });

    if (!invoices) {
      return res.status(404).json({ error: "Invoices not found" });
    }
    res.status(200).json({ data: invoices });
  } catch (error) {
    // Handle errors
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/items/byInvoice", async function (req, res) {
  const invoiceId = req.query.invoiceId ? Number(req.query.invoiceId) : 0;
  try {
    const items = await prisma.item.findMany({
      where: {
        invoiceId: invoiceId,
      },
    });

    if (!items) {
      return res.status(404).json({ error: "Items not found" });
    }
    res.status(200).json({ data: items });
  } catch (error) {
    // Handle errors
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
export default router;
