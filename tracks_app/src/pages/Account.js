import React, { useContext } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button } from "react-native-elements";

import { Context as AuthContext } from "../context/AuthContext";
import Spacer from "../components/Spacer";

const Account = () => {
  const { signOut } = useContext(AuthContext);

  return (
    <>
      <Text style={{ fontSize: 48 }}>Account Page</Text>
      <Spacer />
      <Button title="Sign Out" onPress={signOut} />
    </>
  );
};

const styles = StyleSheet.create({});

export default Account;
