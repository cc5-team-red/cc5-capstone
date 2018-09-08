import React from 'react';
import { MapView } from 'expo';
import { Text, StyleSheet } from 'react-native';

export default class Map extends React.Component {
  render() {
    console.log('rendered')
    return (
        <MapView
          style={styles.map}
          mapType="mutedStandard"
          showsUserLocation={true}
          followsUserLocation={true}
          onPress={this.props._onPress}
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
        </MapView>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});