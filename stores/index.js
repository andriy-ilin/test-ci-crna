import "../helpers/firebaseConfig";
import Navigation from "./navigation";
import Article from "./article";
import Regions from "./regions";
import Team from "./team";
import Video from "./video";
import Shop from "./shop";
import Favorite from "./favorite";
import Lang from "./lang";

const stores = {};
stores.navigation = new Navigation(stores);
stores.article = new Article(stores);
stores.regions = new Regions(stores);
stores.team = new Team(stores);
stores.video = new Video(stores);
stores.shop = new Shop(stores);
stores.favorite = new Favorite(stores);
stores.lang = new Lang(stores);

export default stores;
