import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Map from "./Components/Map.js";
import Details from "./Components/Details.js";
import PinForm from "./Components/PinForm.js";
import { createStackNavigator } from "react-navigation";

const App = createStackNavigator({
  Home: { screen: Map },
  PinForm: { screen: PinForm },
  Details: { screen: Details }
});

export default App;
