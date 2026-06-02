import { useState } from "react";
import axiosInstance from "../api/axios";
import { useNavigate } from "react-router-dom";
function CreateDelivery() {
  const [formData, setFormData] = useState({
    pickup_address: "",
    drop_address: "",
    pickup_latitude: "",
    pickup_longitude: "",
    drop_latitude: "",
    drop_longitude: "",
    price: "",
    distance: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const deliveryResponse = await axiosInstance.post(
        "deliveries/create/",
        formData,
      );
      const deliveryId = deliveryResponse.data.id;
      const paymentResponse = await axiosInstance.post(
        `payments/${deliveryId}/create/`,
      );
      console.log(paymentResponse.data);
      // open Razorpay checkout with the order details
      const options = {
        key: paymentResponse.data.key,
        amount: paymentResponse.data.amount,
        currency:paymentResponse.data.currency,
        order_id: paymentResponse.data.razorpay_order_id,
        name: "Delivery Platform",
        description: "Delivery payment",
        handler: async function (response) {
          try {
            await axiosInstance.post("payments/verify/", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            alert("Payment Successfull and delivery created");
          } catch (error) {
            console.log(error);
            alert("Payment Verification Failed");
          }
        },
        prefill: {
          name: localStorage.getItem("username"),
        },
        theme: {
          color: "#000000",
        },
      };
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.log(error);
      console.log(error.response);
  console.log(error.response.data);
      alert("Something went wrong");
    }
  };
  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 mt-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Create Delivery</h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <input
          type="text"
          name="pickup_address"
          placeholder="Pickup Address"
          onChange={handleChange}
          className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
        />

        <input
          type="text"
          name="drop_address"
          placeholder="Drop Address"
          onChange={handleChange}
          className="border p-3 rounded-lg  focus:outline-none  focus:ring-2  focus:ring-black"
        />

        <input
          type="number"
          step="any"
          name="pickup_latitude"
          placeholder="Pickup Latitude"
          onChange={handleChange}
          className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
        />

        <input
          type="number"
          step="any"
          name="pickup_longitude"
          placeholder="Pickup Longitude"
          onChange={handleChange}
          className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
        />

        <input
          type="number"
          step="any"
          name="drop_latitude"
          placeholder="Drop Latitude"
          onChange={handleChange}
          className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
        />

        <input
          type="number"
          step="any"
          name="drop_longitude"
          placeholder="Drop Longitude"
          onChange={handleChange}
          className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
        />

        <input
          type="number"
          step="any"
          name="distance"
          placeholder="Distance (km)"
          onChange={handleChange}
          className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          onChange={handleChange}
          className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
        />
        <button
          type="submit"
          className="w-full md:w-auto border p-3 rounded-lg hover:bg-gray-800 bg-blue-600 text-white font-semibold focus:outline-none focus:ring-2 focus:ring-black"
        >
          Pay & Create Delivery
        </button>
        <button
          type="button"
          onClick={() => navigate("/deliveries")}
          className="w-full md:w-auto border p-3 rounded-lg hover:bg-gray-800 bg-black text-white font-semibold focus:outline-none focus:ring-2 focus:ring-black"
        >
          View My Deliveries
        </button>
      </form>
    </div>
  );
}

export default CreateDelivery;
