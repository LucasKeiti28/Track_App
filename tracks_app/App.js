import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

import Account from "./src/pages/Account";
import SignIn from "./src/pages/SignIn";
import SignUp from "./src/pages/SignUp";
import TrackCreate from "./src/pages/TrackCreate";
import TrackList from "./src/pages/TrackList";
import TrackDetail from "./src/pages/TrackDetail";

const switchNavigator = createSwitchNavigator({
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
    Account
  })
});

export default createAppContainer(switchNavigator);
