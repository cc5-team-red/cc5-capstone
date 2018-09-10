import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { MapView } from 'expo';
import { Marker, ProviderPropType } from 'react-native-maps';

import crosshairs from './assets/markers/crosshairs_blue.png';
import fire from './assets/markers/fire.png';
import medical from './assets/markers/medical.png';
import no_passage from './assets/markers/no_passage.png';
import danger from './assets/markers/danger.png';

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

  _showUsers(){
    return this.props.users.map(user => {
      return (
      <Marker
        key={user.user_id}
        id={user.user_id}
        coordinate={{
          latitude: user.latitude,
          longitude: user.longitude
        }}
        title={user.name}
        // description={user.description}
        opacity={user.opacity}
        image={this._getImage("crosshairs")}
      />
    )})
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
        followsUserLocation={true}
        onPress={this.props._onPress}
        onLongPress={this.props._onLongPress}
        region={{
          latitude: this.props.location.coords.latitude,
          longitude: this.props.location.coords.longitude,
          latitudeDelta: 0.1922,
          longitudeDelta: 0.0421,
        }}
      >
        {this._showMarkers()}
        {this._showUsers()}
      </MapView>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});