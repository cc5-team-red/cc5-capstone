import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "react-navigation";
import MapScreen from './Components/MapScreen.js';
import Details from './Components/Details.js';
import PinForm from './Components/PinForm.js'
import { pinListener } from './firebase/helper'

const App = createStackNavigator({
  Home: { screen: MapScreen },
  PinForm: { screen: PinForm },
  Details: { screen: Details },
});

export default App;
