import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
function LoginPage() {
    const navigate = useNavigate();

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const handleLogin = async () => {
  try {
    const response = await fetch(
      "http://localhost:5000/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    const data = await response.json();

    if (data.success) {
      localStorage.setItem("token", data.token);

      alert("Login Successful!");
      localStorage.setItem(
  "user",
  JSON.stringify(data.user)
);

localStorage.setItem(
  "token",
  data.token
);

      navigate("/dashboard");
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.log(error);
    alert("Login failed");
  }
};
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Login
        </h2>

        <div className="mb-4">
          <label className="block mb-2">Email</label>
          <input
  type="email"
  placeholder="Enter email"
  className="w-full border p-2 rounded"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>
        </div>

        <div className="mb-4">
          <label className="block mb-2">Password</label>
          <input
  type="password"
  placeholder="Enter password"
  className="w-full border p-2 rounded"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
/>
        </div>

        <button
  onClick={handleLogin}
  className="w-full bg-blue-600 text-white p-2 rounded"
>
  Login
</button>
        <p className="text-center mt-4">
  Don't have an account?{" "}
  <Link
    to="/register"
    className="text-blue-600 font-semibold"
  >
    Register
  </Link>
</p>
      </div>
    </div>
  );
}

export default LoginPage;