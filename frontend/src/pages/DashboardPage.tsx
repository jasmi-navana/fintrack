import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function DashboardPage() {
    const user = JSON.parse(
  localStorage.getItem("user") || "{}"
);
  const [transactions, setTransactions] = useState([]);

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("Expense");
  const [category, setCategory] = useState("");
const [editingId, setEditingId] = useState<number | null>(null);
const [search, setSearch] = useState("");
const [filterType, setFilterType] = useState("All");
const [filterCategory, setFilterCategory] = useState("All");
const [startDate, setStartDate] = useState("");
const [endDate, setEndDate] = useState("");
  const totalIncome = transactions
  .filter((t: any) => t.type === "Income")
  .reduce((sum: number, t: any) => sum + t.amount, 0);

const totalExpense = transactions
  .filter((t: any) => t.type === "Expense")
  .reduce((sum: number, t: any) => sum + t.amount, 0);
const navigate = useNavigate();

const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  navigate("/");
};
const balance = totalIncome - totalExpense;
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
  if (user?.id) {
    fetchTransactions();
  }
}, []);

  const addTransaction = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/transactions/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            amount,
            type,
            category,
            userId: user.id, // temporary
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        alert("Transaction Added");

        setTitle("");
        setAmount("");
        setType("Expense");
        setCategory("");

        fetchTransactions();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const deleteTransaction = async (id: number) => {
  await fetch(
    `http://localhost:5000/api/transactions/${id}`,
    {
      method: "DELETE",
    }
  );

  fetchTransactions();
};
const updateTransaction = async () => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/transactions/${editingId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          amount,
          type,
          category,
        }),
      }
    );

    const data = await response.json();

    if (data.success) {
      alert("Transaction Updated");

      setEditingId(null);
      setTitle("");
      setAmount("");
      setType("Expense");
      setCategory("");

      fetchTransactions();
    }
  } catch (error) {
    console.log(error);
  }
};

const filteredTransactions =
  transactions.filter((t: any) => {

    const matchesSearch =
      t.title
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesType =
      filterType === "All"
        ? true
        : t.type === filterType;

    const matchesCategory =
      filterCategory === "All" ||
      filterCategory === ""
        ? true
        : t.category
            .toLowerCase()
            .includes(filterCategory.toLowerCase());
    const matchesDate =
  (!startDate ||
    new Date(t.createdAt) >= new Date(startDate)) &&
  (!endDate ||
    new Date(t.createdAt) <= new Date(endDate));

    return (
      matchesSearch &&
      matchesType &&
      matchesCategory &&
      matchesDate
    );
  });
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
  <h1 className="text-4xl font-bold">
    Dashboard
  </h1>

  <Link
    to="/reports"
    className="bg-purple-600 text-white px-4 py-2 rounded"
  >
    View Reports
  </Link>
  <Link
    to="/budget"
    className="bg-green-600 text-white px-4 py-2 rounded"
  >
    Budget Planner
  </Link>
  <Link
  to="/financial-goal"
  className="bg-orange-600 text-white px-4 py-2 rounded"
>
  Financial Goal Planner
</Link>
<Link
  to="/profile"
  className="bg-indigo-600 text-white px-4 py-2 rounded"
>
  Profile
</Link>
  <button
      onClick={handleLogout}
      className="bg-red-600 text-white px-4 py-2 rounded"
    >
      Logout
    </button>
</div>
      <div className="grid grid-cols-3 gap-4 mb-6">
  <div className="bg-green-100 p-4 rounded shadow">
    <h3 className="font-semibold">Total Income</h3>
    <p className="text-2xl font-bold text-green-600">
      ₹{totalIncome}
    </p>
  </div>

  <div className="bg-red-100 p-4 rounded shadow">
    <h3 className="font-semibold">Total Expense</h3>
    <p className="text-2xl font-bold text-red-600">
      ₹{totalExpense}
    </p>
  </div>

  <div className="bg-blue-100 p-4 rounded shadow">
    <h3 className="font-semibold">Balance</h3>
    <p className="text-2xl font-bold text-blue-600">
      ₹{balance}
    </p>
  </div>
</div>


      <div className="border p-4 rounded mb-6">
        <h2 className="text-xl font-semibold mb-4">
          Add Transaction
        </h2>

        <input
          type="text"
          placeholder="Title"
          className="border p-2 mr-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="number"
          placeholder="Amount"
          className="border p-2 mr-2"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <select
          className="border p-2 mr-2"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option>Income</option>
          <option>Expense</option>
        </select>

        <input
          type="text"
          placeholder="Category"
          className="border p-2 mr-2"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <button
  onClick={
    editingId ? updateTransaction : addTransaction
  }
  className="bg-green-600 text-white px-4 py-2 rounded"
>
  {editingId ? "Update" : "Add"}
</button>
      </div>
<div className="flex gap-4 mb-4">

  <input
    type="text"
    placeholder="Search transaction..."
    className="border p-2 rounded"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />

  <select
    className="border p-2 rounded"
    value={filterType}
    onChange={(e) => setFilterType(e.target.value)}
  >
    <option>All</option>
    <option>Income</option>
    <option>Expense</option>
  </select>

  <input
    type="text"
    placeholder="Category"
    className="border p-2 rounded"
    value={filterCategory}
    onChange={(e) =>
      setFilterCategory(e.target.value)
    }
  />
  <input
  type="date"
  value={startDate}
  onChange={(e) => setStartDate(e.target.value)}
/>

<input
  type="date"
  value={endDate}
  onChange={(e) => setEndDate(e.target.value)}
/>

</div>
      

      <table className="w-full border">
        <thead>
          <tr>
            <th className="border p-2">Title</th>
            <th className="border p-2">Amount</th>
            <th className="border p-2">Type</th>
            <th className="border p-2">Category</th>
<th className="border p-2">Action</th>
          </tr>
          
        </thead>

        <tbody>
          {filteredTransactions.map((transaction: any) => (
            <tr key={transaction.id}>
              <td className="border p-2">
                {transaction.title}
              </td>

              <td className="border p-2">
                ₹{transaction.amount}
              </td>

              <td className="border p-2">
                {transaction.type}
              </td>

              <td className="border p-2">
  {transaction.category}
</td>

<td className="border p-2">
  <button
  onClick={() => {
    setEditingId(transaction.id);
    setTitle(transaction.title);
    setAmount(transaction.amount.toString());
    setType(transaction.type);
    setCategory(transaction.category);
  }}
  className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
>
  Edit
</button>

  <button
    onClick={() => deleteTransaction(transaction.id)}
    className="bg-red-500 text-white px-3 py-1 rounded"
  >
    Delete
  </button>
</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DashboardPage;