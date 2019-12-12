import { AsyncStorage } from "react-native";
import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";

import { navigate } from "../navigationRef";

const authReducer = (state, action) => {
  switch (action.type) {
    case "SIGN_UP":
      return { errorMessage: "", token: action.payload };
    case "ADD_ERROR":
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
};

const signUp = dispatch => async ({ email, password }) => {
  // make api request to signup with that email and password
  // if we signup, modify our state, and say that we are authenticated.
  // if signing up fails, we probable need to reflect an error message somewhere.

  try {
    const response = await trackerApi.post("/signup", { email, password });
    await AsyncStorage.setItem("token", response.data.token);
    dispatch({ type: "SIGN_UP", payload: response.data.token });

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
  return ({ email, password }) => {};
};

const signOut = dispatch => {
  return () => {};
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signUp, signIn, signOut },
  { token: null, errorMessage: "" }
);
