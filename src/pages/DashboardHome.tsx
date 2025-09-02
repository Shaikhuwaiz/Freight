import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function DashboardLayout() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingNumber.trim()) return;

    navigate(`/tracking?number=${trackingNumber}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Topbar */}
      <header className="h-16 bg-white shadow flex items-center justify-between px-6">
        <h2 className="text-xl font-bold">Dashboard Home</h2>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {/* Track Your Order */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
          <span className="text-2xl font-semibold mb-4 sm:mb-0">
            Track Your Order
          </span>
          <img src="src/image/parcel.png" alt="Parcel" className="w-64" />
        </div>

        {/* Search Bar */}
        <form
          className="flex flex-col sm:flex-row gap-3 mb-6"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            placeholder="Enter your shipment tracking number"
            className="flex-1 py-3 px-4 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
          <button
            type="submit"
            className="px-6 py-3 text-base font-medium text-white bg-yellow-400 rounded-md hover:bg-yellow-500"
          >
            Track my parcel
          </button>
        </form>

        {/* Promo Text */}
        <div className="flex flex-col items-center justify-center mb-6 text-center">
          <h1 className="text-orange-400 text-sm sm:text-m font-semibold mb-2">
            OPTIMIZE TRACKING & INCREASE REVENUE
          </h1>
          <p className="text-blue-700 text-3xl sm:text-4xl font-bold">
            Ship smart. Sell more.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Global Offices" value="8" />
          <StatCard title="Employees" value="450" />
          <StatCard title="Carriers" value="1200+" />
          <StatCard title="Tech Partners" value="80+" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          <StatCard title="Paid Customers" value="20000+" />
          <StatCard title="Tracked Shipments" value="11B+" />
          <StatCard title="Returns Processed" value="13M+" />
          <StatCard title="Sales Channels" value="20+" />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-12 mt-auto">
        <div className="container mx-auto px-4 flex flex-wrap justify-between">
          <div className="w-full md:w-1/4 mb-8 md:mb-0 flex items-center gap-2">
            <img
              src="src/image/Talaria.svg"
              alt="Talaria Logo"
              className="w-24 h-auto"
            />
            <span className="text-white text-xl font-bold">Talaria</span>
          </div>

          {/* Footer columns */}
          <FooterColumn title="SOLUTIONS" links={[
            "Pricing & Plans",
            "Tracking API & Webhooks",
            "Shipment Tracking Widgets",
            "Delivery Notifications",
            "Shipping Solutions"
          ]} />

          <FooterColumn title="RESOURCES" links={[
            "Developer Documentation",
            "Help Center",
            "Couriers",
            "Shops"
          ]} />

          <FooterColumn title="COMPANY" links={[
            "About Us",
            "Contact Us",
            "Privacy Policy"
          ]} />
        </div>

        <div className="container mx-auto px-4 mt-8 pt-8 border-t border-gray-700 flex flex-wrap justify-between items-center">
          <p className="text-gray-500 text-sm mt-4 md:mt-0">
            © 2025 Talaria | All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: string }) {
  const match = value.match(/(\d+)([+MB,.]*)/);
  const targetNumber = match ? parseInt(match[1].replace(/,/g, ""), 10) : 0;
  const suffix = match ? match[2] : "";
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    if (!targetNumber) return;
    let startTime: number | null = null;
    const duration = 1000;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const newValue = Math.min(
        Math.floor((progress / duration) * targetNumber),
        targetNumber
      );
      setCurrentValue(newValue);
      if (progress < duration) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [targetNumber]);

  return (
    <div className="bg-white shadow rounded-xl p-6 text-center">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-2xl font-bold text-blue-700 mt-2">
        {currentValue}
        {suffix}
      </p>
    </div>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: string[];
}) {
  return (
    <div className="w-1/2 md:w-1/6 mb-8 md:mb-0">
      <h2 className="text-lg font-semibold mb-4 text-yellow-400">{title}</h2>
      <ul>
        {links.map((link) => (
          <li key={link} className="mb-2">
            <a href="#" className="hover:text-gray-400">{link}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
