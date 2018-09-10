import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { Constants, Location, Permissions } from "expo";
import { createStackNavigator } from "react-navigation";

import MapScreen from './Components/MapScreen.js';
import Details from './Components/Details.js';
import PinForm from './Components/PinForm.js'
import { createPin, pinListener } from './firebase/helper'


const StackNavigator = createStackNavigator({
  Home: { screen: MapScreen },
  PinForm: { screen: PinForm },
  Details: { screen: Details },
});

export default class App extends React.Component {
  state = {
    location: null,
    errorMessage: null,
    pins: {},
    newPin: {
      user_id: 'test_userID',
      title_input: '',
      details_input: '',
      type_input: '',
      coordinate: {
        latitude: null,
        longitude: null
      },
      opacity: null
    }
  }

  componentWillMount() {
    if (Platform.OS === "android" && !Constants.isDevice) {
      this.setState({
        errorMessage:
          "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
      });
    } else {
      this._getLocationAsync();
      this._getPins();
    }
  }

  _getPins = async () => {
    const pinData = await pinListener();
    this.setState({
      pins: pinData
    });
  }

  _onPress(e) {
    console.log("onPress happened");
  }

  _setNewCoordinate = (e) => {
    console.log("onLongPress happened");
    this.setState({
      newPin: {
        coordinate: e.nativeEvent.coordinate
      }
    })
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

  _onChangeTitle = (text) => {
    console.log(text);
    this.setState({
      newPin: {
        ...this.state.newPin,
        title_input: text,
      }
    });
    console.log(this.state.newPin);
  }

  _onChangeDetails = (text) => {
    console.log(text);
    this.setState({
      newPin: {
        ...this.state.newPin,
        details_input: text
      }
    });
    console.log(this.state.newPin);
  }
  
  _onChangeType = (text) => {
    console.log(text);
    this.setState({
      newPin: {
        ...this.state.newPin,
        type_input: text
      }
    });
    console.log(this.state.newPin);
  }

  _handleSubmit = () => {
    console.log(this.state.newPin.title_input); 
    console.log(this.state.newPin.details_input);
    console.log(this.state.newPin.type_input);

    const pinObj = {
      title: this.state.newPin.title_input,
      details: this.state.newPin.details_input,
      type: this.state.newPin.type_input,
      userID: 234590853709863579865379,
      coordinate: {latitude: 23.324, longitude: 23.33},
      opacity: 1.0 //change later
    }
    createPin(pinObj);
  };


  render(){
    return (
      <StackNavigator
        screenProps={{
          _onPress: this._onPress,
          _setNewCoordinate: this._setNewCoordinate,
          _onChangeTitle: this._onChangeTitle,
          _onChangeDetails: this._onChangeDetails,
          _onChangeType: this._onChangeType,
          _handleSubmit: this._handleSubmit,
          ...this.state,
        }} 
      />
    )
  }
};
