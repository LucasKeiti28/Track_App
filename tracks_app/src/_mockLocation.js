import * as Location from "expo-location";

const tenMetersWithDegrees = 0.0001;

const getLocation = increment => {
  return {
    latitude: -23.625561843985853 + increment * tenMetersWithDegrees,
    longitute: -46.63753682270944 + increment * tenMetersWithDegrees,
    altitude: 5,
    altitudeAccuracy: 5,
    accuracy: 5,
    heading: 0,
    speed: 0,
    timestamps: 100000
  };
};

let counter = 0;
setInterval(() => {
  Location.EventEmitter.emit("Expo.locationChanged", {
    watchId: Location._getCurrentWatchId(),
    location: getLocation(counter)
  });
  counter++;
}, 1000);
