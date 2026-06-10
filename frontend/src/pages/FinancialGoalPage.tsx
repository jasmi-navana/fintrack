import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { createGoal, getGoals } from "../services/goalService";
import axios from "axios";
function FinancialGoalPage() {
  const [goalName, setGoalName] = useState("");
  const [goalAmount, setGoalAmount] = useState("");
  const [months, setMonths] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [goals, setGoals] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
const totalIncome = transactions
  .filter((t: any) => t.type === "Income")
  .reduce((sum: number, t: any) => sum + t.amount, 0);

const totalExpense = transactions
  .filter((t: any) => t.type === "Expense")
  .reduce((sum: number, t: any) => sum + t.amount, 0);

const currentSavings =
  totalIncome - totalExpense; // temporary value
const user = JSON.parse(
  localStorage.getItem("user") || "{}"
);
const fetchTransactions = async () => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/transactions/user/${user.id}`
    );

    const data = await response.json();

    if (data.success) {
      setTransactions(data.transactions);
    }
  } catch (error) {
    console.log(error);
  }
};
useEffect(() => {
  fetchTransactions();
}, []);
const progress =
  goalAmount && currentSavings
    ? Math.min(
        (currentSavings / Number(goalAmount)) * 100,
        100
      )
    : 0;
  const monthlySaving =
    goalAmount && months
      ? Math.ceil(Number(goalAmount) / Number(months))
      : 0;
useEffect(() => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  if (user.id) {
    fetchGoals(user.id);
  }
}, []);

const fetchGoals = async (userId: number) => {
  const data = await getGoals(userId);
  setGoals(data);
};
const saveGoal = async () => {


  console.log("Save button clicked");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  await createGoal({
  title: goalName,
  targetAmount: Number(goalAmount),
  months: Number(months),
  userId: user.id,
});

  fetchGoals(user.id);

  alert("Goal Saved Successfully!");
  setGoalName("");
setGoalAmount("");
setMonths("");
};
const editGoal = (goal: any) => {
  setGoalName(goal.title);
  setGoalAmount(goal.targetAmount);
  setMonths(goal.months);

  setEditingId(goal.id);
};
const updateGoal = async () => {
  await axios.put(
    `http://localhost:5000/api/goals/${editingId}`,
    {
      title: goalName,
      targetAmount: goalAmount,
      months,
    }
  );

  fetchGoals(user.id);

  setEditingId(null);

  alert("Goal Updated Successfully");
};
const deleteGoal = async (id: number) => {
  if (!window.confirm("Delete this goal?"))
    return;

  await axios.delete(
    `http://localhost:5000/api/goals/${id}`
  );

  fetchGoals(user.id);
};
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
  <h1 className="text-4xl font-bold">
    Financial Goal Planner
  </h1>

  <Link
    to="/dashboard"
    className="bg-blue-600 text-white px-4 py-2 rounded"
  >
    Back to Dashboard
  </Link>
</div>
      

      <div className="border p-6 rounded bg-yellow-50">
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Goal Name"
            className="border p-2"
            value={goalName}
            onChange={(e) => setGoalName(e.target.value)}
          />

          <input
            type="number"
            placeholder="Goal Amount"
            className="border p-2"
            value={goalAmount}
            onChange={(e) => setGoalAmount(e.target.value)}
          />

          <input
            type="number"
            placeholder="Months"
            className="border p-2"
            value={months}
            onChange={(e) => setMonths(e.target.value)}
          />
          
          <button
  onClick={editingId ? updateGoal : saveGoal}
  style={{
    background: "#16a34a",
    color: "white",
    border: "none",
    padding: "12px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
  }}
>
  {editingId ? "Update Goal" : "Save Goal"}
</button>
        </div>

        {monthlySaving > 0 && (
            
          <div className="mt-6">
            <div className="mt-4 bg-white p-4 rounded">
  You need to save ₹{monthlySaving} per month.
</div>
  <div className="flex justify-between mb-2">
    <span>Goal Progress</span>
    <span>{progress.toFixed(0)}%</span>
  </div>

  <div className="w-full bg-gray-300 rounded-full h-5">
    <div
      className="bg-green-500 h-5 rounded-full"
      style={{
        width: `${progress}%`,
      }}
    ></div>
  </div>
  {progress >= 100 && (
  <div className="mt-4 bg-green-100 text-green-700 p-3 rounded">
    🎉 Congratulations! Goal Achieved🎉
  </div>
)}

  <p className="mt-2">
    ₹{currentSavings} saved out of ₹{goalAmount}
  </p>
</div>
          
          
        )}
        <div className="mt-8">
  <h2 className="text-xl font-bold mb-4">
    --
  </h2>

  <table
  style={{
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
  }}
>
  <h2
  style={{
    marginTop: "30px",
    marginBottom: "15px",
    fontSize: "28px",
    fontWeight: "bold",
  }}
>
  Saved Goals
</h2>

<div
  style={{
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    overflowX: "auto",
  }}
>
  <table
    style={{
      width: "100%",
      borderCollapse: "collapse",
      textAlign: "left",
    }}
  >
    <thead>
      <tr
        style={{
          background: "#f3f4f6",
        }}
      >
        <th style={{ padding: "12px" }}>Goal</th>
        <th style={{ padding: "12px" }}>Target Amount</th>
        <th style={{ padding: "12px" }}>Months</th>
        <th style={{ padding: "12px" }}>Action</th>
      </tr>
    </thead>

    <tbody>
      {goals.length > 0 ? (
        goals.map((goal: any) => (
          <tr
            key={goal.id}
            style={{
              borderBottom: "1px solid #ddd",
            }}
          >
            <td style={{ padding: "12px" }}>
              {goal.title}
            </td>

            <td style={{ padding: "12px" }}>
              ₹{goal.targetAmount}
            </td>

            <td style={{ padding: "12px" }}>
              {goal.months}
            </td>

            <td style={{ padding: "12px" }}>
              <button
                onClick={() => editGoal(goal)}
                style={{
                  background: "#f59e0b",
                  color: "white",
                  border: "none",
                  padding: "8px 14px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  marginRight: "10px",
                }}
              >
                Edit
              </button>

              <button
                onClick={() => deleteGoal(goal.id)}
                style={{
                  background: "#ef4444",
                  color: "white",
                  border: "none",
                  padding: "8px 14px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td
            colSpan={4}
            style={{
              textAlign: "center",
              padding: "20px",
              color: "gray",
            }}
          >
            No goals added yet
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>
</table>
</div>
      </div>
    </div>
  );
}

export default FinancialGoalPage;