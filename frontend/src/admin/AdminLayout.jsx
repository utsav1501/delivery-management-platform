import { Link, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";

function AdminLayout() {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/admin-login");
  };
  return (
    <div className="flex min-h-screen overflow-hidden">
      <div className="w-64 bg-gray-900 text-white p-6 fixed left-0 top-0 h-screen">
        <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
        <nav className="flex flex-col gap-4">
          <Link to="/admin/dashboard" className="hover:text-yellow-400">
            Dashboard
          </Link>
          <Link to="/admin/deliveries" className="hover:text-yellow-400">
            Deliveries
          </Link>
          <Link to="/admin/users" className="hover:text-yellow-400">
            Users
          </Link>
          <Link to="/admin/payments" className="hover:text-yellow-400">
            Payments
          </Link>
          <button
            onClick={() => setShowLogoutModal(true)}
            className="text-left hover:text-red-400"
          >
            Logout
          </button>{" "}
        </nav>
      </div>
      <div className="ml-64 flex-1 bg-gray-100 p-6 h-screen overflow-y-auto">
        <Outlet />
      </div>

      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-96 shadow-xl">
            <h3 className="text-xl font-semibold mb-3">Confirm Logout</h3>

            <p className="text-gray-600 mb-6">
              Are you sure you want to logout?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default AdminLayout;
