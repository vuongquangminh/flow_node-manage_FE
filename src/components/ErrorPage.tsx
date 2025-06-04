import { Button, Result } from "antd";
import { useTranslation } from "react-i18next";

const ErrorPage = () => {
  const { t } = useTranslation();
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={<Button type="primary">{t("back")}</Button>}
    />
  );
};

export default ErrorPage;
