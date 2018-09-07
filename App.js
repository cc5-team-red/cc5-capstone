import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "react-navigation";
import { firebase } from "./src/firebase.js";
import MapScreen from './Components/MapScreen.js';
import Details from './Components/Details.js';
import PinForm from './Components/PinForm.js'

const App = createStackNavigator({
  Home: { screen: MapScreen },
  PinForm: { screen: PinForm },
  Details: { screen: Details },
});

export default App;
