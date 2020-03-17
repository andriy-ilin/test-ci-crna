import i18n from "i18next";
import { reactI18nextModule } from "react-i18next";
import * as Localization from "expo-localization";
import en from "../locale/en.json";
import de from "../locale/de.json";
import uk from "../locale/uk.json";
// creating a language detection plugin using expo
// http://i18next.com/docs/ownplugin/#languagedetector
const languageDetector = {
  type: "languageDetector",
  async: true, // flags below detection to be async
  detect: callback => {
    return /*'en'; */ Localization.getLocalizationAsync().then(({ locale }) => {
      // console.log("locale from localization services", locale);
      callback(locale.includes("-") ? locale.split("-")[0] : locale);
    });
  },
  init: () => {},
  cacheUserLanguage: () => {}
};

i18n
  .use(languageDetector)
  .use(reactI18nextModule)
  .init({
    fallbackLng: "en",

    resources: {
      en,
      de,
      uk
    },

    // have a common namespace used around the full app
    ns: ["common"],
    defaultNS: "common",

    debug: true,

    // cache: {
    //   enabled: true
    // },

    interpolation: {
      escapeValue: false // not needed for react as it does escape per default to prevent xss!
    }
  });

export default i18n;
