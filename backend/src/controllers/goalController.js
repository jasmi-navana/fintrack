import prisma from "../config/prisma.js";

export const createGoal = async (req, res) => {
  try {
    console.log("BODY:", req.body);

    const { title, targetAmount, months, userId } = req.body;

    const goal = await prisma.goal.create({
      data: {
        title,
        targetAmount: Number(targetAmount),
        months: Number(months),
        userId,
      },
    });

    res.json(goal);
  } catch (error) {
  console.log("GOAL ERROR:", error);
  res.status(500).json({
    error: error.message,
  });
}
};
export const getGoals = async (req, res) => {
  try {
    const userId = Number(req.params.userId);

    const goals = await prisma.goal.findMany({
      where: { userId },
    });

    res.json(goals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const updateGoal = async (req, res) => {
  const id = Number(req.params.id);

  const { title, targetAmount, months } =
    req.body;

  const goal = await prisma.goal.update({
    where: { id },
    data: {
      title,
      targetAmount: Number(targetAmount),
      months: Number(months),
    },
  });

  res.json(goal);
};
export const deleteGoal = async (req, res) => {
  const id = Number(req.params.id);

  await prisma.goal.delete({
    where: { id },
  });

  res.json({
    success: true,
  });
};