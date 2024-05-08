import express from "express";
import { device } from "../controllers/controllers";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

router.post("/device", device);

router.get("/users", async function (req, res) {
  try {
    // Fetch all users from the database using Prisma
    const users = await prisma.user.findMany();

    // Return the users as a response
    res.json(users);
  } catch (error) {
    // Handle errors
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
