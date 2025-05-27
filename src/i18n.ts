import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
const resources = {
  en: {
    translation: {
      "Welcome to React": "Welcome to React and react-i18next",
      "label": "ChatBotE"
    }
  },
  fr: {
    translation: {
      "Welcome to React": "Bienvenue à React et react-i18next",
      "label": "CkatPotF"
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "vi", // language to use
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;