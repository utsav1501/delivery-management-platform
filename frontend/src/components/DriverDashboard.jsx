import { useState, useEffect } from "react";
import axiosInstance from "../api/axios";
import { connectSocket, sendLocation } from "../websocket/socket";
import Navbar from "./Navbar";

function DriverDashboard() {
  const [deliveries, setDeliveries] = useState([]);

  useEffect(() => {
    fetchDeliveries();
  }, []);

  const fetchDeliveries = async () => {
    try {
      const response = await axiosInstance.get("deliveries/pending/");
      console.log(response);
      setDeliveries(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const acceptDelivery = async (deliveryId) => {
    try {
      await axiosInstance.post(`deliveries/${deliveryId}/accept/`);
      alert("Delivery accepted");
      connectSocket(deliveryId, () => {});
      fetchDeliveries();
    } catch (error) {
      console.log(error);
    }
  };

  const startLiveTracking = () => {
    (navigator.geolocation.watchPosition((position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      sendLocation(latitude, longitude);
      console.log("Location sent:", latitude, longitude);
    }),
      (error) => {
        console.error("Error getting location:", error);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 5000,
      });
  };

  const updateStatus = async (deliveryId, status) => {
    try {
      await axiosInstance.post(`deliveries/${deliveryId}/update_status/`, {
        status,
      });
      alert(`Delivery status updated to ${status}`);
      fetchDeliveries();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Navbar />
      <h3 className="text-3xl font-bold mb-6">Driver Dashboard</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {deliveries.map((delivery) => (
          <div
            key={delivery.id}
            className="bg-white p-5 rounded-xl shadow-lg border"
          >
            <div className="flex justify-between items-center mb-4"></div>
            <p className="mb-2">
              <strong>Pickup:</strong> {delivery.pickup_address}
            </p>
            <p className="mb-2">
              <strong>Drop:</strong> {delivery.drop_address}
            </p>
            <p className="mb-2">
              <strong>Price:</strong> ₹ {delivery.price}
            </p>
            <p className="mb-2">
              <strong>Status:</strong> {delivery.status}
            </p>
            <p className="mb-2">
              <strong>Driver:</strong> {delivery.driver}
            </p>
            <p className="mb-2">
              <strong>Distance:</strong> {delivery.distance || "No notes"}
            </p>
            <div className="flex flex-wrap gap-3 mt-4">
              {delivery.status === "PENDING" && (
                <button
                  className="w-full px-4 py-3 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
                  onClick={() => acceptDelivery(delivery.id)}
                >
                  Accept Delivery
                </button>
              )}

              {delivery.status === "ACCEPTED" && (
                <>
                  <button
                    className="flex-1 px-4 py-3 rounded-lg bg-sky-600 text-white hover:bg-sky-700 transition"
                    onClick={startLiveTracking}
                  >
                    Start Tracking
                  </button>

                  <button
                    className="flex-1 px-4 py-3 rounded-lg bg-gray-600 text-white hover:bg-gray-700 transition"
                    onClick={() =>
                      updateStatus(delivery.id, "PICKED_UP",)}
                  >
                    Mark Picked Up
                  </button>
                </>
              )}

              {delivery.status === "PICKED_UP" && (
                <button
                  className="w-full px-4 py-3 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
                  onClick={() =>
                    updateStatus(
                      delivery.id,
                      "DELIVERED",
                    )
                  }
                >
                  Mark Delivered
                </button>
              )}

              {delivery.status === "DELIVERED" && (
                <div className="w-full px-4 py-3 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"> 
                  Delivery Completed
                </div>
              )}

              {delivery.status === "CANCELLED" && (
                <div
                  className="w-full bg-red-100 text-red-800 py-3 rounded-lg text-center font-semibold">
                  Delivery Cancelled
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DriverDashboard;
