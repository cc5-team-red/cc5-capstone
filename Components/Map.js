import React from 'react';
import { Platform, Text, View, StyleSheet, Button } from 'react-native';
import { MapView, Constants, Location, Permissions } from 'expo';
import StandaloneMap from './StandaloneMap.js';

export default class Map extends React.Component {
  state = {
    location: null,
    errorMessage: null,
  };

  static navigationOptions = {
    title: "Map"
  };

  componentWillMount() {
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
    const { navigate } = this.props.navigation;
    let text = 'Waiting..';
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.location) {
      text += JSON.stringify(this.state.location);
    }

    return (
      <View>
        <StandaloneMap />
        <Text>I'm map</Text>
        <Button title="Go to Details" onPress={() => navigate("Details")} />
        <Button title="Go to PinForm" onPress={() => navigate("PinForm")} />
        <Text>{text}</Text>
      </View>
    );
  }
}
