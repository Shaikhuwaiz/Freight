import { useState } from "react";
import MiniMap from "../components/MiniMap";


interface ShipmentHistory {
  date: string;
  status: string;
  location: string;
  details: string;
}

interface Shipment {
  trackingId: string;
  origin: string;
  destination: string;
  status: string;
  expectedDelivery: string;
  history: ShipmentHistory[];
}

export default function Tracking() {
  const [trackingId, setTrackingId] = useState("");
  const [shipment, setShipment] = useState<Shipment | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
const getDotRingClasses = (status: string) => {
  switch (status) {
    case "Delivered":
      return "border-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.9)]";
    case "In Transit":
      return "border-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.8)]";
    case "Undelivered":
      return "border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]";
    default:
      return "border-blue-400";
  }
};

const getDotFillClasses = (status: string) => {
  switch (status) {
    case "Delivered":
      // full neon-green
      return "h-2.5 w-2.5 rounded-full bg-emerald-400";
    case "In Transit":
      // half-filled yellow: gradient from yellow to transparent
      return "h-2.5 w-2.5 rounded-full bg-gradient-to-b from-yellow-400 to-transparent";
    case "Undelivered":
      // full red
      return "h-2.5 w-2.5 rounded-full bg-red-500";
    default:
      return "h-2.5 w-2.5 rounded-full bg-blue-400";
  }
};
  const handleTrack = async () => {
    if (!trackingId) return;
    setLoading(true);
    setError("");
    setShipment(null);

    try {
      const res = await fetch(`http://localhost:7000/api/shipments/${trackingId}`);
      if (!res.ok) throw new Error("Shipment not found");

      const data = await res.json();
      setShipment(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4 text-blue-700 text-center">
        Track Your Shipment
      </h2>

      {/* Input */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Enter Tracking ID (e.g. AWB12345)"
          value={trackingId}
          onChange={(e) => setTrackingId(e.target.value)}
          className="flex-1 p-3 rounded-md bg-[#111827] text-white border border-gray-600
             focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400
             placeholder-gray-400 transition"
        />
        <button
          onClick={handleTrack}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {loading ? "Tracking..." : "Track"}
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="text-red-600 font-semibold text-center mb-4">
          {error}
        </div>
      )}

      {/* No Shipment */}
      {!shipment && !loading && !error && (
        <p className="text-center text-gray-500">
          Enter a tracking ID to view shipment details.
        </p>
      )}

      {/* Shipment Details */}
      {shipment && (
        <div className="bg-white shadow-md p-6 rounded-lg border border-gray-200">
          <h3 className="text-xl font-bold mb-2">{shipment.trackingId}</h3>

          <p className="text-gray-600 mb-1">
            {shipment.origin} → {shipment.destination}
          </p>

          <p className="font-semibold mb-1">
            Status:{" "}
            <span
              className={
                shipment.status === "Delivered"
                  ? "text-green-600"
                  : shipment.status === "In Transit"
                  ? "text-yellow-600"
                  : "text-red-600"
              }
            >
              {shipment.status}
            </span>
          </p>

          <p className="text-gray-600 mb-6">
            Expected Delivery:{" "}
            {new Date(shipment.expectedDelivery).toLocaleDateString()}
          </p>

          {shipment && (
<div className="w-full h-64 mb-6 rounded-xl overflow-hidden shadow-md border">
<MiniMap route={shipment.history.map((h) => h.location)} />

</div>

)}
  <h4 className="text-lg font-semibold mb-3">Travel History</h4>

{shipment.history.length === 0 ? (
  <p className="text-gray-500 text-sm">No history available yet.</p>
) : (
<div className="mt-6 pl-10">
 <ul
  className={`space-y-10 border-l-2 border-gray-300 pl-6 ${
    shipment.status === "Delivered"
      ? "border-green-400"
      : shipment.status === "In Transit"
      ? "border-yellow-400 "
      : "border-red-500 "
  }`}
>
    {(() => {
      // Sort newest first
      let sorted = shipment.history
        .slice()
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

      // Reorder depending on final shipment status
      if (shipment.status === "Undelivered" && sorted.length >= 2) {
        [sorted[0], sorted[1]] = [sorted[1], sorted[0]];
      }

      if (shipment.status === "Delivered" && sorted.length >= 1) {
        // Ensure Delivered appears at top
        sorted[0].status = "Delivered";
      }

      if (shipment.status === "In Transit" && sorted.length >= 1) {
        sorted[0].status = "In Transit";
      }

      return sorted.map((h, i) => {
        // DOT COLOR SELECTION
        const dotClass =
          shipment.status === "Delivered" && i === 0
            ? "bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.9)]"
          : shipment.status === "Undelivered" && i === 0
            ? "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.9)]"
          : shipment.status === "In Transit" && i === 0
            ? "bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.9)]"
          : i === 1
            ? "bg-yellow-400"
            : "bg-blue-500";

        // LABEL COLOR
        const labelClass =
          dotClass.includes("red")
            ? "text-red-600"
            : dotClass.includes("green")
            ? "text-green-600"
            : dotClass.includes("yellow")
            ? "text-yellow-600"
            : "text-blue-600";

        return (
          <li key={i} className="relative">
            {/* Dot */}
            <span
              className={`absolute -left-[31px] top-1 h-3 w-3 rounded-full ${dotClass}`}
            />

            {/* Content */}
            <div className="space-y-1 text-left">
              <p className="text-sm text-gray-500">
                {new Date(h.date).toLocaleString()}
              </p>

              <p className={`font-semibold ${labelClass}`}>
  {(shipment.status === "Undelivered" && i === 0)
    ? "Undelivered"
    : h.status}
</p>

              <p className="text-gray-600 text-sm">{h.location}</p>
              <p className="text-gray-500 text-xs">{h.details}</p>
            </div>
          </li>
        );
      });
    })()}
  </ul>
</div>

)}
        </div>
      )}
    </div>
  );
};
