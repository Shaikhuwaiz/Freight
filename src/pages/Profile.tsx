import { BadgeCheck, Mail, MapPin, Truck } from "lucide-react";

export default function Profile() {
  const user = {
    name: "John Doe",
    email: "john@example.com",
    role: "Logistics Manager",
    company: "Global Freight Solutions",
    location: "Pune, India",
    avatar: "https://i.pravatar.cc/150?img=12",
    stats: {
      shipments: 248,
      active: 32,
      onTime: "96%",
    },
    recentActivity: [
      "Shipment #2021 delivered to London",
      "Shipment #2044 delayed in Dubai",
      "Shipment #2050 assigned to carrier DHL",
    ],
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* Profile Header */}
      <div className="flex items-center gap-6 mb-8">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-24 h-24 rounded-full border-4 border-blue-500 shadow-md"
        />
        <div>
          <h2 className="text-3xl font-bold flex items-center gap-2">
            {user.name}
            <BadgeCheck className="text-blue-500" size={20} />
          </h2>
          <p className="text-gray-600">{user.role} @ {user.company}</p>
          <p className="flex items-center text-gray-500 mt-1">
            <MapPin size={16} className="mr-1" /> {user.location}
          </p>
          <p className="flex items-center text-gray-500">
            <Mail size={16} className="mr-1" /> {user.email}
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="p-4 bg-green-100 rounded-xl shadow text-center">
          <p className="text-2xl font-bold">{user.stats.shipments}</p>
          <p className="text-sm text-gray-600">Total Shipments</p>
        </div>
        <div className="p-4 bg-yellow-100 rounded-xl shadow text-center">
          <p className="text-2xl font-bold">{user.stats.active}</p>
          <p className="text-sm text-gray-600">Active Shipments</p>
        </div>
        <div className="p-4 bg-blue-100 rounded-xl shadow text-center">
          <p className="text-2xl font-bold">{user.stats.onTime}</p>
          <p className="text-sm text-gray-600">On-Time Delivery</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-3 flex items-center">
          <Truck className="mr-2" /> Recent Activity
        </h3>
        <ul className="space-y-2 text-gray-700">
          {user.recentActivity.map((item, idx) => (
            <li key={idx} className="p-3 bg-gray-50 rounded-md shadow-sm">
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Call to Action */}
      <button className="w-full py-3 mt-4 bg-blue-600 text-white rounded-xl font-semibold shadow hover:bg-blue-700">
        Edit Profile
      </button>
    </div>
  );
}
