import express from "express";
import { PrismaClient } from "@prisma/client";
import { validateUserId } from "./helpers";

const prisma = new PrismaClient();
const router = express.Router();

router.get("/products/byUserId", async function (req, res) {
  const userId = req.query.userId;
  const { userId: parsedUserId, isValid, message } = validateUserId(userId);

  if (!isValid && parsedUserId === undefined) {
    return res.status(400).json({ error: message });
  }

  try {
    const products = await prisma.product.findMany({
      where: {
        userId: parsedUserId,
      },
      include: {
        category: true,
      },
    });

    if (!products) {
      return res.status(404).json({ error: "Products not found" });
    }
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
