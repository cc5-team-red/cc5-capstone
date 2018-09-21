import React from "react";
import { Text, StyleSheet, Platform, Image } from "react-native";
import MapView, { Polyline } from "react-native-maps";

import { Marker, ProviderPropType, Callout } from "react-native-maps";

import subtleMapStyle from "../assets/mapStyles/subtle.json";
import silverMapStyle from "../assets/mapStyles/silver.json";
import darkMapStyle from "../assets/mapStyles/dark.json";
import desaturatedSubtleMapStyle from "../assets/mapStyles/desaturatedSubtle.json";

import { markers } from "../util/markers";

export default class Map extends React.Component {
  _showMarkers = () => {
    if (!(typeof this.props.pins === "object")) {
      console.log("show markers is undefined!");
      return;
    }
    return this.props.pins.map(pin => (
      <Marker
        key={pin.id}
        id={pin.id}
        coordinate={pin.coordinate}
        title={pin.title}
        description={pin.hoursAgo >= 1 ? (`Updated ${pin.hoursAgo} hours ago | Votes: ${pin.votes}`)
          : (`Updated ${(pin.hoursAgo * 60).toFixed(0)} minutes ago | Votes: ${pin.votes}`)}
        opacity={pin.opacity}
        image={Platform.OS === "android" ? this._getImage(pin.type) : undefined}
        onCalloutPress={() => this.props._calloutPressed(pin.title, pin.id, pin.votes, pin.details, pin.hoursAgo)}
      >
        {Platform.OS === "ios" ? (
          <Image
            source={this._getImage(pin.type)}
            style={styles.mapMarkerImage}
          />
        ) : null}
      </Marker>
    ));
  };

  _showUsers() {
    return this.props.users.map(user => (
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
        image={this._getImage("user")}
      />
    ));
  }

  _showSketches() {
    return this.props.sketches.map(sketch => {
      return sketch.strokes.map(stroke => (
        <Polyline
          key={stroke.key}
          coordinates={stroke.coordinates}
          strokeColor={stroke.strokeColor}
          strokeWidth={stroke.strokeWidth}
          fillColor={`rgba(255,0,0,${sketch.opacity})`}
        // userId={sketch.user_id}
        />
      ))
    })
  }

  _getImage(pinType) {
    const marker = Object.entries(markers)
      .find(([key, value]) => key === pinType)
    console.log(marker)
    return marker[1];
  }

  render() {
    console.log("map rendered");
    return (
      <MapView
        customMapStyle={subtleMapStyle}
        // provider="google"
        // mapType={Platform.OS === "ios" ? "mutedStandard" : undefined}
        followsUserLocation={this.props.followsUserLocation}
        showsUserLocation={true}
        showsMyLocationButton={true}
        showsBuildings={true}
        showsIndoors={true}
        onPress={this.props._onPress}
        onLongPress={this.props._onLongPress}
        style={styles.map}
        ref={map => { this.props._getMap(map) }}
        initialRegion={{
          latitude: this.props.location.coords.latitude,
          longitude: this.props.location.coords.longitude,
          latitudeDelta: 0.1922,
          longitudeDelta: 0.0421
        }}
      >
        {this._showMarkers()}
        {this._showUsers()}
        {this._showSketches()}
      </MapView>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject
  },
  mapMarkerImage: {
    height: 40,
    width: 40
  }
});
