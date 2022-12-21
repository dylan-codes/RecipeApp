import { useContext } from "react";
import { Outlet } from "react-router-dom"
import AuthContext from "../context/auth-context";
import Dashboard from "../pages/Dashboard";

const PublicRoutes = () => {
  const AuthCtx = useContext(AuthContext);
  
  const userIsAuthenticated = AuthCtx.user;
  return  !userIsAuthenticated ? <Outlet /> : <Dashboard/>
}

export default PublicRoutes