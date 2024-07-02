import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

router.get("/categories", async function (_, res) {
  try {
    const categories = await prisma.category.findMany();

    if (!categories) {
      return res.status(404).json({ error: "Categories not found" });
    }

    res.status(201).json({ data: categories });
  } catch (error) {
    console.error("Error adding item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
export default router;
