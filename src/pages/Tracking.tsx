import { useState } from "react";
import { useLocation } from "react-router-dom";

interface TrackingResponse {
  trackingId: string;
  status: string;
  origin: string;
  destination: string;
  expectedDelivery: string;
  lastLocation: string;
}

export default function Tracking() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const initialTrackingId = params.get("number") || "";

  const [trackingId, setTrackingId] = useState(initialTrackingId);
  const [data, setData] = useState<TrackingResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<TrackingResponse[]>([]);

  const handleTrack = async () => {
    if (!trackingId.trim()) {
      setError("Please enter a tracking ID");
      return;
    }

    setLoading(true);
    setError(null);
    setData(null);

    try {
      const res = await fetch(`http://localhost:7000/shipments/${trackingId}`);
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const json: TrackingResponse = await res.json();
      setData(json);
      setHistory((prev) => [json, ...prev]);
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      else setError("An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Package Tracking</h1>

      {/* ==================== Form ==================== */}
      <form
        className="flex mb-4 w-full min-w-0"
        onSubmit={(e) => {
          e.preventDefault();
          handleTrack();
        }}
      >
        <input
          type="text"
          value={trackingId}
          onChange={(e) => setTrackingId(e.target.value)}
          placeholder="Enter tracking ID"
      className="flex-1 p-3 border border-gray-300  focus:outline-none focus:ring-1 focus:ring-yellow-400 focus:ring-offset-0"
        />
      <button
    type="submit"
    disabled={loading}
    className="bg-yellow-400 px-6 py-3 rounded-r-md font-medium hover:bg-yellow-500 disabled:opacity-50 flex-shrink-0"
  >
    {loading ? "Tracking..." : "Track"}
  </button>
      </form>

      {/* ==================== Error ==================== */}
      {error && <p className="text-red-600 mb-4 font-semibold">{error}</p>}

      {/* ==================== Current Tracking ==================== */}
      {data && (
        <div className="p-4 mb-6 border rounded shadow bg-white">
          <h2 className="text-xl font-bold mb-2">Tracking ID: {data.trackingId}</h2>
          <p>
            <span className="font-semibold">Status:</span>{" "}
            <span
              className={
                data.status === "Delivered"
                  ? "text-green-600 font-bold"
                  : data.status === "In Transit"
                  ? "text-yellow-600 font-bold"
                  : "text-orange-600 font-bold"
              }
            >
              {data.status}
            </span>
          </p>
          <p><span className="font-semibold">Origin:</span> {data.origin}</p>
          <p><span className="font-semibold">Destination:</span> {data.destination}</p>
          <p><span className="font-semibold">Last Location:</span> {data.lastLocation}</p>
          <p>
            <span className="font-semibold">Expected Delivery:</span>{" "}
            {new Date(data.expectedDelivery).toLocaleDateString()}
          </p>
        </div>
      )}

      {/* ==================== Tracking History ==================== */}
      {history.length > 1 && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Tracking History</h3>
          <ul className="space-y-2">
            {history.slice(1).map((item) => (
              <li
                key={item.trackingId}
                className="p-3 border rounded bg-gray-50 flex justify-between items-center"
              >
                <span>{item.trackingId}</span>
                <span
                  className={
                    item.status === "Delivered"
                      ? "text-green-600 font-semibold"
                      : item.status === "In Transit"
                     ? "text-yellow-500 font-semibold" // changed here too
      : "text-orange-600 font-semibold"
                  }
                >
                  {item.status}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ==================== Loading Spinner ==================== */}
      {loading && <p className="mt-2 text-gray-500 font-medium">🔄 Tracking package...</p>}
    </div>
  );
}
