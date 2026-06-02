import { useEffect, useState } from "react";
import axiosInstance from "../api/axios";

const getStatusClass = (status) => {
  switch (status) {
    case "PENDING":
      return "bg-yellow-100 text-yellow-700";

    case "ACCEPTED":
      return "bg-blue-100 text-blue-700";

    case "PICKED_UP":
      return "bg-purple-100 text-purple-700";

    case "DELIVERED":
      return "bg-green-100 text-green-700";

    case "CANCELLED":
      return "bg-red-100 text-red-700";

    default:
      return "bg-gray-100 text-gray-700";
  }
};

function AdminDeliveries() {
  const [deliveries, setDeliveries] = useState([]);
  const [drivers,setDrivers]=useState([])

  useEffect(() => {
    fetchDeliveries();
    fetchDrivers();
  }, []);

  const fetchDeliveries = async () => {
    try {
      const response = await axiosInstance.get("users/admin/deliveries/");
      setDeliveries(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDrivers=async()=>{
    try{
      const response=await axiosInstance.get("users/admin/drivers/");
      setDrivers(response.data)
    }
    catch (error) {
      console.log(error);
    }
  }
  
  const assignDriver=async(deliveryId,driverId)=>{
    try{
      await axiosInstance.post(`users/admin/deliveries/${deliveryId}/assign-driver`,{driver_id:driverId});
      fetchDeliveries();
    }
    catch(error){
      console.log(error);
      
    }
  }

  const update_status=async(deliveryId,status)=>{
    try{
      await axiosInstance.post(`users/admin/deliveries/${deliveryId}/status`,{status});
      fetchDeliveries();
    }catch(error){
      console.log(error);
      
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Deliveries
      </h1>

      <div className="bg-whiterounded-xlshadowoverflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className=" bg-gray-200">
              <th className="p-4">ID</th>
              <th className="p-4">Pickup</th>
              <th className="p-4">Drop</th>
              <th className="p-4">Price</th>
              <th className="p-4">Status</th>
              <th className="p-4">Assign Driver</th>
              <th className="p-4">Change Status</th>
            </tr>
          </thead>
          <tbody>
            {deliveries.map((delivery) => (
              <tr key={delivery.id}className="border-b">
                <td className="p-4">{delivery.id}</td>
                <td className="p-4">{delivery.pickup_address}</td>
                <td className="p-4">{delivery.drop_address}</td>
                <td className="p-4">₹{delivery.price}</td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full font-medium ${getStatusClass(delivery.status)}`}
                  >
                    {delivery.status}
                  </span>
                </td>
                <td className="p-4">
                  <select onChange={(e)=>assignDriver(deliveryId,e.target.value)}
                   className="border p-2 rounded"  
                  >
                  {drivers.map((driver)=>(
                    <option key={driver.id} value={driver.id}>
                      {driver.username}
                    </option>
                  ))}
                  </select>
                </td>
                <td className="p-4">
                  <select value={delivery.status} onChange={(e)=>{
                    update_status(delivery.id,e.target.value)
                  }}
                  className="border p-2 rounded"
                  >
                    <option value="PENDING">
                      PENDING
                    </option>
                    <option value="ACCEPTED">ACCEPTED</option>
                    <option value="PICKED_UP">PICKED_UP</option>
                    <option value="DELIVERED">DELIVERED</option>
                    <option value="CANCELLED">CANCELLED</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDeliveries;
