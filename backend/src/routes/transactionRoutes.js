import express from "express";

const router = express.Router();
import {
  getTransactions,
  addTransaction,
  deleteTransaction,
  updateTransaction,
} from "../controllers/transactionController.js";

router.post("/add", addTransaction);
router.get(
  "/user/:userId",
  getTransactions
);
router.delete("/:id", deleteTransaction);
router.put("/:id", updateTransaction);
export default router;
