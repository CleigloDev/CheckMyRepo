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
      headerShown:false,
    }),
  },
  UserName: {
    screen: InsertUsername,
    navigationOptions: ({ navigation }) => ({
      headerShown:false,
    }),
  },
  InsertGit: {
    screen: InsertGit,
    navigationOptions: ({ navigation }) => ({
      headerShown:false,
    }),
  },
  LastPage: {
    screen: LastPage,
    navigationOptions: ({ navigation }) => ({
      headerShown:false
    }),
  },
  initialRouteName: "Home",
});

const AppContainer = createAppContainer(AppRouter);

export default AppContainer;
