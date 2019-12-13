import React, { useContext } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { NavigationEvents } from "react-navigation";

import { Context as AuthContext } from "../context/AuthContext";
import AuthForm from "../components/AuthForm";
import NavLink from "../components/NavLink";

const SignIn = () => {
  const { state, signIn, clearMessage } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <NavigationEvents
        // onWillFocus={() => {}}
        // onDidFocus={() => {}}
        onWillBlur={clearMessage}
        // onDidBlur={() => {}}
      />
      <AuthForm
        headerText="Sign in for Tracker"
        errorMessage={state.errorMessage}
        onSubmit={signIn}
        submitButtonText="Sign in"
      />
      <NavLink
        text="Don't have an account, create one click here."
        routeName="SignUp"
      />
    </View>
  );
};

// Hiding the header of createStackNavigator
SignIn.navigationOptions = () => {
  return {
    header: null
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 200
  }
});

export default SignIn;
