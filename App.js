import React from "react";
import { Platform } from "react-native";
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

  _setNewCoordinate = e => {
    this.setState({
      newPin: {
        coordinate: e.nativeEvent.coordinate,
      }
    });
  };

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
