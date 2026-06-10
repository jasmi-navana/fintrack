import prisma from "../config/prisma.js";

export const addTransaction = async (req, res) => {
  try {
    const { title, amount, type, category, userId } = req.body;

    const transaction = await prisma.transaction.create({
      data: {
        title,
        amount: Number(amount),
        type,
        category,
        userId,
      },
    });

    res.json({
      success: true,
      transaction,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
export const getTransactions = async (req, res) => {
  try {
    const { userId } = req.params;

const transactions =
  await prisma.transaction.findMany({
    where: {
      userId: Number(userId),
    },
    orderBy: {
      createdAt: "desc",
    },
  });

    res.json({
      success: true,
      transactions,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
export const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.transaction.delete({
      where: {
        id: Number(id),
      },
    });

    res.json({
      success: true,
      message: "Transaction deleted",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
export const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await prisma.transaction.update({
      where: {
        id: Number(id),
      },
      data: {
        title: req.body.title,
        amount: Number(req.body.amount),
        type: req.body.type,
        category: req.body.category,
      },
    });

    res.json({
      success: true,
      transaction: updated,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Update Failed",
    });
  }
};