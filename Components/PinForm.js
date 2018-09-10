import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  FormLabel,
  FormInput,
  FormValidationMessage,
  Button
} from "react-native-elements";

export default class PinForm extends React.Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    title: "Create Pin"
  };

  render() {
    let title = '';
    let details = '';
    let type = '';
    return (
      <View style={styles.container}>
        <View style={styles.item}>
          <FormLabel>Title</FormLabel>
          <FormInput value={title} onChangeText={ this.props.screenProps._onChangeTitle }/>
          <FormValidationMessage>
            {"This field is required"}
          </FormValidationMessage>

          <FormLabel>Details</FormLabel>
          <FormInput value={details} onChangeText={this.props.screenProps._onChangeDetails}/>
          <FormValidationMessage>
            {"This field is required"}
          </FormValidationMessage>

          <FormLabel>Type</FormLabel>
          <FormInput value={type} onChangeText={this.props.screenProps._onChangeType}/>
          <FormValidationMessage>
            {"This field is required"}
          </FormValidationMessage>

          <Button
            style={styles.button}
            title="Create Pin"
            accessibilityLabel="Create a pin with this button"
            onPress={this.props.screenProps._handleSubmit}
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
