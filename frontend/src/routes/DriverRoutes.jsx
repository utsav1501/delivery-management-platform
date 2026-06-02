import {Navigate} from "react-router-dom";
function DriverRoutes({ children }) { 
    const role=localStorage.getItem("role");
    if(role!=="driver"){
        return <Navigate to="/login"/>;
    }
    return children;
}
export default DriverRoutes;