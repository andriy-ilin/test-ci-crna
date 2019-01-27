import "../helpers/firebaseConfig";
import Navigation from "./navigation";
import Article from "./article";
import Regions from "./regions";
import Team from "./team";
import Video from "./video";
import Localization from "./localization";
import Shop from "./shop";

const stores = {};
stores.navigation = new Navigation(stores);
stores.article = new Article(stores);
stores.regions = new Regions(stores);
stores.team = new Team(stores);
stores.video = new Video(stores);
stores.localization = new Localization(stores);
stores.shop = new Shop(stores);

export default stores;
