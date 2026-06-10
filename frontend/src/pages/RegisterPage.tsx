import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
function RegisterPage() {
    const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const handleRegister = async () => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/auth/register",
      {
        name,
        email,
        password,
      }
    );

    console.log(response.data);
    alert("Registration Successful!");
  } catch (error) {
    console.error(error);
  }
};
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Register
        </h2>

        <div className="mb-4">
          <label className="block mb-2">Name</label>
          <input
  type="text"
  placeholder="Enter your name"
  value={name}
  onChange={(e) => setName(e.target.value)}
  className="w-full border p-2 rounded"
/>
        </div>

        <div className="mb-4">
          <label className="block mb-2">Email</label>
          <input
  type="email"
  placeholder="Enter your email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  className="w-full border p-2 rounded"
/>
        </div>

        <div className="mb-4">
          <label className="block mb-2">Password</label>
          <input
  type="password"
  placeholder="Create a password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  className="w-full border p-2 rounded"
/>
        </div>

        <button
  onClick={handleRegister}
  className="w-full bg-green-600 text-white p-2 rounded"
>
  Register
</button>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link
            to="/"
            className="text-blue-600 font-semibold"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;