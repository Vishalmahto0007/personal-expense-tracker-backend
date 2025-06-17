const express = require("express");
const router = express.Router();
const expenseController = require("../controllers/expenseController");
const isAuth = require("../middleware/is-auth");

router.post("/", isAuth, expenseController.createExpense);
router.get("/", isAuth, expenseController.getExpenses);
router.get("/:id", isAuth, expenseController.getExpenseById);
router.put("/:id", isAuth, expenseController.updateExpense);
router.delete("/:id", isAuth, expenseController.deleteExpense);

module.exports = router;
