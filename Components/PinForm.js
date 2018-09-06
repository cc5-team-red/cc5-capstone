import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  FormLabel,
  FormInput,
  FormValidationMessage,
  Button
} from "react-native-elements";

export default class PinForm extends React.Component {
  _handleChange(event) {
    console.log("changed");
  }

  _handleSubmit = () => {
    console.log("submitted");
  };

  static navigationOptions = {
    title: "Pin"
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.item}>
          <FormLabel>Create Pin</FormLabel>
          <FormInput onChangeText={this._handleChange} />
          <FormValidationMessage>
            {"This field is required"}
          </FormValidationMessage>
          <Button
            style={styles.button}
            title="Create Pin"
            accessibilityLabel="Create a pin with this button"
            onPress={this._handleSubmit}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "flex-start"
  },
  item: {
    marginTop: 50,
    width: 350
  },
  button: {
    marginTop: 20
  }
});
