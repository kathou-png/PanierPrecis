import express from "express";
import { device } from "../controllers/controllers";

const router = express.Router();

router.get("/", function (req, res) {
  res.send({ message: "Hello from backend" });
});

export default router;
