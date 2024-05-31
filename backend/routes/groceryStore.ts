import express from "express";
import { device } from "../controllers/controllers";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

router.get("/groceryStores/byUserId", async function (req, res) {
  const userId = req.query.userId ? Number(req.query.userId) : 0;
  try {
    const groceryStores = await prisma.groceryStore.findMany({
      where: {
        userId: userId,
      },
    });

    if (!groceryStores) {
      return res.status(404).json({ error: "Grocery stores not found" });
    }
    res.status(200).json({ data: groceryStores });
  } catch (error) {
    // Handle errors
    console.error("Error Groceyr stores in:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
export default router;
