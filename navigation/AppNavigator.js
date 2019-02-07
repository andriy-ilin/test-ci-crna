import React from "react";
import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer
} from "react-navigation";

import Header from "../components/Header";
import TabBar from "../components/TabBar";
import MenuScreen from "../screens/MenuScreen";
import MapScreen from "../screens/MapScreen";
import HomeScreen from "../screens/HomeScreen";
import AboutScreen from "../screens/AboutScreen";
import TeamScreen from "../screens/TeamScreen";
import AuthorScreen from "../screens/AuthorScreen";
import VideoScreen from "../screens/VideoScreen";
import PartnersScreen from "../screens/PartnersScreen";
import ContactsScreen from "../screens/ContactsScreen";
import DonateScreen from "../screens/DonateScreen";
import ShopScreen from "../screens/ShopScreen";
import ProductScreen from "../screens/ProductScreen";
import CartScreen from "../screens/CartScreen";
import FavoriteScreen from "../screens/FavoriteScreen";
import RegionsScreen from "../screens/RegionsScreen";
import RegionArticlesScreen from "../screens/RegionArticlesScreen";
import ArticleScreen from "../screens/ArticleScreen";

const defaultNavigationOptions = props => ({
  header: <Header {...props} />
});

const HomeStackNavigator = createStackNavigator(
  {
    home: {
      screen: HomeScreen
    },
    article: {
      screen: ArticleScreen
    },
    about: {
      screen: AboutScreen
    },
    team: {
      screen: TeamScreen
    },
    author: {
      screen: AuthorScreen
    },
    video: {
      screen: VideoScreen
    },
    partners: {
      screen: PartnersScreen
    },
    contacts: {
      screen: ContactsScreen
    }
  },
  {
    initialRouteName: "home",
    defaultNavigationOptions
  }
);

const DonateStackNavigator = createStackNavigator(
  {
    donate: {
      screen: DonateScreen
    }
  },
  {
    defaultNavigationOptions
  }
);

const ShopStackNavigator = createStackNavigator(
  {
    shop: {
      screen: ShopScreen
    },
    product: {
      screen: ProductScreen
    },
    cart: {
      screen: CartScreen
    }
  },
  {
    defaultNavigationOptions
  }
);

const FavoriteStackNavigator = createStackNavigator(
  {
    favorite: {
      screen: FavoriteScreen
    },
    favoriteArticleId: {
      screen: ArticleScreen
    }
  },
  {
    defaultNavigationOptions
  }
);

const RegionsStackNavigator = createStackNavigator(
  {
    regions: {
      screen: RegionsScreen
    },
    regionArticles: {
      screen: RegionArticlesScreen
    },
    regionArticleId: {
      screen: ArticleScreen
    }
  },
  {
    defaultNavigationOptions
  }
);

const ListsNavigator = createBottomTabNavigator(
  {
    home: HomeStackNavigator,
    donate: DonateStackNavigator,
    shop: ShopStackNavigator,
    favorite: FavoriteStackNavigator,
    regions: RegionsStackNavigator
  },
  {
    initialRouteName: "home",

    defaultNavigationOptions: ({ navigation }) => ({
      tabBarVisible: true,
      tabBarComponent: props => <TabBar navigation={navigation} />
    })
  }
);

const MainNavigator = createStackNavigator(
  {
    main: {
      screen: ListsNavigator
    },
    menu: {
      screen: MenuScreen
    },
    map: {
      screen: MapScreen
    }
  },
  {
    // initialRouteName: "map",
    defaultNavigationOptions: { header: null }
  }
);

export default createAppContainer(MainNavigator);
