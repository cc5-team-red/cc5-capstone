import React from "react";
import { Platform, Text, View, StyleSheet, Button } from "react-native";
import { MapView, Constants, Location, Permissions } from "expo";
import Map from "./Map.js";

import { createPin, pinListener } from "../firebase/helper";

export default class MapScreen extends React.Component {
  // for react-navigator
  static navigationOptions = {
    title: "Map"
  };

  state = {
    location: null,
    errorMessage: null,
  };

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

  render() {
    console.log('MapScreen props:');
    console.log(this.props);
    
    // createPin(this.state.pins[0]);
    // pinListener();

    const { navigate } = this.props.navigation;
    let locationDebug = "loading geoLocation...\n";
    if (this.state.errorMessage) {
      locationDebug += this.state.errorMessage;
    } else if (this.state.location) {
      locationDebug += JSON.stringify(this.state.location);
    }

    return (
      <View style={{ flex: 1, flexDirection: "column" }}>
        <Map
          _onPress={this.props.screenProps._onPress}
          _onLongPress={this.props.screenProps._onLongPress}
          pins={this.props.screenProps.pins}
        />
        <Button title="Go to Details" onPress={() => navigate("Details")} />
        <Button title="Go to PinForm" onPress={() => navigate("PinForm")} />
        <Text>{locationDebug}</Text>
      </View>
    );
  }
}
