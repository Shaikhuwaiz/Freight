import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Package,
  Truck,
  User,
  Home,
  LogOut,
  Loader2,
} from "lucide-react";

export default function DashboardLayout() {
  const [isOpen, setIsOpen] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    setLoggingOut(true);
    localStorage.clear();
    sessionStorage.clear();
    setTimeout(() => {
      navigate("/");
      window.location.href = "/";
    }, 1000);
  };

  const navItems = [
    { to: "/dashboard", label: "Dashboard", icon: <Home size={20} /> },
    { to: "/dashboard/shipments", label: "Shipments", icon: <Package size={20} /> },
    { to: "/dashboard/tracking", label: "Tracking", icon: <Truck size={20} /> },
    { to: "/dashboard/profile", label: "Profile", icon: <User size={20} /> },
  ];

  return (
     <div className="flex h-screen bg-gradient-to-br from-[#1a1c2c] via-[#222b3a] to-[#1a1f2f] overflow-hidden">
    {/* Sidebar */}
  <div
  className={`${
    isOpen ? "w-64" : "w-16"
  } bg-blue-800 flex flex-col transition-all duration-300 relative shadow-lg overflow-hidden`}
>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-blue-700">
          {isOpen && <h1 className="text-lg font-bold">Talaria</h1>}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="hover:text-gray-300 transition"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Navigation Links */}
       <nav className="flex-1 space-y-1 mt-4 overflow-hidden">
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

        {/* Logout Button — fixed bottom */}
       <div className="p-4 border-t border-blue-700 mt-auto flex justify-center">
  <button
    onClick={handleLogout}
    disabled={loggingOut}
    className={`flex items-center justify-center 
      ${isOpen ? "w-full px-4 py-2 rounded-lg" : "w-12 h-12 rounded-full"} 
      transition-all duration-300 font-medium
      ${
        loggingOut
          ? "bg-gray-600/50 cursor-not-allowed"
          : "bg-red-600 hover:bg-red-700 active:bg-red-800"
      }overflow-hidden

    `}
  >
    {loggingOut ? (
      <Loader2 size={20} className="animate-spin" />
    ) : (
      <LogOut size={22} />
    )}

    {isOpen && <span className="ml-2">{loggingOut ? "Logging out..." : "Logout"}</span>}
  </button>
</div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}
