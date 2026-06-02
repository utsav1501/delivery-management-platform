import Navbar from "./Navbar";
import CreateDelivery from "./CreateDelivery";
import { useNavigate } from "react-router-dom";

function CustomerDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Navbar />

      <h1 className="text-3xl font-bold mt-6 mb-6">
        Customer Dashboard
      </h1>
      <CreateDelivery />
    </div>
  );
}

export default CustomerDashboard;