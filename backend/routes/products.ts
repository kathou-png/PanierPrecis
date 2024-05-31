import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

router.get("/products/byUserId", async function (req, res) {
  const userId = req.query.userId ? Number(req.query.userId) : 0;
  try {
    const products = await prisma.product.findMany({
      where: {
        userId: userId,
      },
      include: {
        category: true,
      },
    });

    if (!products) {
      return res.status(404).json({ error: "Products not found" });
    }
    // Modify the response to include grocery store data
    const responseData = products.map((product) => ({
      id: product.id,
      title: product.title,
      created_at: product.createdAt,
      reference: product.reference,
      category: {
        id: product.categoryId,
        title: product.category.title,
      },
    }));
    res.status(200).json({ data: responseData });
  } catch (error) {
    // Handle errors
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
export default router;
