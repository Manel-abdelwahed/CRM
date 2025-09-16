// src/components/Sidebar.jsx
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
  const { user, logout } = useAuth();

  return (
    <div className="w-64 h-screen bg-gray-900 text-white flex flex-col">
      <h2 className="text-xl font-bold p-4">CRM App</h2>
      <nav className="flex-1">
        <ul>
          {user?.role === "admin" && (
            <li className="p-3 hover:bg-gray-700">
              <Link to="/dashboard">Admin Dashboard</Link>
            </li>
          )}
          {user?.role === "marketing" && (
            <li className="p-3 hover:bg-gray-700">
              <Link to="/campaigns">Campaigns</Link>
            </li>
          )}
          {user?.role === "commercial" && (
            <li className="p-3 hover:bg-gray-700">
              <Link to="/clients">Clients</Link>
            </li>
          )}
        </ul>
      </nav>
      <button
        onClick={logout}
        className="bg-red-600 m-4 py-2 rounded hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
}
