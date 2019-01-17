import React from "react";
import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer
} from "react-navigation";

import Header from "../components/Header";
import TabBar from "../components/TabBar";
import MenuScreen from "../screens/MenuScreen";
import HomeScreen from "../screens/HomeScreen";
import AboutScreen from "../screens/AboutScreen";
import PartnersScreen from "../screens/PartnersScreen";
import ContactsScreen from "../screens/ContactsScreen";
import DonateScreen from "../screens/DonateScreen";
import ShopScreen from "../screens/ShopScreen";
import FavoriteScreen from "../screens/FavoriteScreen";
import RegionsScreen from "../screens/RegionsScreen";
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
    }
  },
  { defaultNavigationOptions: { header: null } }
);

export default createAppContainer(MainNavigator);
