import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { MapView } from 'expo';
import { Marker, ProviderPropType } from 'react-native-maps';

import crosshairs from './assets/pins/crosshairs_blue.png';
import fire from './assets/pins/fire.png';
import medical from './assets/pins/medical.png';
import no_passage from './assets/pins/no_passage.png';
import danger from './assets/pins/danger.png';

export default class Map extends React.Component {
  _showMarkers() {
    return this.props.pins.map(pin => (
      <Marker
        key={pin.id}
        id={pin.id}
        coordinate={pin.coordinate}
        title={pin.title}
        description={pin.description}
        opacity={pin.opacity}
        image={this._getImage(pin.type)}
      />
    ))
  }

  _getImage(pinType) {
    switch (pinType) {
      case "noPassage":
        return no_passage;
      case "danger":
        return danger;
      case "medical":
        return medical;
      case "fire":
        return fire;
      case "crosshairs":
        return crosshairs;
    }
  }

  render() {
    console.log('map rendered')
    return (
      <MapView
        style={styles.map}
        mapType="mutedStandard"
        showsUserLocation={true}
        showsScale={true} // works only on Apple Maps for some reason :-(
        showsMyLocationButton={true} // doesn't make any visible changes :-(
        followsUserLocation={true}
        onPress={this.props._onPress}
        onLongPress={this.props._onLongPress}
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.1922,
          longitudeDelta: 0.0421,
        }}
      >
        {this._showMarkers()}
      </MapView>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});