import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardHome from "./pages/DashboardHome";
import Shipments from "./pages/Shipments";
import Tracking from "./pages/Tracking";
import Profile from "./pages/Profile";
import "./index.css";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="shipments" element={<Shipments />} />
          <Route path="tracking" element={<Tracking />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
}
