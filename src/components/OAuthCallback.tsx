import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setLocalStorage } from "../hooks/localStorage";

const OAuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("location.pathname: ", location.pathname);
    if (location.pathname === "/oauth-callback") {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("access_token");
      if (token) {
        setLocalStorage({ key: "token", value: token });
        navigate("/chat-tool"); // hoặc route bạn muốn chuyển tới
      } else {
        navigate("/");
      }
    }
  }, [navigate]);

  return <div>Đang đăng nhập...</div>;
};

export default OAuthCallback;
