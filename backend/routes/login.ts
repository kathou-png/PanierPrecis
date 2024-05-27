import express from "express";
import { device } from "../controllers/controllers";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    try {
      const user = await prisma.user.findUnique({
        where: { email : email as string },
      });
      if (!user || user.password !== password) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
      res.json({ message: 'Login successful', data : user });
    } catch (error) {
      res.status(500).json({ error: 'Error logging in' });
    }
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
