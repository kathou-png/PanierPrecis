import express from "express";
import { device } from "../controllers/controllers";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();
const bcrypt = require("bcrypt");

router.post("/device", device);

router.get("/", function (req, res) {
  res.send({ message: "Hello from backend" });
});
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

router.get("/login", async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: req.query.email as string,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(
      req.query.password as string,
      user.password
    );
    const pw = req.query.password as string;
    if (pw !== user.password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    res.status(200).json({ message: "Login successful", data: user });
  } catch (error) {
    // Handle errors
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
