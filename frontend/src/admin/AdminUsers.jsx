import { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import {FaTrash} from "react-icons/fa"

function AdminUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get("users/admin/users/");
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser=async(userId)=>{
    const confirmed=window.confirm(
      "Delete this user?"
    );
    if(!confirmed){
      return;
    }
    try{
      await axiosInstance.delete(`users/admin/users/${userId}/delete/`);
      fetchUsers();
    }catch(error){
      console.log(error);
      
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Users</h1>
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-4 text-left">ID</th>
              <th className="p-4 text-left">Username</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Role</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b">
                <td className="p-4">{user.id}</td>
                <td className="p-4">{user.username}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">{user.role}</td>
                <td className="p-4">
                  <button onClick={()=>deleteUser(user.id)} className="flex">
                    <FaTrash/>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminUsers;
