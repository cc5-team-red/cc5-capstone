import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';

export default class PinForm extends React.Component {
  _handleChange(event) {
    console.log("changed");
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.item}>
          <FormLabel>Create Pin</FormLabel>
          <FormInput onChangeText={this._handleChange}/>
          <FormValidationMessage>{'This field is required'}</FormValidationMessage>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'flex-start'
  },
  item: {
    marginTop: 50,
    width: 350,
  }
});
