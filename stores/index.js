import "../helpers/firebaseConfig";
import Navigation from "./navigation";
import Article from "./article";
import Regions from "./regions";
import Localization from "./localization";

const stores = {};
stores.navigation = new Navigation(stores);
stores.article = new Article(stores);
stores.regions = new Regions(stores);
stores.localization = new Localization(stores);

export default stores;
