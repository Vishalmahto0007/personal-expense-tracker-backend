const Expense = require("../models/expense");

exports.createExpense = async (req, res, next) => {
  try {
    const expense = new Expense({
      ...req.body,
      creator: req.userId,
    });

    await expense.save();
    res.status(201).json(expense);
  } catch (error) {
    next(error);
  }
};

exports.getExpenses = async (req, res, next) => {
  try {
    const userId = req.userId;
    const skip = parseInt(req.query.skip) || 0;
    const limit = parseInt(req.query.limit) || 9;

    const { search = "", category } = req.query;

    const filter = { creator: userId };

    if (category && category !== "All Categories") {
      filter.category = category;
    }

    if (search.trim()) {
      filter.$or = [
        { title: { $regex: search.trim(), $options: "i" } },
        { description: { $regex: search.trim(), $options: "i" } },
      ];
    }

    const expenses = await Expense.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Expense.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);
    const currentPage = Math.floor(skip / limit) + 1;

    res.status(200).json({
      expenses,
      total,
      totalPages,
      currentPage,
    });
  } catch (error) {
    next(error);
  }
};

exports.getExpenseById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const expense = await Expense.findById(id);

    if (!expense || expense.creator.toString() !== req.userId) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.status(200).json(expense);
  } catch (error) {
    next(error);
  }
};

exports.updateExpense = async (req, res, next) => {
  try {
    const { id } = req.params;
    const expense = await Expense.findById(id);

    if (!expense || expense.creator.toString() !== req.userId) {
      return res
        .status(404)
        .json({ message: "Expense not found or unauthorized" });
    }

    Object.assign(expense, req.body);
    const updatedExpense = await expense.save();
    res.status(200).json(updatedExpense);
  } catch (error) {
    next(error);
  }
};

exports.deleteExpense = async (req, res, next) => {
  try {
    const { id } = req.params;
    const expense = await Expense.findById(id);

    if (!expense || expense.creator.toString() !== req.userId) {
      return res
        .status(404)
        .json({ message: "Expense not found or unauthorized" });
    }

    await Expense.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
