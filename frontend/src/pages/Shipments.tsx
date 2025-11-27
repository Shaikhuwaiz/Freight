import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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

const normalizeKey = (str: string): string =>
  (str || "").replace(/\s+/g, "").toLowerCase();

const countryCodes: Record<string, string> = {
 unitedstates: "US",
  usa: "US",
  india: "IN",
  germany: "DE",
  france: "FR",
  canada: "CA",
  china: "Cn",
  australia: "AU",
  pune: "IN",
  kerla: "IN",
  nigeria: "NG",
  mumbai: "IN",
  govandi: "IN",
  chennai: "IN",
  bangalore: "IN",
  newyork: "US",
  hyderabad: "IN",
  london: "GB",
  heathrow: "GB",
  jordan: "JO",
  damascus: "SY",
  paris: "FR",
  berlin: "DE",
  toronto: "CA",
  vancouver: "CA",
  sydney: "AU",
  melbourne: "AU",
  delhi: "IN",
  kolkata: "IN",
  madrid: "ES",
  barcelona: "ES",
  rome: "IT",
  milan: "IT",
  amsterdam: "NL",
  rotterdam: "NL",
  zurich: "CH",
  geneva: "CH",
  oslo: "NO",
  stockholm: "SE",
  copenhagen: "DK",
  helsinki: "FI",
  warsaw: "PL",
  prague: "CZ",
  budapest: "HU",
  vienna: "AT",
  brussels: "BE",
  lisbon: "PT",
  athens: "GR",
  dublin: "IE",
  boston: "US",
  chicago: "US",
  seattle: "US",
  miami: "US",
  faridabad: "IN",
  gurgaon: "IN",
  noida: "IN",
  lucknow: "IN",
  jaipur: "IN",
  ahmedabad: "IN",
  surat: "IN",
  bangladesh: "BD",
  singapore: "SG",
  dubai: "AE",
  oman: "OM",
  yemen: "YE",
  syria: "SY",
  istanbul: "TR",
  sanfrancisco: "US",
  losangeles: "US",
  tokyo: "JP",
  beijing: "CN",
  riodejaneiro: "BR",
  capetown: "ZA",
  mexicocity: "MX",
  buenosaires: "AR",
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
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
 fetch(`${import.meta.env.VITE_BACKEND_URL}/api/shipments`)
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

  const filteredShipments = shipments.filter(
    (s) =>
      s.trackingId.toLowerCase().includes(search.toLowerCase()) ||
      s.status.toLowerCase().includes(search.toLowerCase())
  );

  const sortedShipments = sortConfig
    ? [...filteredShipments].sort((a, b) => {
        const { key, direction } = sortConfig;
        if ((a[key] ?? "") < (b[key] ?? "")) return direction === "asc" ? -1 : 1;
        if ((a[key] ?? "") > (b[key] ?? "")) return direction === "asc" ? 1 : -1;
        return 0;
      })
    : filteredShipments;

  const totalPages = Math.ceil(sortedShipments.length / ITEMS_PER_PAGE);
  const paginatedShipments = sortedShipments.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePrev = () => setCurrentPage((p) => Math.max(p - 1, 1));
  const handleNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages));

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
      return `
        text-green-300
        border border-green-400
        rounded-full px-3 py-1 text-sm font-semibold
        bg-green-900/30
        shadow-[inset_0_0_8px_2px_rgba(34,197,94,0.7)]
      `;
    case "In Transit":
      return `
        text-yellow-300
        border border-yellow-400
        rounded-full px-3 py-1 text-sm font-semibold
        bg-yellow-900/20
        shadow-[inset_0_0_8px_2px_rgba(234,179,8,0.7)]
      `;
    case "Undelivered":
      return `
        text-red-300
        border border-red-400
        rounded-full px-3 py-1 text-sm font-semibold
        bg-red-900/20
        shadow-[inset_0_0_8px_2px_rgba(239,68,68,0.7)]
      `;
    default:
      return `
        text-gray-300
        border border-gray-400
        rounded-full px-3 py-1 text-sm font-semibold
        bg-gray-800
        shadow-[inset_0_0_8px_2px_rgba(156,163,175,0.5)]
      `;
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
    <div className="p-8 max-w-7xl mx-auto text-white">
      <h2 className="text-4xl font-bold mb-6 text-center text-yellow-400 drop-shadow-lg">
        Shipments Dashboard
      </h2>

      <div className="mb-6 flex justify-between items-center">
  <input
    type="text"
    placeholder="Search by Tracking ID or Status"
    value={search}
    onChange={(e) => {
      setSearch(e.target.value);
      setCurrentPage(1);
    }}
    className="w-80 p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-yellow-400"
  />

  <button
    onClick={() => navigate("/dashboard/shipments/create")}
    className="px-5 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg shadow-lg transition-all"
  >
    + Create Shipment
  </button>
</div>

      <div className="overflow-x-auto rounded-xl backdrop-blur-xl bg-[#0f1a2b]/60 border border-white/10 shadow-2xl">
        <table className="w-full text-left">
          <thead className="bg-white/10">
            <tr>
              <th
                className="p-4 cursor-pointer"
                onClick={() => handleSort("trackingId")}
              >
                Tracking ID
              </th>
              <th className="p-4 cursor-pointer">Origin → Destination</th>
              <th
                className="p-4 cursor-pointer"
                onClick={() => handleSort("status")}
              >
                Status
              </th>
              <th className="p-3 ">Progress</th>
              <th className="p-3 ">Last Location</th>
              <th
                className="p-4 cursor-pointer"
                onClick={() => handleSort("expectedDelivery")}
              >
                Expected Delivery
              </th>
              <th className="p-4 ">Actions</th>
            </tr>
          </thead>

          <tbody>
            {paginatedShipments.map((s, idx) => {
let progress = 0;
let progressColor = "";
let progressGlow = "";

if (s.status === "Delivered") {
  progress = 100;
  progressColor = "bg-green-400";
  progressGlow =
    "shadow-[0_0_12px_4px_rgba(34,197,94,0.9)]";
} else if (s.status === "In Transit") {
  progress = 55;
  progressColor = "bg-yellow-400";
  progressGlow =
    "shadow-[0_0_12px_4px_rgba(234,179,8,0.9)]";
} else if (s.status === "Undelivered") {
  progress = 100;
  progressColor = "bg-red-400";
  progressGlow =
    "shadow-[0_0_12px_4px_rgba(239,68,68,0.9)]";
}
              return (
                <tr
                  key={s._id || s.trackingId}
                  className={
                    idx % 2 === 0
                      ? "bg-white/5 hover:bg-white/10 transition"
                      : "bg-white/10 hover:bg-white/20 transition"
                  }
                >
                  <td className="p-4 font-semibold">{s.trackingId}</td>

                  <td className="p-4 flex items-center gap-3">
                    <div className="flex items-center gap-4">
                      {/* Origin */}
                      <div className="flex items-center gap-2">
                        {countryCodes[normalizeKey(s.origin)] ? (
                          <img
                            src={`https://flagcdn.com/24x18/${countryCodes[
                              normalizeKey(s.origin)
                            ]?.toLowerCase()}.png`}
                            alt={s.origin}
                            className="rounded-sm"
                          />
                        ) : (
                          <span className="text-yellow-400 font-bold mx-2" />
                        )}
                        <span className="capitalize">{s.origin}</span>
                      </div>
                      <span className="text-gray-500 font-bold">→</span>
                      {/* Destination */}
                      <div className="flex items-center gap-2">
                        {countryCodes[normalizeKey(s.destination)] ? (
                          <img
                            src={`https://flagcdn.com/24x18/${countryCodes[
                              normalizeKey(s.destination)
                            ]?.toLowerCase()}.png`}
                            alt={s.destination}
                            className="rounded-sm"
                          />
                        ) : (
                          <span className="w-6 h-4 bg-gray-200 rounded-sm" />
                        )}
                        <span className="capitalize">{s.destination}</span>
                      </div>
                    </div>
                  </td>

                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-sm font-semibold ${getStatusClasses(
                        s.status
                      )}`}
                    >
                      {s.status}
                    </span>
                  </td>

                  <td className="p-3 ">
   <div className="w-full h-2 rounded-full bg-gray-700/40 overflow-visible relative">
  <div
    className={`
      h-2 rounded-full ${progressColor}
      ${progressGlow}
      transition-all duration-500
    `}
    style={{ width: `${progress}%` }}
  />
</div>          </td>

                  <td className="p-3 ">
                    <div className="flex items-center gap-2">
                      {countryCodes[normalizeKey(s.lastLocation)] ? (
                        <img
                          src={`https://flagcdn.com/24x18/${countryCodes[
                            normalizeKey(s.lastLocation)
                          ]?.toLowerCase()}.png`}
                          alt={s.lastLocation}
                          className="w-6 h-4 object-cover rounded-sm"
                        />
                      ) : (
                        <span className="w-6 h-4 bg-gray-200 rounded-sm" />
                      )}
                      <span className="capitalize">{s.lastLocation}</span>
                    </div>
                  </td>

                  <td className="p-3 ">
                    {s.expectedDelivery
                      ? new Date(s.expectedDelivery).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })
                      : "—"}
                  </td>

                  <td className="p-3">
                    <button
                      onClick={async () => {
                        if (
                          !window.confirm(
                            "Are you sure you want to delete this shipment?"
                          )
                        )
                          return;
                      await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/shipments/${s._id}`, {
  method: "DELETE",
});
                        setShipments((prev) =>
                          prev.filter((ship) => ship._id !== s._id)
                        );
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
