import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Map from './Components/Map.js';
import Details from './Components/Details.js';
import PinForm from './Components/PinForm.js'

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        {/* <Text>Hello World!</Text> */}
        {/* <Map /> */}
        {/* <Details /> */}
        <PinForm />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
