import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setLocalStorage } from "../hooks/localStorage";
import { useTranslation } from "react-i18next";
import useGetMe from "../utils/getMe";

const OAuthCallback = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const getMe = useGetMe();
  useEffect(() => {
    if (location.pathname === "/oauth-callback") {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("access_token");
      if (token) {
        setLocalStorage({ key: "token", value: token });
        (async () => {
          await getMe();
        })();
        navigate("/conversation"); // hoặc route bạn muốn chuyển tới
      } else {
        navigate("/");
      }
    }
  }, [navigate, getMe]);

  return <div>{t("loading")}</div>;
};

export default OAuthCallback;
