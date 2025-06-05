import { Button, Result } from "antd";
import { useTranslation } from "react-i18next";

const ErrorPage = () => {
  const { t } = useTranslation();
  return (
    <Result
      status="404"
      title="404"
      subTitle={t("page_not_found")}
      extra={<Button type="primary">{t("back")}</Button>}
    />
  );
};

export default ErrorPage;
