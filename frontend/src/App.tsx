import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardHome from "./pages/DashboardHome";
import Shipments from "./pages/Shipments";
import CreateShipment from "./pages/CreateShipment";
import Tracking from "./pages/Tracking";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./pages/Register";
import 'leaflet/dist/leaflet.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected dashboard routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="shipments" element={<Shipments />} />
          <Route path="shipments/create" element={<CreateShipment />} />
          <Route path="profile" element={<Profile />} />
          <Route path="tracking" element={<Tracking />} /> {/* ✅ Moved inside */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}