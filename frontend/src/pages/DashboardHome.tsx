import { motion } from "framer-motion";
import { Bell, Package, Truck, Clock, Plane } from "lucide-react";
import { useEffect, useState } from "react";
import { locationCoords } from "../utils/locationCoords";
import WorldMap from "../components/WorldMap";
import { useNavigate } from "react-router-dom";
import { getAvatarFromEmail } from "../utils/avatarFromEmail";

// Shipment Type
type Shipment = {
  _id?: string;
  trackingId: string;
  origin: string;
  destination: string;
  status: string;
  expectedDelivery?: string;
  lastLocation?: string;
  createdAt?: string;
};

export default function DashboardHome() {
  const [recentShipments, setRecentShipments] = useState<Shipment[]>([]);
  const RECENT_LIMIT = 5;
const navigate = useNavigate();
const [avatar, setAvatar] = useState<string>("");
 
 useEffect(() => {
    const handleBack = () => {
      navigate("/dashboard", { replace: true });
    };

    window.addEventListener("popstate", handleBack);
    return () => window.removeEventListener("popstate", handleBack);
  }, []);

useEffect(() => {
  const storedEmail = localStorage.getItem("email") || "";
  setAvatar(getAvatarFromEmail(storedEmail));
}, []);
  const fetchRecent = async () => {
    try {
      const res = await fetch(
        `http://localhost:7000/api/shipments?limit=${RECENT_LIMIT}&sort=createdAt:desc`
      );

      if (!res.ok) throw new Error("Failed fetching recent shipments");

      const data = await res.json();
    setRecentShipments(
  data
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 10)
);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRecent();
  }, []);

  const latestShipment = recentShipments[0];

  // Prepare coords for the map
  const mapCoords =
    latestShipment
      ? [
          locationCoords[latestShipment.origin],
          latestShipment.lastLocation
            ? locationCoords[latestShipment.lastLocation]
            : null,
          locationCoords[latestShipment.destination],
        ].filter(Boolean)
      : [];

  return (
    <div className="flex flex-col min-h-screen text-gray-100 bg-gradient-to-b from-[#0f172a] via-[#0d1a30] to-[#0c1225]">
      {/* HEADER */}
      <header className="flex justify-between items-center px-8 py-5 bg-[#0f172a]/50 backdrop-blur-xl border-b border-white/10 shadow-xl shadow-black/40">
        <h2 className="text-2xl font-bold tracking-wide text-white drop-shadow-md">
          Talaria Dashboard
        </h2>

        <div className="flex items-center gap-5">
        <img
  src={avatar}
  alt="User Avatar"
  className="w-11 h-11 rounded-full border border-yellow-400 shadow-lg shadow-yellow-500/20"
/>
        </div>
      </header>

      {/* MAP SECTION */}
      <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  className="w-MAX mt-6 px-6"
>
  <div className="bg-white/5 backdrop-blur-lg rounded-xl shadow-xl shadow-black/30 border border-white/10 overflow-hidden h-[480px]">

    {/* WORLD MAP */}
    <WorldMap coords={mapCoords as [number, number][]} />

  </div>
</motion.div>
      {/* HERO SECTION */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="px-6 mt-10"
      >
        <div className="p-10 rounded-2xl bg-gradient-to-br from-[#162238] via-[#0f172a] to-[#0c1a30] border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.45)]">
          <h1 className="text-3xl font-bold text-white drop-shadow-md">
            Welcome to <span className="text-yellow-400">Talaria</span> Logistics
          </h1>

          <p className="text-gray-300 mt-2">
            Real-time visibility into global freight operations, shipments, and delivery routes.
          </p>

         <div className="flex gap-4 mt-6">
  <button
    onClick={() => navigate("/dashboard/shipments/create")}
    className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg shadow-md transition"
  >
    Create Shipment
  </button>

  <button
    onClick={() => navigate("/dashboard/tracking")}
    className="px-6 py-3 bg-gray-700 hover:bg-gray-800 text-white font-semibold rounded-lg shadow-md transition"
  >
    Track Order
  </button>
</div>
        </div>
      </motion.section>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
        <MetricCard label="Delivered Today" value="312" icon={<Package />} color="from-green-500 to-green-700" />
        <MetricCard label="In Transit" value="540" icon={<Plane />} color="from-blue-500 to-blue-700" />
        <MetricCard label="Out for Delivery" value="129" icon={<Truck />} color="from-yellow-500 to-yellow-700" />
        <MetricCard label="Delayed" value="18" icon={<Clock />} color="from-red-600 to-red-700" />
      </div>

      {/* RECENT SHIPMENTS */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="px-6 mt-8 mb-10"
      >
        <div className="bg-white/5 p-6 rounded-xl border border-white/10 shadow-lg">
          <h3 className="text-lg font-semibold text-yellow-400 mb-4">Recent Shipments</h3>

          <table className="w-full text-left text-gray-200">
            <thead className="border-b border-white/10 text-gray-400">
              <tr>
                <th>AWB</th>
                <th>Origin → Destination</th>
                <th>Status</th>
                <th>ETA</th>
              </tr>
            </thead>

            <tbody>
              {recentShipments.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-4 text-center text-gray-400">
                    No recent shipments
                  </td>
                </tr>
              ) : (
                recentShipments
      .slice(0, 10) // ← LIMIT TO 10 ITEMS
      .map((s) => (
        <tr key={s._id} className="border-b border-white/10">
          <td className="py-3 font-medium">{s.trackingId}</td>
          <td>{s.origin} → {s.destination}</td>

                    <td className={
                      s.status === "Delivered" ? "text-green-400" :
                      s.status === "In Transit" ? "text-yellow-400" :
                      "text-red-400"
                    }>
                      {s.status}
                    </td>

                    <td>
                      {s.expectedDelivery
                        ? new Date(s.expectedDelivery).toLocaleDateString()
                        : "—"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}

/* CARDS */
function MetricCard({ label, value, icon, color }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`p-6 rounded-2xl shadow-xl bg-gradient-to-br ${color} text-white backdrop-blur-xl flex flex-col gap-2`}
    >
      <div className="flex justify-between items-center">
        <h2 className="text-sm opacity-90">{label}</h2>
        <div className="opacity-90">{icon}</div>
      </div>
      <p className="text-3xl font-bold">{value}</p>
    </motion.div>
  );
}

/* TIMELINE */
function TimelineItem({ color, text }) {
  return (
    <li className="flex gap-3 items-start">
      <div className={`w-3 h-3 rounded-full mt-1 ${color}`}></div>
      <span>{text}</span>
    </li>
  );
}
