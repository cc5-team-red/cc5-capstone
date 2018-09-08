import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { Constants, Location, Permissions } from "expo";
import { createStackNavigator } from "react-navigation";

import MapScreen from './Components/MapScreen.js';
import Details from './Components/Details.js';
import PinForm from './Components/PinForm.js'
import { pinListener } from './firebase/helper'


const StackNavigator = createStackNavigator({
  Home: { screen: MapScreen },
  PinForm: { screen: PinForm },
  Details: { screen: Details },
});

export default class App extends React.Component {
  state = {
    location: null,
    errorMessage: null,
    pins: [
    {
      id: 0,
      coordinate: {
        latitude: 35.71825,
        longitude: 139.7324
      },
      type: "danger", //currently enum of 'danger', 'noPassage', or 'medical'.

      title: "sample", //optional
      description: "sample description", //optional
      opacity: 1.0 //optional
    },
    {
      id: 1,
      coordinate: {
        latitude: 35.71725,
        longitude: 139.7324
      },
      type: "noPassage",

      opacity: 1.0
    },
    {
      id: 2,
      coordinate: {
        latitude: 35.71625,
        longitude: 139.7324
      },
      type: "crosshairs",

      title: "tgt",
      description: "",
      opacity: 1.0
    },

    {
      id: 3,
      coordinate: {
        latitude: 35.71625,
        longitude: 139.7314
      },
      type: "medical",

      title: "aid tent",
      description: "red cross aid tent here",
      opacity: 1.0
    }
  ]
  }

  componentWillMount() {
    if (Platform.OS === "android" && !Constants.isDevice) {
      this.setState({
        errorMessage:
          "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
      });
    } else {
      this._getLocationAsync();
    }
  }

  _onPress(e) {
    console.log("onPress happened");
  }

  _onLongPress(e) {
    console.log("onLongPress happened");
    console.log(e.nativeEvent);
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  };


  render(){
    return (
      <StackNavigator
        screenProps={{
          _onPress: this._onPress,
          _onLongPress: this._onLongPress,
          ...this.state,
        }} 
      />
    )
  }
};
