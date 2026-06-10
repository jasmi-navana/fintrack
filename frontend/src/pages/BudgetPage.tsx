import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function BudgetPage() {
    const user = JSON.parse(
  localStorage.getItem("user") || "{}"
);
  const [budget, setBudget] = useState("");
  const [transactions, setTransactions] = useState([]);
  
  // Temporary expense value
  // Later we will fetch from transactions
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
  const totalExpense = transactions
  .filter((t: any) => t.type === "Expense")
  .reduce((sum: number, t: any) => sum + t.amount, 0);

  const remaining =
    Number(budget || 0) - totalExpense;

  const usedPercentage =
    budget && Number(budget) > 0
      ? Math.min(
          (totalExpense / Number(budget)) * 100,
          100
        )
      : 0;

  return (
    <div className="p-8">

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">
          Monthly Budget Planner
        </h1>

        <Link
          to="/dashboard"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Back to Dashboard
        </Link>
      </div>

      <div className="mb-6">
        <input
          type="number"
          placeholder="Enter Monthly Budget"
          className="border p-2 rounded w-72"
          value={budget}
          onChange={(e) =>
            setBudget(e.target.value)
          }
        />
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">

        <div className="bg-blue-100 p-4 rounded shadow">
          <h3 className="font-semibold">
            Monthly Budget
          </h3>

          <p className="text-2xl font-bold text-blue-600">
            ₹{budget || 0}
          </p>
        </div>

        <div className="bg-red-100 p-4 rounded shadow">
          <h3 className="font-semibold">
            Spent
          </h3>

          <p className="text-2xl font-bold text-red-600">
            ₹{totalExpense}
          </p>
        </div>

        <div className="bg-green-100 p-4 rounded shadow">
          <h3 className="font-semibold">
            Remaining
          </h3>

          <p className="text-2xl font-bold text-green-600">
            ₹{remaining}
          </p>
        </div>

      </div>

      <div className="border p-6 rounded">

        <div className="flex justify-between mb-2">
          <span className="font-medium">
            Budget Usage
          </span>

          <span>
            {usedPercentage.toFixed(0)}%
          </span>
        </div>

        <div className="w-full bg-gray-300 h-5 rounded-full">
          <div
            className="bg-red-500 h-5 rounded-full"
            style={{
              width: `${usedPercentage}%`,
            }}
          ></div>
        </div>

        <p className="mt-4 text-lg">
          ₹{totalExpense} spent out of ₹{budget || 0}
        </p>

      </div>

    </div>
  );
}

export default BudgetPage;