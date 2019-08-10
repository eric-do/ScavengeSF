import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator,
  createSwitchNavigator
} from "react-navigation";
import LocationList from "./screens/Home/LocationList.js";
import LandmarkList from "./screens/Home/LandmarkList.js";
import QuestionList from "./screens/Home/QuestionList.js";
import AnswerList from "./screens/Home/AnswerList.js";
import AchievementList from "./screens/Achievements/AchievementList.js";
import SelectLocation from "./screens/AddQuestion/SelectLocation";
import SelectLandmark from "./screens/AddQuestion/SelectLandmark";
import AddQuestion from "./screens/AddQuestion/AddQuestion";
import AddAnswer from "./screens/AddQuestion/AddAnswer";
import QuestionSummary from "./screens/AddQuestion/QuestionSummary";
import SignUp from "./screens/Login/SignUp";
import SignIn from "./screens/Login/SignIn";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";

const ScavengeStack = createStackNavigator({
  Home: LocationList,
  Landmarks: LandmarkList,
  Questions: QuestionList,
  Answers: AnswerList
});

const AddStack = createStackNavigator({
  SelectLocation: SelectLocation,
  SelectLandmark: SelectLandmark,
  AddQuestion: AddQuestion,
  AddAnswer: AddAnswer,
  QuestionSummary: QuestionSummary
});

const AchievementStack = createStackNavigator({
  Achievements: AchievementList
});

export const SignedOut = createSwitchNavigator(
  {
    SignIn: {
      screen: SignIn,
      navigationOptions: {
        title: "Sign In",
        header: null
      }
    },
    SignUp: {
      screen: SignUp,
      navigationOptions: {
        title: "Sign Up",
        header: null
      }
    }
  },
  { initialRouteName: "SignIn" }
);

export const SignedIn = createBottomTabNavigator(
  {
    Scavenge: ScavengeStack,
    Add: AddStack,
    Achievements: AchievementStack
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        const icon =
          routeName === "Scavenge"
            ? "globe-asia"
            : routeName === "Achievements"
            ? "crown"
            : routeName === "Add"
            ? "plus"
            : null;

        return <FontAwesomeIcon icon={icon} color={tintColor} size={20} />;
      }
    }),
    tabBarOptions: {
      activeTintColor: "#3498DB",
      showLabel: true
    }
  }
);

export const createRootNavigator = (signedIn = false) =>
  createAppContainer(
    createSwitchNavigator(
      { SignedIn, SignedOut },
      { initialRouteName: signedIn ? "SignedIn" : "SignedOut" }
    )
  );
