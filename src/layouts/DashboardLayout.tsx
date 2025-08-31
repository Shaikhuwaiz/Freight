import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Menu, X, Package, Truck, User, Home } from "lucide-react";

export default function DashboardLayout() {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const navItems = [
    { to: "/", label: "Dashboard", icon: <Home size={20} /> },
    { to: "/shipments", label: "Shipments", icon: <Package size={20} /> },
    { to: "/tracking", label: "Tracking", icon: <Truck size={20} /> },
    { to: "/profile", label: "Profile", icon: <User size={20} /> },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          isOpen ? "w-64" : "w-16"
        } bg-blue-800 text-white flex flex-col transition-all duration-300`}
      >
        <div className="flex items-center justify-between p-4">
          {isOpen && <h1 className="text-lg font-bold">Talaria</h1>}
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 space-y-2 mt-4">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition ${
                location.pathname === item.to
                  ? "bg-blue-700 font-semibold"
                  : "hover:bg-blue-600"
              }`}
            >
              {item.icon}
              {isOpen && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        {/* 👇 This renders DashboardHome, Shipments, Tracking, Profile */}
        <Outlet />
      </div>
    </div>
  );
}
