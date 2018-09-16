import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { SketchCanvas } from '@terrylinla/react-native-sketch-canvas';
import { Icon } from 'react-native-elements'

export default class Draw extends Component {
  static navigationOptions = {
    title: "👆Draw Routes🖌",
    headerTransparent: true
  };

  _pressSubmit = () => {
    // this.sketchCanvas.save(
    //   "png",
    //   false,
    //   'RNSketchCanvas',
    //   Date.now().toString(),
    //   false,
    //   false,
    //   false
    // );
    const paths = this.sketchCanvas.getPaths();
    this.props.screenProps._getSketchCanvasPaths(paths);
    this.props.navigation.navigate("Home");
  }

  render() {
    return (
      <View style={styles.container}>
        <SketchCanvas
          ref={ref => { this.sketchCanvas = ref; }}
          style={styles.sketchCanvas}
          strokeColor={'#2B2B2C'}
          strokeWidth={7}
          localSourceImage={{ filename: this.props.screenProps.snapshotUri }}
        />

        <Icon
          reverse
          name='check'
          color='#237F52'
          onPress={this._pressSubmit}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  sketchCanvas: {
    ...StyleSheet.absoluteFillObject
  }
});
