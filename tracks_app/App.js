import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

import { setNavigator } from "./src/navigationRef";

import Accountt from "./src/pages/Account";
import SignIn from "./src/pages/SignIn";
import SignUp from "./src/pages/SignUp";
import TrackCreate from "./src/pages/TrackCreate";
import TrackList from "./src/pages/TrackList";
import TrackDetail from "./src/pages/TrackDetail";
import Initial from "./src/pages/Initial";

import { Provider as AuthProvider } from "./src/context/AuthContext";
import { Provider as LocationProvider } from "./src/context/LocationContext";

const switchNavigator = createSwitchNavigator(
  {
    Initial,
    loginFlow: createStackNavigator({
      SignUp,
      SignIn
    }),
    mainFlow: createBottomTabNavigator({
      trackListFlow: createStackNavigator({
        TrackList,
        TrackDetail
      }),
      TrackCreate,
      Accountt
    })
  },
  {
    initialRouteName: "Initial"
  }
);

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <LocationProvider>
      <AuthProvider>
        <App ref={navigator => setNavigator(navigator)} />
      </AuthProvider>
    </LocationProvider>
  );
};
