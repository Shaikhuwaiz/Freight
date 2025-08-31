import { useState, useEffect } from "react";

export default function DashboardLayout() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="h-16 bg-white shadow flex items-center justify-between px-6">
          <h2 className="text-xl font-bold">Dashboard Home</h2>
          <div className="flex items-center gap-4">
            <button className="bg-blue-600 text-white px-4 py-1 rounded-lg">
              Dashboard
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-y-auto">
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
      </div>
    </div>
  );
}

function NavItem({
  icon,
  label,
  isOpen,
}: {
  icon: React.ReactNode;
  label: string;
  isOpen: boolean;
}) {
  return (
    <div className="flex items-center gap-2 px-4 py-2 hover:bg-blue-700 cursor-pointer">
      {icon}
      {isOpen && <span>{label}</span>}
    </div>
  );
}

// =================================================================
// 🚀 This is the updated StatCard component with the counter animation
// =================================================================
function StatCard({ title, value }: { title: string; value: string }) {
  // Use a regex to extract the number and any suffixes like '+', 'M', or 'B'
  const match = value.match(/(\d+)([+MB,.]*)/);
  
  // This line is crucial: it removes the comma before parsing the number
const targetNumber = match ? parseInt(match[1].replace(/,/g, ""), 10) : 0;
console.log('Target Number:', targetNumber); // Add this line  
  const suffix = match ? match[2] : "";

  // State to hold the current animated number
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    // Only run the animation if the number is valid
    if (targetNumber === 0) return;

    let start = 0;
    // The duration of the animation in milliseconds
    const duration = 1000;
    let startTime: number | null = null;

    // The animation function
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;

      // Calculate the new value based on time elapsed
      const newValue = Math.min(
        Math.floor((progress / duration) * targetNumber),
        targetNumber
      );

      // Update the state
      setCurrentValue(newValue);

      // Continue the animation until the target is reached
      if (progress < duration) {
        requestAnimationFrame(animate);
      }
    };

    // Start the animation
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