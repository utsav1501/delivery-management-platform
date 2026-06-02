import {Navigate} from "react-router-dom";

function AdminRoutes({ children }) { 
    const role=localStorage.getItem("role");
    if(role!=="ADMIN"){
        return <Navigate to="/admin" />;
    }
    return children;
}
export default AdminRoutes;