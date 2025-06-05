import { useTranslation } from "react-i18next";

export default function GetStartChatPage() {
  const { t } = useTranslation();
  return (
    <div className="h-full flex items-center justify-center">
      {t("welcome_app")}
    </div>
  );
}
