import React, { useContext } from "react";
import { Text, StyleSheet, ActivityIndicator } from "react-native";
import MapView, { Polyline } from "react-native-maps";

import { Context as LocationContext } from "../context/LocationContext";

const Map = () => {
  const {
    state: { currentLocation }
  } = useContext(LocationContext);

  if (!currentLocation) {
    return <ActivityIndicator size="large" style={{ marginTop: 200 }} />;
  }

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        ...currentLocation.coords,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
      }}
      region={{
        ...currentLocation.coords,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
      }}
    ></MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: 400
  }
});

export default Map;
