import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Image,
  Text
} from 'react-native';

import { SketchCanvas } from '@terrylinla/react-native-sketch-canvas';

export default class Draw extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <SketchCanvas
            style={{ flex: 1 }}
            strokeColor={'#2B2B2C'}
            strokeWidth={7}
            // localSourceImage={{filename: this.props.screenProps.snapshotUri}}
          />
          {/* <Image source={{ uri: this.props.screenProps.snapshotUri }} /> */}
          {/* <Text>{this.props.screenProps.snapshotUri}</Text> */}
          {/* <Image source={this.props.screenProps.snapshotUri} /> */}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5FCFF',
  },
});
