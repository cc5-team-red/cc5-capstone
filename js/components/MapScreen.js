import React from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import Map from "./Map.js";

export default class MapScreen extends React.Component {
  // for react-navigator
  static navigationOptions = {
    title: "Map",
    header: null,
  };
 
  _onLongPress = (e) => {
    this.props.navigation.navigate("PinForm");
    this.props.screenProps._setNewCoordinate(e);
  }

  _calloutPressed = (id, votes, time, details, comments) => {
    this.props.navigation.navigate("Details", {id, votes, time, details, comments});
  }

  render() {
    const { navigate } = this.props.navigation;
    let locationDebug = "loading geoLocation...\n";
    if (this.props.screenProps.errorMessage) {
      locationDebug = this.props.screenProps.errorMessage;
    } else if (this.props.screenProps.location) {
      locationDebug = JSON.stringify(this.props.screenProps.location);
    }

    return (
      <View style={{ flex: 1, flexDirection: "column" }}>
        <Map
          _onPress={this.props.screenProps._onPress}
          _getMap={this.props.screenProps._getMap}
          _onLongPress={this._onLongPress}
          _calloutPressed={this._calloutPressed}
          pins={this.props.screenProps.pins}
          users={this.props.screenProps.users}
          location={this.props.screenProps.location}

        />
        <Text>{locationDebug}</Text>
        <Button title="Draw" onPress={() => navigate("Draw")} /> 
        <Button title="Snap" onPress={this.props.screenProps._getSnapshot} />
      </View>
    );
  }
}
