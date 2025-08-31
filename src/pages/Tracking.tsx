import { useState } from "react";

interface TrackingResponse {
  trackingId: string;
  status: string;
  origin: string;
  destination: string;
  expectedDelivery: string;
  lastLocation: string;
}

export default function Tracking() {
  const [trackingId, setTrackingId] = useState("");
  const [data, setData] = useState<TrackingResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTrack = async () => {
    if (!trackingId) {
      setError("Please enter a tracking ID");
      return;
    }

    setLoading(true);
    setError(null);
    setData(null);

    try {
      const res = await fetch(`http://localhost:7000/shipments/${trackingId}`);

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const json: TrackingResponse = await res.json();
      setData(json);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Package Tracking</h1>
      <input
        type="text"
        value={trackingId}
        onChange={(e) => setTrackingId(e.target.value)}
        placeholder="Enter tracking ID"
        style={{ marginRight: "10px" }}
      />
      <button onClick={handleTrack} disabled={loading}>
        {loading ? "Tracking..." : "Track"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {data && (
        <div style={{ marginTop: "20px" }}>
          <h2>Tracking ID: {data.trackingId}</h2>
          <p>Status: {data.status}</p>
          <p>Origin: {data.origin}</p>
          <p>Destination: {data.destination}</p>
          <p>Last Location: {data.lastLocation}</p>
          <p>
            Expected Delivery:{" "}
            {new Date(data.expectedDelivery).toLocaleDateString()}
          </p>
        </div>
      )}
    </div>
  );
}
