import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="flex justify-between items-center bg-black text-white px-6 py-4 ">
      <h2 className="text-2xlfont-bold">
        Delivery Platform
      </h2>
      <div className="flex items-center gap-4">
        <p>{username}</p>
        <p className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded"> {role} </p>
        <button onClick={logout} className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
