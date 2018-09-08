import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { MapView } from 'expo';
import{ Marker, ProviderPropType } from 'react-native-maps';

export default class Map extends React.Component {
  render() {
    console.log('map rendered')
    return (
        <MapView
          style={styles.map}
          mapType="mutedStandard"
          showsUserLocation={true}
          followsUserLocation={true}
          onPress={this.props._onPress}
          onLongPress={this.props._onLongPress}
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {this.props.pins.map(pin => (
            <Marker
              key={pin.id}
              id={pin.id}
              coordinate={pin.coordinate}
              title={pin.title}
              description={pin.description}
            />
          ))}
        </MapView>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});