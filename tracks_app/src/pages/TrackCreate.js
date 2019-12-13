import React, { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { Text } from "react-native-elements";
import {
  requestPermissionsAsync,
  watchPositionAsync,
  Accuracy
} from "expo-location";

import Map from "../components/Map";
import "../_mockLocation";

const TrackCreate = () => {
  const [error, setError] = useState(null);

  const startWatch = async () => {
    try {
      await requestPermissionsAsync();
      await watchPositionAsync(
        {
          accuracy: Accuracy.BestForNavigation,
          timeInterval: 1000,
          distanceInterval: 10
        },
        location => {}
      );
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    startWatch();
  }, []);

  return (
    <SafeAreaView>
      <Text h3>TrackCreate Page</Text>
      <Map />
      {error ? <Text>Please enable location service.</Text> : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default TrackCreate;
