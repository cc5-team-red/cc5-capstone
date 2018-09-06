import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { MapView } from 'expo';
import { Constants, Location, Permissions } from 'expo';

export default class Map extends React.Component {
  state = {
    location: null,
    errorMessage: null,
    status: "initialized...",
  };

  componentDidMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  };


  render() {
    status = 'Waiting..';
    if (this.state.errorMessage) {
      status = this.state.errorMessage;
    } else if (this.state.location) {
      status = JSON.stringify(this.state.location);
    }

    return (
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: this.state.location ? this.state.location.coords.latitude : 37.78825,
          longitude: this.state.location ? this.state.location.coords.longitude : -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    );
  }
}