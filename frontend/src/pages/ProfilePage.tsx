import { Link } from "react-router-dom";

function ProfilePage() {
  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  return (
    <div className="p-8">
      <div className="flex justify-between mb-6">
        <h1 className="text-4xl font-bold">
          My Profile
        </h1>

        <Link
          to="/dashboard"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Dashboard
        </Link>
      </div>

      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">
            <img
  src="https://via.placeholder.com/120"
  alt="Profile"
  style={{
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    marginBottom: "20px"
  }}
/>
          User Information
        </h2>

        <p>
          <strong>Name:</strong> {user.name}
        </p>

        <p>
          <strong>Email:</strong> {user.email}
        </p>
      </div>
    </div>
  );
}

export default ProfilePage;