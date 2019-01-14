import "../helpers/firebaseConfig";
import Navigation from "./navigation";
import Article from "./article";
import Localization from "./localization";

const stores = {};
stores.navigation = new Navigation(stores);
stores.article = new Article(stores);
stores.localization = new Localization(stores);

export default stores;
