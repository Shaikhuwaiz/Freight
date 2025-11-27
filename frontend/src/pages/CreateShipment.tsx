import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

// ✔ Auto-generate AWB number
const generateAWB = () => {
  const random = Math.floor(10000 + Math.random() * 90000);
  return `AWB${random}`;
};

const countries = [
  "USA", "India", "Germany", "France", "Canada", "China", "Australia",
  "Pune", "Kerla", "Nigeria", "Mumbai", "Chennai", "Bangalore", "Newyork",
  "Hyderabad", "London", "Heathrow", "Jordan", "Damascus", "Paris", "Berlin",
  "Toronto", "Vancouver", "Sydney", "Melbourne", "Delhi", "Kolkata", "Madrid",
  "Barcelona", "Rome", "Milan", "Amsterdam", "Rotterdam", "Zurich", "Geneva",
  "Oslo", "Stockholm", "Copenhagen", "Helsinki", "Warsaw", "Prague",
  "Budapest", "Vienna", "Brussels", "Lisbon", "Athens", "Dublin", "Boston",
  "Chicago", "Seattle", "Miami", "Faridabad", "Gurgaon", "Noida", "Lucknow",
  "Jaipur", "Ahmedabad", "Surat", "Bangladesh", "Singapore", "Dubai", "Oman",
  "Yemen", "Syria", "Istanbul", "Sanfrancisco", "Losangeles", "Tokyo",
  "Beijing", "Riodejaneiro", "Capetown", "Mexicocity", "Buenosaires",
];

export default function CreateShipment() {
  const navigate = useNavigate();

  // ✔ Auto set the AWB tracking ID
  const [trackingId] = useState(generateAWB());

  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [lastLocation, setLastLocation] = useState("");
  const [expectedDelivery, setExpectedDelivery] = useState("");
  const [status, setStatus] = useState("In Transit");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ FRONTEND submit handler (kept exactly as intended)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:7000/api/shipments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          trackingId,
          origin,
          destination,
          lastLocation: lastLocation || origin,
          expectedDelivery,
          status,
        }),
      });

      if (!res.ok) throw new Error(`Failed to create shipment (${res.status})`);

      await res.json();
      navigate("/dashboard/shipments");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">Create Shipment</h2>

      {error && (
        <div className="text-red-500 mb-4 text-sm border border-red-300 bg-red-50 p-2 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Tracking ID (Auto) */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Tracking ID (Auto-generated)
          </label>
          <input
            type="text"
            value={trackingId}
            readOnly
            className="w-full border p-2 rounded bg-gray-100 cursor-not-allowed text-gray-600 font-semibold"
          />
        </div>

        {/* Origin */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Origin
          </label>
          <select
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            required
            className="w-full border p-2 rounded"
          >
            <option value="">Select Origin Country</option>
            {countries.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Destination */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Destination
          </label>
          <select
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            required
            className="w-full border p-2 rounded"
          >
            <option value="">Select Destination Country</option>
            {countries.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Last Location */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Last Location
          </label>
          <select
            value={lastLocation}
            onChange={(e) => setLastLocation(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value="">Select Last Known Location</option>
            {countries.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
            className="w-full border p-2 rounded"
          >
            <option value="In Transit">In Transit</option>
            <option value="Delivered">Delivered</option>
            <option value="Undelivered">Undelivered</option>
          </select>
        </div>

        {/* Expected Delivery */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Expected Delivery Date
          </label>
          <input
            type="date"
            value={expectedDelivery}
            onChange={(e) => setExpectedDelivery(e.target.value)}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className={`flex items-center justify-center gap-2 px-4 py-2 text-white rounded w-full ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={18} />
              Saving...
            </>
          ) : (
            "Save Shipment"
          )}
        </button>
      </form>
    </div>
  );
}
