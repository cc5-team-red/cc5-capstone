import React from 'react';
import { MapView } from 'expo';
import { Text, StyleSheet } from 'react-native';

export default class StandaloneMap extends React.Component {


  render() {
    const styles = StyleSheet.create({
      map: {
        ...StyleSheet.absoluteFillObject,
      },
    });
    return (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
    );
  }
}