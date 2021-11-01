import React from "react";
import { Animated, Easing, Image, StyleSheet } from "react-native";
import { connect } from "react-redux";
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack'
import {createDrawerNavigator} from 'react-navigation-drawer'
import {
  createReactNavigationReduxMiddleware,
  createReduxContainer
} from "react-navigation-redux-helpers";
import DashboardScreen from "../screens/DashboardScreen";
import HomeScreen from "../screens/home/HomeScreen";
import QuestionScreen from "../screens/home/kQuestionScreen";
import ResultScreen from "../screens/home/ResultScreen";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import UsermanualScreen1 from "../screens/usermanual/UsermanualScreen1";
import UsermanualScreen2 from "../screens/usermanual/UsermanualScreen2";
import { AppIcon, AppStyles } from "../AppStyles";
import { Configuration } from "../Configuration";
import DrawerContainer from "../components/DrawerContainer";
import SettingScreen from "../screens/SettingScreen";
import ExportScreen from "../screens/ExportScreen";
import ScreeningScreen1 from "../screens/screening/ScreeningScreen1";
import ScreeningScreen2 from "../screens/screening/ScreeningScreen2";
import ScreeningScreen3 from "../screens/screening/ScreeningScreen3";
import ScreeningScreen4 from "../screens/screening/ScreeningScreen4";
import ScreeningScreen5 from "../screens/screening/ScreeningScreen5";
import ScreeningScreen6 from "../screens/screening/ScreeningScreen6";
import done from "../screens/screening/done";
const noTransitionConfig = () => ({
  transitionSpec: {
    duration: 0,
    timing: Animated.timing,
    easing: Easing.step0
  }
});

const middleware = createReactNavigationReduxMiddleware(
  state => state.nav
);

// login stack
const LoginStack = createStackNavigator(
  {
    Login: { screen: LoginScreen },
    Signup: { screen: SignupScreen },
    Screening1: { screen: ScreeningScreen1 },
    Screening2: { screen: ScreeningScreen2 },
    Screening3: { screen: ScreeningScreen3 },
    Screening4: { screen: ScreeningScreen4 },
    Screening5: { screen: ScreeningScreen5 },
    Screening6: { screen: ScreeningScreen6 },
    done: { screen: done},
    Welcome: { screen: WelcomeScreen }
  },
  {
    initialRouteName: "Welcome",
    headerMode: "float",
    navigationOptions: ({ navigation }) => ({
      headerTintColor: "red",
      headerTitleStyle: styles.headerTitleStyle
    }),
    cardStyle: { backgroundColor: "#FFFFFF" }
  }
);

const SettingStack = createStackNavigator(
  {
    Setting: { screen: SettingScreen },
  },
  {
    initialRouteName: "Setting",
    headerMode: "float",

    headerLayoutPreset: "center",
    navigationOptions: ({ navigation }) => ({
      headerTintColor: "red",
      headerTitleStyle: styles.headerTitleStyle
    }),
    cardStyle: { backgroundColor: "#FFFFFF" }
  }
);

const ExportStack = createStackNavigator(
  {
    Export: { screen: ExportScreen },
  },
  {
    initialRouteName: "Export",
    headerMode: "float",

    headerLayoutPreset: "center",
    navigationOptions: ({ navigation }) => ({
      headerTintColor: "red",
      headerTitleStyle: styles.headerTitleStyle
    }),
    cardStyle: { backgroundColor: "#FFFFFF" }
  }
);

const UsermanualStack = createStackNavigator(
  {
    UserManual1: { screen: UsermanualScreen1 },
    UserManual2: { screen: UsermanualScreen2 },
  },
  {
    initialRouteName: "UserManual1",
    headerMode: "float",

    headerLayoutPreset: "center",
    navigationOptions: ({ navigation }) => ({
      headerTintColor: "red",
      headerTitleStyle: styles.headerTitleStyle
    }),
    cardStyle: { backgroundColor: "#FFFFFF" }
  }
);

const DashboardStack = createStackNavigator(
  {
    Dashboard: { screen: DashboardScreen }
  },
  {
    initialRouteName: "Dashboard",
    headerMode: "float",

    headerLayoutPreset: "center",
    navigationOptions: ({ navigation }) => ({
      headerTintColor: "red",
      headerTitleStyle: styles.headerTitleStyle
    }),
    cardStyle: { backgroundColor: "#FFFFFF" }
  }
);

const HomeStack = createStackNavigator(
  {
    Home: { screen: HomeScreen },
    Question: { screen: QuestionScreen },
    Result: { screen: ResultScreen }
  },
  {
    initialRouteName: "Home",
    headerMode: "float",

    headerLayoutPreset: "center",
    navigationOptions: ({ navigation }) => ({
      headerTintColor: "red",
      headerTitleStyle: styles.headerTitleStyle
    }),
    cardStyle: { backgroundColor: "#FFFFFF" }
  }
);

const TabNavigator = createBottomTabNavigator(
  {
    Manual: { screen: UsermanualStack },
    Home: { screen: HomeStack },
    Dashboard: { screen: DashboardStack },
    Setting: { screen:SettingStack },
    Export: { screen:ExportStack }
    
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === "Home") {
          iconName = AppIcon.images.home;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return (
          <Image
            style={{
              tintColor: focused ? AppStyles.color.tint : AppStyles.color.grey
            }}
            source={iconName}
          />
        );
      }
    }),
    initialLayout: {
      height: 300
    },
    tabBarOptions: {
      activeTintColor: AppStyles.color.tint,
      inactiveTintColor: "gray",
      style: {
        height: Configuration.home.tab_bar_height
      }
    }
  }
);

// drawer stack
const DrawerStack = createDrawerNavigator(
  {
    Tab: TabNavigator
  },
  {
    drawerPosition: "left",
    initialRouteName: "Tab",
    drawerWidth: 200,
    contentComponent: DrawerContainer
  }
);

// Manifest of possible screens
const RootNavigator = createStackNavigator(
  {
    LoginStack: { screen: LoginStack },
    DrawerStack: { screen: DrawerStack }
  },
  {
    // Default config for all screens
    headerMode: "none",
    initialRouteName: "DrawerStack",
    transitionConfig: noTransitionConfig,
    navigationOptions: ({ navigation }) => ({
      color: "black"
    })
  }
);

const AppWithNavigationState = createReduxContainer(RootNavigator, "root");

const mapStateToProps = state => ({
  state: state.nav
});

const AppNavigator = connect(mapStateToProps)(AppWithNavigationState);

const styles = StyleSheet.create({
  headerTitleStyle: {
    fontWeight: "bold",
    textAlign: "center",
    alignSelf: "center",
    color: "black",
    flex: 1,
  }
});

export { RootNavigator, AppNavigator, middleware };
