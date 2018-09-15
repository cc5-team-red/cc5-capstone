import React from "react";
import { Platform, Text, StyleSheet } from "react-native";
import DeviceInfo from 'react-native-device-info';
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
},
{
  navigationOptions: {
    headerStyle: {
      backgroundColor: '#ecece7',
    },
    headerTintColor: '#2b2b2c',
    headerTitleStyle: {
      fontFamily: 'lato-black',
      fontSize: 20
    },
  },
});

export default class App extends React.Component {
  state = {
    ready: false,
    user_id: null,
    location: {
      coords: {
        latitude: 37,
        longitude: -122
      }
    },
    errorMessage: null,
    users: [],
    pins: [],
    newPin: {
      title: "",
      details: "",
      type: "",
      coordinate: {
        latitude: null,
        longitude: null
      },
      opacity: null
    }
  };

  async componentDidMount() {
    if (Platform.OS === "android" && DeviceInfo.isEmulator()) {
      this.setState({
        errorMessage:
          "Geolocation will not work on Sketch in Android emulator. Try it on your device!"
      });
    } else {
      await this._setupUser();
      await this._getLocation();
      await this._getUsers();
      await this._getPins();

      this.setState({ ready: true });
    }
  }

  _setupUser = async () => {
    const user_id = await DeviceInfo.getUniqueID();
    console.log(`user_id`, user_id)
    createUser(user_id, 2, 2, { name: "defffo"})
    this.setState({user_id})
  }

  _setNewCoordinate = e => {
    this.setState({
      newPin: {
        coordinate: e.nativeEvent.coordinate,
      }
    });
  };

  _onChangeTitle = input => {
    this.setState({
      newPin: {
        ...this.state.newPin,
        title: input
      }
    });
  };

  _onChangeDetails = input => {
    this.setState({
      newPin: {
        ...this.state.newPin,
        details: input
      }
    });
  };

  _onChangeType = input => {
    if (!input) return;
    this.setState({
      newPin: {
        ...this.state.newPin,
        type: input
      }
    });
  };

  _handleSubmit = () => {
    console.log(this.state.newPin);
    // TODO: fix input of type

    const pinObj = {
      title: this.state.newPin.title,
      type: this.state.newPin.type,
      userID: this.state.user_id,
      coordinate: {
        latitude: this.state.newPin.coordinate.latitude,
        longitude: this.state.newPin.coordinate.longitude
      }
    };
    // optional fields here
    if (this.state.newPin.details && this.state.newPin.details.length > 0) {
      pinObj.details = this.state.newPin.details;
    }
    createPin(pinObj);
  };

  _getPins = async () => {
    await pinListener(pins => {
      this.setState({ pins });
    });
  };

  _getUsers = async () => {
    await userListener(this.state.user_id, users => {
      this.setState({ users });
    });
  };

  _getLocation = async () => {
    await navigator.geolocation.requestAuthorization();

    navigator.geolocation.setRNConfiguration({
      enableHighAccuracy: true,
      distanceInterval: 5,
      timeInterval: 2000
    });

    await navigator.geolocation.watchPosition((location) => {
      updateUser(
        this.state.user_id,
        location.coords.latitude,
        location.coords.longitude
      );
      this.setState({ location });
    },
      (error) => {
        console.log(error)
      });
  };

  render() {
    if (!this.state.ready) {
      console.log('loading....')
      // TODO: create a splash screen 
      return (
        <Text>
          loading...
        </Text>
      )
    }

    console.log('loaded!')
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
