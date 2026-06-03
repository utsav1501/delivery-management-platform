import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CustomerDashboard from "./components/CustomerDashboard";
import DriverDashboard from "./components/DriverDashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/AdminDashboard";
import AdminDeliveries from "./admin/AdminDeliveries";
import AdminUsers from "./admin/AdminUsers";
import AdminPayments from "./admin/AdminPayments";
import DeliveryList from "./components/DeliveryList";
import AdminLogin from "./pages/AdminLogin";
import AdminRoutes from "./routes/AdminRoutes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/customer"
          element={
            <ProtectedRoute allowedRole="CUSTOMER">
              <CustomerDashboard />
            </ProtectedRoute>
          }
        />{" "}
        <Route path="/deliveries" element={<DeliveryList />} />

        <Route
          path="/driver"
          element={
            <ProtectedRoute allowedRole="DRIVER">
              <DriverDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <AdminRoutes>
              <AdminLayout />
            </AdminRoutes>
          }
        >
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/deliveries" element={<AdminDeliveries />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/payments" element={<AdminPayments />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
