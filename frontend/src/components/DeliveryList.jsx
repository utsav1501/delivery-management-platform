import { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import TrackingMap from "./TrackingMap";
import DeliveryTimeline from "./DeliveryTimeline";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const getStatusColor = (status) => {
  switch (status) {
    case "PENDING":
      return "bg-yellow-100 text-yellow-800";
    case "ACCEPTED":
      return "bg-blue-100 text-blue-800";
    case "PICKED_UP":
      return "bg-purple-100 text-purple-800";
    case "IN_TRANSIT":
      return "bg-orange-100 text-orange-800";
    case "DELIVERED":
      return "bg-green-100 text-green-800";
    case "CANCELLED":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

function DeliveryList() {
  const [deliveries, setDeliveries] = useState([]);
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const navigate=useNavigate()  
  const fetchDeliveries = async () => {
    try {
      const response = await axiosInstance.get(
        "deliveries/customer_deliveries/"
      );
      setDeliveries(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDeliveries();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Navbar />
    <div className="flex justify-between items-center m-4">
      <h2 className="text-2xl font-bold">
        My Deliveries
      </h2>
      <button onClick={()=>navigate("/customer")} className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2">
        <FaArrowLeft />Create Delivery
        </button>
    </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {deliveries.map((delivery) => (
          <div
            key={delivery.id}
            className="bg-white shadow-lg rounded-xl p-5 border"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">
                Delivery #{delivery.id}
              </h3>
              <span
                className={`${getStatusColor(
                  delivery.status
                )} px-3 py-1 rounded-full text-sm font-semibold`}
              >
                {delivery.status}
              </span>
            </div>
            <p>
              <strong>Price:</strong> ₹{delivery.price}
            </p>
            <button
              onClick={() => setSelectedDelivery(delivery)}
              className="bg-black text-white py-2 px-4 rounded-lg w-full mt-4"
            >
              Track Delivery
            </button>
          </div>
        ))}
      </div>

      {selectedDelivery && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-[90%] max-w-5xl h-[90vh] rounded-2xl shadow-2xl overflow-y-auto p-6 relative">
            <button
              onClick={() => setSelectedDelivery(null)}
              className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg"
            >
              Close
            </button>

            <h2 className="text-3xl font-bold mb-4">
              Delivery #{selectedDelivery.id}
            </h2>

            <p className="mb-6">
              <strong>Status:</strong>{" "}
              {selectedDelivery.status}
            </p>

            <DeliveryTimeline
              status={selectedDelivery.status}
            />

            <div className="mt-6 rounded-xl overflow-hidden">
              <TrackingMap delivery={selectedDelivery} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DeliveryList;