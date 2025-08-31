import { useState, useEffect } from "react";

interface Shipment {
  _id?: string;
  trackingId: string;
  origin: string;
  destination: string;
  status: string;
  expectedDelivery: string;
  lastLocation: string;
}

export default function Shipments() {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:7000/shipments") // backend endpoint
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`Network error: ${res.status} ${text}`);
        }
        return res.json();
      })
      .then((data) => {
        setShipments(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading shipments...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Shipments</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Tracking ID</th>
            <th className="p-2 border">Origin</th>
            <th className="p-2 border">Destination</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Last Location</th>
            <th className="p-2 border">Expected Delivery</th>
          </tr>
        </thead>
        <tbody>
          {shipments.map((s) => (
            <tr key={s._id || s.trackingId}>
              <td className="p-2 border">{s.trackingId}</td>
              <td className="p-2 border">{s.origin}</td>
              <td className="p-2 border">{s.destination}</td>
              <td className="p-2 border">{s.status}</td>
              <td className="p-2 border">{s.lastLocation}</td>
              <td className="p-2 border">
                {new Date(s.expectedDelivery).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
