// src/components/PrivateRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { getLocalStorage } from "../hooks/localStorage";
import useGetMe from "../utils/getMe";
import { useEffect } from "react";


interface PrivateRouteProps {
  roles?: string[]; // Danh sách role được phép
}

const PrivateRoute = ({ roles }: PrivateRouteProps) => {
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
  // Nếu có truyền roles, kiểm tra role user
  if (roles && roles.length > 0) {
    if (!user || !roles.includes(user.role)) {
      return <Navigate to="/" replace />;
    }
  }

  return <Outlet />;
};

export default PrivateRoute;
