// src/components/PrivateRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { getLocalStorage } from "../hooks/localStorage";

const PrivateRoute = () => {
  // const token = getLocalStorage({ key: "token" });
  // // Nếu không có token thì redirect về trang đăng nhập
  // console.log("token: ", token);
  // if (!token) {
  //   return <Navigate to="/" replace />;
  // }

  return <Outlet />;
};

export default PrivateRoute;
