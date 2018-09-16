import React from "react";
import { Text, StyleSheet, Platform, Image } from "react-native";
import MapView, { Polyline } from "react-native-maps";

import { Marker, ProviderPropType, Callout } from "react-native-maps";

import subtleMapStyle from "../assets/mapStyles/subtle.json";
import silverMapStyle from "../assets/mapStyles/silver.json";
import darkMapStyle from "../assets/mapStyles/dark.json";
import desaturatedSubtleMapStyle from "../assets/mapStyles/desaturatedSubtle.json";

import sos from "../assets/markers/sos.png";
import danger from "../assets/markers/danger.png";
import no_passage from "../assets/markers/no_passage.png";
import crosshairs from "../assets/markers/crosshairs_blue.png";
import fire from "../assets/markers/fire.png";
import medical from "../assets/markers/medical.png";
import blue_user from "../assets/markers/blue_user.png";

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
        description={`${pin.timestamp} ${pin.details}`}
        opacity={pin.opacity}
        image={Platform.OS === "android" ? this._getImage(pin.type) : undefined}
        onCalloutPress={() => this.props._calloutPressed(pin.id, pin.votes, pin.timestamp, pin.details, pin.comments)}
      >
        {Platform.OS === "ios" ? (
          <Image
            source={this._getImage(pin.type)}
            style={styles.mapMarkerImage}
          />
        ) : null}
        <Callout>
          <Text>
            {`${pin.title}\nReliability: ${pin.votes}`}
          </Text>
        </Callout>
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
    return this.props.sketches.map(sketch => (
      <Polyline 
        coordinates={sketch.coordinates}
        strokeColor={sketch.strokeColor}
        strokeWidth={sketch.strokeWidth}
      />
    ))
  }

  _getImage(pinType) {
    switch (pinType) {
      case "no_passage":
        return no_passage;
      case "danger":
        return danger;
      case "medical":
        return medical;
      case "fire":
        return fire;
      case "help":
        return sos;
      case "crosshairs":
        return crosshairs;
      case "user":
        return blue_user;
    }
  }

  render() {
    console.log("map rendered");
    return (
      <MapView
        customMapStyle={subtleMapStyle}
        mapType={Platform.OS === "ios" ? "mutedStandard" : undefined}
        followsUserLocation={false}
        showsUserLocation={true}
        showsMyLocationButton={true}
        showsBuildings={true}
        showsIndoors={true}
        onPress={this.props._onPress}
        onLongPress={this.props._onLongPress}
        style={styles.map}
        ref={map => { this.props._getMap(map) }}
        region={{
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
