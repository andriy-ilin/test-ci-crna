import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer
} from "react-navigation";
import Header from "../components/Header";
import HomeScreen from "../screens/HomeScreen";
import ArticleScreen from "../screens/ArticleScreen";

const ListsNavigator = createBottomTabNavigator({
  home: {
    screen: HomeScreen
  },
  article: {
    screen: ArticleScreen
  }
});

const StackNavigator = createStackNavigator(
  {
    home: {
      screen: HomeScreen
    },
    article: {
      screen: ArticleScreen
    }
  },
  {
    initialRouteName: "home",
    navigationOptions: ({ navigation }) => {
      return {
        // mode: 'card'
      };
    }
  }
);

export default createAppContainer(StackNavigator);
