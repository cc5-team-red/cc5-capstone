import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  FormLabel,
  FormInput,
  FormValidationMessage,
  Button
} from "react-native-elements";
import { createUser, userListener, createPin, pinListener } from "../firebase/helper";

export default class PinForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: 'test_userID',
      title_input: '',
      details_input: '',
      type_input: '',
    }
  }

  _handleSubmit = () => {
    console.log(this.props.screenProps.newPin); 

    console.log(this.state.title_input); 
    console.log(this.state.details_input);
    console.log(this.state.type_input);
    const pinObj = {
      title: this.state.title_input,
      details: this.state.details_input,
      type: this.state.type_input,
      userID: this.state.userId,
      coordinates: {latitude: 23.324, longitude: 23.33},
    }
    createPin(pinObj);
  };

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
          <FormInput value={title} onChangeText={ this.props.screenProps._onChangeText }/>
          <FormValidationMessage>
            {"This field is required"}
          </FormValidationMessage>

          <FormLabel>Details</FormLabel>
          <FormInput value={details} onChangeText={(text) => this.setState({details_input: text})}/>
          <FormValidationMessage>
            {"This field is required"}
          </FormValidationMessage>

          <FormLabel>Type</FormLabel>
          <FormInput value={type} onChangeText={(text) => this.setState({type_input: text})}/>
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
