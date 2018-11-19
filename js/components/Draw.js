import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { SketchCanvas } from '@terrylinla/react-native-sketch-canvas';
import { Icon } from 'react-native-elements'

export default class Draw extends Component {
  static navigationOptions = {
    title: "👆Draw Routes🖌",
    headerTransparent: true
  };

  state = {
    color: '#F9A800'
  }
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

  _changeColor = (color) => (
    (e) => {
      this.setState({ color })
    }
  )

  render() {
    return (
      <View style={styles.container}>
        <SketchCanvas
          ref={ref => { this.sketchCanvas = ref; }}
          style={styles.sketchCanvas}
          strokeColor={this.state.color}
          strokeWidth={7}
          localSourceImage={{ filename: this.props.screenProps.snapshotUri }}
        />
        <View>
          <Icon
            reverse
            color='#237F52'
            size={18}
            onPress={this._changeColor('#237F52')}
          />
          <Icon
            reverse
            color='#F9A800'
            size={18}
            onPress={this._changeColor('#F9A800')}
          />
          <Icon
            reverse
            color='#9B2423'
            size={18}
            onPress={this._changeColor('#9B2423')}
          />
        </View>
        <View>
          <Icon
            reverse
            name='check'
            color='#005387'
            onPress={this._pressSubmit}
          />
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: 'flex-end',
    alignItems: "flex-end"
  },
  sketchCanvas: {
    ...StyleSheet.absoluteFillObject
  }
});
