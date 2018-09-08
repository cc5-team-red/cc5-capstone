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
 
  render() {
    console.log('MapScreen props:');
    console.log(this.props);
    
    // createPin(this.state.pins[0]);
    // pinListener();

    const { navigate } = this.props.navigation;
    let locationDebug = "loading geoLocation...\n";
    if (this.props.screenProps.errorMessage) {
      locationDebug += this.props.screenProps.errorMessage;
    } else if (this.props.screenProps.location) {
      locationDebug += JSON.stringify(this.props.screenProps.location);
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
