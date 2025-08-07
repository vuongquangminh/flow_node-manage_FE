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

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en", // language to use
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
