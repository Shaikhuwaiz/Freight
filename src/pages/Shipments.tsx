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

const ITEMS_PER_PAGE = 10;

// ✅ Normalize key (lowercase, remove spaces)
const normalizeKey = (str: string): string =>
  (str || "").replace(/\s+/g, "").toLowerCase();

// ✅ Map locations → ISO country codes
const countryCodes: Record<string, string> = {
  "unitedstates": "US",
  "usa": "US",
  "india": "IN",
  "germany": "DE",
  "france": "FR",
  "canada": "CA",
  "australia": "AU",
  "pune": "IN",
  "kerla" : "IN",
  "nigeria": "NG",
  "mumbai": "IN",
"govandi": "IN",
  "chennai": "IN",
  "bangalore": "IN",
  "newyork": "US",
  "hyderabad": "IN",
  "london": "GB",
  "heathrow" : "GB",
  "paris": "FR",
  "berlin": "DE",
  "toronto": "CA",
  "vancouver": "CA",
  "sydney": "AU",
  "melbourne": "AU",
  "delhi": "IN",
  "kolkata": "IN",
  "madrid": "ES",
  "barcelona": "ES",
  "rome": "IT",
  "milan": "IT",
  "amsterdam": "NL",
  "rotterdam": "NL",
  "zurich": "CH",
  "geneva": "CH",
  "oslo": "NO",
  "stockholm": "SE",
  "copenhagen": "DK",
  "helsinki": "FI",
  "warsaw": "PL",
  "prague": "CZ",
  "budapest": "HU",
  "vienna": "AT",
  "brussels": "BE",
  "lisbon": "PT",
  "athens": "GR",
  "dublin": "IE",
  "boston": "US",
  "chicago": "US",
  "seattle": "US",
  "miami": "US",
 
  "faridabad": "IN",
  "gurgaon": "IN",
  "noida": "IN",
  "lucknow": "IN",
  "jaipur": "IN",
  "ahmedabad": "IN",
  "surat": "IN",
  "bangladesh": "BD",
  "singapore": "SG",
  "dubai": "AE",
  "istanbul": "TR",
  "sanfrancisco": "US",
  "losangeles": "US",
  "tokyo": "JP",
  "beijing": "CN",
  "riodejaneiro": "BR",
  "capetown": "ZA",
  "mexicocity": "MX",
  "buenosaires": "AR",
};

export default function Shipments() {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [sortConfig, setSortConfig] = useState<{
    key: keyof Shipment;
    direction: "asc" | "desc";
  } | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:7000/shipments")
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

  // Filter
  const filteredShipments = shipments.filter(
    (s) =>
      s.trackingId.toLowerCase().includes(search.toLowerCase()) ||
      s.status.toLowerCase().includes(search.toLowerCase())
  );

  // Sorting
  const sortedShipments = sortConfig
    ? [...filteredShipments].sort((a, b) => {
        const { key, direction } = sortConfig;
        if ((a[key] ?? "") < (b[key] ?? "")) return direction === "asc" ? -1 : 1;
        if ((a[key] ?? "") > (b[key] ?? "")) return direction === "asc" ? 1 : -1;
        return 0;
      })
    : filteredShipments;

  // Pagination
  const totalPages = Math.ceil(sortedShipments.length / ITEMS_PER_PAGE);
  const paginatedShipments = sortedShipments.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePrev = () => setCurrentPage((p) => Math.max(p - 1, 1));
  const handleNext = () =>
    setCurrentPage((p) => Math.min(p + 1, totalPages));

  const handleSort = (key: keyof Shipment) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig?.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const getStatusClasses = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700";
      case "In Transit":
        return "bg-yellow-100 text-yellow-700";
      case "Pending":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (loading) {
    return (
      <div className="p-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">
          Shipments Dashboard
        </h2>
        <div className="space-y-3 animate-pulse">
          {[...Array(ITEMS_PER_PAGE)].map((_, idx) => (
            <div key={idx} className="h-10 bg-gray-200 rounded-md w-full"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-500 text-lg font-semibold">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">
        Shipments Dashboard
      </h2>

      {/* Search */}
      <div className="mb-4 flex justify-center">
        <input
          type="text"
          placeholder="Search by Tracking ID or Status"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full max-w-md p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse shadow-lg rounded-lg overflow-hidden">
          <thead className="bg-blue-600 text-white text-left">
            <tr>
              <th
                className="p-3 cursor-pointer border-r"
                onClick={() => handleSort("trackingId")}
              >
                Tracking ID
              </th>
              <th
                className="p-3 cursor-pointer border-r"
                onClick={() => handleSort("origin")}
              >
                Recipient
              </th>
              <th
                className="p-3 cursor-pointer border-r"
                onClick={() => handleSort("status")}
              >
                Status
              </th>
              <th className="p-3 border-r">Progress</th>
              <th
                className="p-3 cursor-pointer border-r"
                onClick={() => handleSort("lastLocation")}
              >
                Last Location
              </th>
              <th
                className="p-3 cursor-pointer"
                onClick={() => handleSort("expectedDelivery")}
              >
                Expected Delivery
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedShipments.map((s, idx) => {
              let progress = 0;
              let progressColor = "bg-gray-300";

              if (s.status === "In Transit") {
                progress = 50;
                progressColor = "bg-yellow-500";
              } else if (s.status === "Delivered") {
                progress = 100;
                progressColor = "bg-green-500";
              }

              return (
                <tr
                  key={s._id || s.trackingId}
                  className={
                    idx % 2 === 0
                      ? "bg-gray-50 hover:bg-gray-100"
                      : "bg-white hover:bg-gray-100"
                  }
                >
                  {/* Tracking ID */}
                  <td className="p-3 border-r font-semibold">
                    {s.trackingId}
                  </td>

                  {/* ✅ Recipient (Origin → Destination) */}
                  <td className="p-3 border-t">
                    <div className="flex items-center gap-4">
                      {/* Origin */}
                      <div className="flex items-center gap-2">
                        {countryCodes[normalizeKey(s.origin)] ? (
                          <img
                            src={`https://flagcdn.com/24x18/${countryCodes[
                              normalizeKey(s.origin)
                            ]?.toLowerCase()}.png`}
                            alt={s.origin}
                            className="w-6 h-4 object-cover rounded-sm"
                          />
                        ) : (
                          <span className="w-6 h-4 bg-gray-200 rounded-sm" />
                        )}
                        <span>{s.origin}</span>
                      </div>

                      {/* Separator */}
                      <span className="text-gray-500 font-bold">→</span>

                      {/* Destination */}
                      <div className="flex items-center gap-2">
                        {countryCodes[normalizeKey(s.destination)] ? (
                          <img
                            src={`https://flagcdn.com/24x18/${countryCodes[
                              normalizeKey(s.destination)
                            ]?.toLowerCase()}.png`}
                            alt={s.destination}
                            className="w-6 h-4 object-cover rounded-sm"
                          />
                        ) : (
                          <span className="w-6 h-4 bg-gray-200 rounded-sm" />
                        )}
                        <span>{s.destination}</span>
                      </div>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="p-3 border-r">
                    <span
                      className={`px-2 py-1 rounded-full text-sm font-semibold ${getStatusClasses(
                        s.status
                      )}`}
                    >
                      {s.status}
                    </span>
                  </td>

                  {/* Progress */}
                  <td className="p-3 border-r">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${progressColor}`}
                        style={{
                          width: `${progress}%`,
                          transition: "width 0.5s ease",
                        }}
                      />
                    </div>
                  </td>

                  {/* Last Location */}
                 <td className="p-3 border-r">
  <div className="flex items-center gap-2">
    {countryCodes[normalizeKey(s.lastLocation)] ? (
      <img
        src={`https://flagcdn.com/24x18/${countryCodes[normalizeKey(s.lastLocation)]?.toLowerCase()}.png`}
        alt={s.lastLocation}
        className="w-6 h-4 object-cover rounded-sm"
      />
    ) : (
      <span className="w-6 h-4 bg-gray-200 rounded-sm" />
    )}
    <span className="capitalize">{s.lastLocation}</span>
  </div>
</td>

                  {/* Expected Delivery */}
                  <td className="p-3">
                    {s.expectedDelivery
                      ? new Date(s.expectedDelivery).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )
                      : "—"}
                  </td>
                  <td className="p-3 border-t">
  <button
    onClick={async () => {
      if (!window.confirm("Are you sure you want to delete this shipment?")) return;
      await fetch(`http://localhost:7000/shipments/${s._id}`, {
        method: "DELETE",
      });
      // Refresh UI
      setShipments((prev) => prev.filter((ship) => ship._id !== s._id));
    }}
    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
  >
    Delete
  </button>
</td>
                </tr>
                
              );
              
            })}
            
          </tbody>
          
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-3 mt-4">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50"
        >
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
