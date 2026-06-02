import { useEffect, useState } from "react";
import axiosInstance from "../api/axios";

function AdminPayments() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await axiosInstance.get("users/admin/payments/");

      setPayments(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Payments</h1>

      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-4 text-left">ID</th>
              <th className="p-4 text-left">Amount</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Razorpay Order ID</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id} className="border-b">
                <td className="p-4">{payment.id}</td>
                <td className="p-4">₹{payment.amount}</td>
                <td className="p-4">{payment.status}</td>
                <td className="p-4">{payment.razorpay_order_id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminPayments;
