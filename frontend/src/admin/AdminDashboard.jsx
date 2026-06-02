import { useEffect,useState } from "react";
import axiosInstance from "../api/axios";

function AdminDashboard(){
    const[stats,setStats]=useState({
        total_users:0,
        total_drivers:0,
        total_deliveries:0,
        total_revenue:0
    })
    useEffect(()=>{
        fetchstats();
    },[])

    const fetchstats=async()=>{
        try{
            const response=await axiosInstance.get("users/admin/stats/");
            setStats(response.data)
        }catch(error){
            console.log(error);  
        }
    }

    return(
        <div>
            <h1 className="text-3xl font-bold mb-6">
                Admin Dashboard
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                <div className="bg-white p-6 rounded-xl shadow">
                    <h3>Total Users</h3>
                    <p className="text-3xl font-bold">{stats.total_users}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow">
                    <h3>Total Drivers</h3>
                    <p className="text-3xl font-bold">{stats.total_drivers}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow">
                    <h3>Total Deliveries</h3>
                    <p className="text-3xl font-bold">{stats.total_deliveries}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow">
                    <h3>Total Revenue</h3>
                    <p className="text-3xl font-bold">₹{stats.total_revenue}</p>
                </div>
            </div>
        </div>
    )
}
export default AdminDashboard;