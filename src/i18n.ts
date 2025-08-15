import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationVI from "./translations/vi.json";
import translationEN from "./translations/en.json";

const resources = {
  vi: {
    translation: translationVI,
  },
  en: {
    translation: translationEN,
  },
};

export function initI18n(language: string) {
  i18n.use(initReactI18next).init({
    resources,
    lng: language || "en",
    interpolation: {
      escapeValue: false,
    },
  });

  return i18n;
}

export default initI18n;
