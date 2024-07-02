import express from "express";

const router = express.Router();

router.get("/", function (_, res) {
  res.send({ message: "Hello from backend" });
});

export default router;
