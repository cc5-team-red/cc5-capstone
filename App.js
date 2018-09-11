import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { Constants, Location, Permissions } from "expo";
import { createStackNavigator } from "react-navigation";

import MapScreen from "./Components/MapScreen.js";
import Details from "./Components/Details.js";
import PinForm from "./Components/PinForm.js";
import {
  createPin,
  pinListener,
  createUser,
  updateUser,
  userListener
} from "./firebase/helper";

const StackNavigator = createStackNavigator({
  Home: { screen: MapScreen },
  PinForm: { screen: PinForm },
  Details: { screen: Details }
});

export default class App extends React.Component {
  state = {
    user_id: null,
    location: {
      coords: {
        latitude: 37,
        longitude: -122
      }
    },
    errorMessage: null,
    users:[],
    pins: {},
    newPin: {
      title_input: "",
      details_input: "",
      type_input: "",
      coordinate: {
        latitude: null,
        longitude: null
      },
      opacity: null
    }
  };

  async componentDidMount() {
    if (Platform.OS === "android" && !Constants.isDevice) {
      this.setState({
        errorMessage:
          "Geolocation will not work on Sketch in Android emulator. Try it on your device!"
      });
    } else {
      await this._setupUser();
      await this._getLocation();
      await this._getUsers();
      this._getPins();

    }
  }

  _setupUser() {
    if (this.state.user_id === null) {
      return this.setState({
        user_id: createUser(2, 2, { name: "default" })
      });
    }

    return;
  }
  _onPress(e) {
    console.log("onPress happened");
    console.log(this);
  }q

  _getPins = async () => {
    const pinData = await pinListener();
    this.setState({
      pins: pinData
    });
  }

  _setNewCoordinate = e => {
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

  _onChangeTitle = text => {
    console.log(text);
    this.setState({
      newPin: {
        ...this.state.newPin,
        title_input: text
      }
    });
    console.log(this.state.newPin);
  };

  _onChangeDetails = text => {
    console.log(text);
    this.setState({
      newPin: {
        ...this.state.newPin,
        details_input: text
      }
    });
    console.log(this.state.newPin);
  };

  _onChangeType = text => {
    console.log(text);
    this.setState({
      newPin: {
        ...this.state.newPin,
        type_input: text
      }
    });
    console.log(this.state.newPin);
  };

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

  _getUsers = async () => {
    await userListener(this.state.user_id, users => {
      this.setState({ users });
    });
  };

  _getLocation = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
      return;
    }

    await Location.watchPositionAsync(
      {
        enableHighAccuracy: true,
        distanceInterval: 10,
        timeInterval: 2000
      },
      location => {
        updateUser(
          this.state.user_id,
          location.coords.latitude,
          location.coords.longitude
        );
        this.setState({ location });
      }
    );
  };

  render() {
    return (
      <StackNavigator
        screenProps={{
          _onPress: this._onPress,
          _setNewCoordinate: this._setNewCoordinate,
          _onChangeTitle: this._onChangeTitle,
          _onChangeDetails: this._onChangeDetails,
          _onChangeType: this._onChangeType,
          _handleSubmit: this._handleSubmit,
          ...this.state
        }}
      />
    );
  }
}
