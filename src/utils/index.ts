import { notification } from "antd";
import { useTranslation } from "react-i18next";

export function useNotice() {
  const { t } = useTranslation();
  const [api, contextHolder] = notification.useNotification();

  const noticeSuccess = (nameKey: string) => {
    api.success({
      message: t("success"),
      description: t("feature_success", { name: t(nameKey) }),
    });
  };

  const noticeError = (errorMsg: string) => {
    api.error({
      message: t("failed"),
      description: errorMsg,
    });
  };

  return { noticeSuccess, noticeError, contextHolder };
}
