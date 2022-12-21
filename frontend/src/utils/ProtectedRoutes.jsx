import { useContext } from "react";
import { Outlet } from "react-router-dom"
import LandingPage from "../pages/LandingPage";
import AuthContext from "../context/auth-context";

const ProtectedRoutes = () => {
  const AuthCtx = useContext(AuthContext);
  
  const userIsAuthenticated = AuthCtx.user;
  return  userIsAuthenticated ? <Outlet /> : <LandingPage/>
}

export default ProtectedRoutes