import "../helpers/firebaseConfig";

import Navigation from "./navigation";
import Article from "./article";

const stores = {};
stores.navigation = new Navigation(stores);
stores.article = new Article(stores);

export default stores;
