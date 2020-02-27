import InsertUsername from './Components/InsertUsername';
import InsertGit from './Components/InsertGitRepoName';
import MainPage from './Components/MainPage';
import LastPage from './Components/LastPage';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import 'react-native-gesture-handler';

const AppRouter = createStackNavigator({
  Home: {
    screen: MainPage,
    navigationOptions: ({ navigation }) => ({
      headerMode: "none",
      header: null
    }),
  },
  UserName: {
    screen: InsertUsername,
    navigationOptions: ({ navigation }) => ({
      headerMode: "none",
      header: null
    }),
  },
  InsertGit: {
    screen: InsertGit,
    navigationOptions: ({ navigation }) => ({
      headerMode: "none",
      header: null
    }),
  },
  LastPage: {
    screen: LastPage,
    navigationOptions: ({ navigation }) => ({
      headerMode: "none",
      header: null
    }),
  },
  initialRouteName: "LastPage",
});

const AppContainer = createAppContainer(AppRouter);

export default AppContainer;
