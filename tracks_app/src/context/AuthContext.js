import { AsyncStorage } from "react-native";
import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";

import { navigate } from "../navigationRef";

const authReducer = (state, action) => {
  switch (action.type) {
    case "SIGN_IN":
      return { errorMessage: "", token: action.payload };
    case "ADD_ERROR":
      return { ...state, errorMessage: action.payload };
    case "CLEAR_MESSAGE":
      return { ...state, errorMessage: "" };
    case "SIGN_OUT":
      return { token: null, errorMessage: "" };
    default:
      return state;
  }
};

const tryLocalSignIn = dispatch => async () => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    dispatch({ type: "SIGN_IN", payload: token });
    navigate("TrackList");
  } else {
    navigate("loginFlow");
  }
};

const clearMessage = dispatch => () => {
  dispatch({ type: "CLEAR_MESSAGE" });
};

const signUp = dispatch => async ({ email, password }) => {
  // make api request to signup with that email and password
  // if we signup, modify our state, and say that we are authenticated.
  // if signing up fails, we probable need to reflect an error message somewhere.

  try {
    const response = await trackerApi.post("/signup", { email, password });
    await AsyncStorage.setItem("token", response.data.token);
    dispatch({ type: "SIGN_IN", payload: response.data.token });

    // navigate to main flow
    navigate("TrackList");
  } catch (error) {
    dispatch({
      type: "ADD_ERROR",
      payload: "Something went wrong with sign up."
    });
  }
};

const signIn = dispatch => {
  return async ({ email, password }) => {
    try {
      const response = await trackerApi.post("/signin", { email, password });
      console.log(response.data);
      await AsyncStorage.setItem("token", response.data.token);
      dispatch({ type: "SIGN_IN", payload: response.data.token });
      navigate("TrackList");
    } catch (error) {
      dispatch({
        type: "ADD_ERROR",
        payload: "Something went wrong with sign in."
      });
    }
  };
};

const signOut = dispatch => {
  return async () => {
    await AsyncStorage.removeItem("token");
    dispatch({ type: "SIGN_OUT" });
    navigate("loginFlow");
  };
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signUp, signIn, signOut, clearMessage, tryLocalSignIn },
  { token: null, errorMessage: "" }
);
