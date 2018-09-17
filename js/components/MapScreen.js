import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Icon } from 'react-native-elements'

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
    this.props.navigation.navigate("Details", { id, votes, time, details, comments });
  }

  _drawPress = async () => {
    await this.props.screenProps._getSnapshot();
    this.props.navigation.navigate("Draw");
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
      <View style={styles.container}>
        <Map
          _onPress={this.props.screenProps._onPress}
          _getMap={this.props.screenProps._getMap}
          _onLongPress={this._onLongPress}
          _calloutPressed={this._calloutPressed}
          pins={this.props.screenProps.pins}
          users={this.props.screenProps.users}
          sketches={this.props.screenProps.sketches}
          location={this.props.screenProps.location}
          followsUserLocation={this.props.screenProps.followsUserLocation}

        />

        <Text>{locationDebug}</Text>
        <Icon
          reverse
          name='my-location'
          color= {this.props.screenProps.followsUserLocation ? '#005387' : '#ECECE7'}
          reverseColor={this.props.screenProps.followsUserLocation ? undefined : '#005387'}
          onPress={this.props.screenProps._toggleFollowsUserLocation}
        />
        <Icon
          reverse
          name='brush'
          color='#005387'
          onPress={this._drawPress}
          style={styles.drawIcon}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  drawIcon: {}
});
