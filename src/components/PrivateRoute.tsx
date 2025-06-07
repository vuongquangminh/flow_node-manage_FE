// src/components/PrivateRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { getLocalStorage } from "../hooks/localStorage";
import useGetMe from "../utils/getMe";
import { useEffect } from "react";

const PrivateRoute = () => {
  const getMe = useGetMe();
  const token = getLocalStorage({ key: "token" });
  const user = getLocalStorage({ key: "user" });
  
  useEffect(() => {
    if (token && !user) {
      getMe();
    }
  }, [token, user, getMe]);
  
  if (!token) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
