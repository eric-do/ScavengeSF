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
import SignUp from "./screens/Login/SignUp";
import SignIn from "./screens/Login/SignIn";

const ScavengeStack = createStackNavigator({
  Home: LocationList,
  Landmarks: LandmarkList,
  Questions: QuestionList,
  Answers: AnswerList
});

const AchievementStack = createStackNavigator({
  Achievements: AchievementList
});

export const SignedOut = createStackNavigator({
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
});

export const SignedIn = createBottomTabNavigator({
  Scavenge: ScavengeStack,
  Achievements: AchievementStack
});

export const createRootNavigator = ( signedIn = false ) => (
  createAppContainer(createSwitchNavigator(
    { SignedIn, SignedOut },
    { initialRouteName: signedIn ? "SignedIn" : "SignedOut" }
  )
));