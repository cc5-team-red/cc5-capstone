import React from "react";
import {
  Platform,
  ActionSheetIOS,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Picker,
  Image
} from "react-native";
import {
  FormLabel,
  FormInput,
  FormValidationMessage,
  Button,
  ButtonGroup,
} from "react-native-elements";

import sos from "../assets/markers/sos.png";
import danger from "../assets/markers/danger.png";
import no_passage from "../assets/markers/no_passage.png";
import crosshairs from "../assets/markers/crosshairs_blue.png";
import fire from "../assets/markers/fire.png";
import medical from "../assets/markers/medical.png";


export default class PinForm extends React.Component {
  static navigationOptions = {
    title: "Create Pin"
  };


  _onSubmit = (event) => {
    this.props.navigation.navigate("Home");
    this.props.screenProps._submitPinForm(event);
  }

  // _showActionSheet = () => {
  //   ActionSheetIOS.showActionSheetWithOptions({
  //     options: ['no passage', 'danger', 'help', 'medical facility', 'fire', 'cancel'],
  //     cancelButtonIndex: 5,
  //     title: "Pin Type",
  //     message: "Please Select A Type"
  //   },
  //     (buttonIndex) => {
  //       if (buttonIndex === 0) {
  //         this.props.screenProps._onChangeType("no_passage");
  //       }
  //       if (buttonIndex === 1) {
  //         this.props.screenProps._onChangeType("danger");
  //       }
  //       if (buttonIndex === 2) {
  //         this.props.screenProps._onChangeType("help");
  //       }
  //       if (buttonIndex === 3) {
  //         this.props.screenProps._onChangeType("medical");
  //       }
  //       if (buttonIndex === 4) {
  //         this.props.screenProps._onChangeType("fire");
  //       }
  //     })
  // }

  sosImage = () => <Image source={sos} style={styles.pinButtonImage} />
  dangerImage = () => <Image source={danger} style={styles.pinButtonImage} />
  no_passageImage = () => <Image source={no_passage} style={styles.pinButtonImage} />
  crosshairsImage = () => <Image source={crosshairs} style={styles.pinButtonImage} />
  fireImage = () => <Image source={fire} style={styles.pinButtonImage} />
  medicalImage = () => <Image source={medical} style={styles.pinButtonImage} />


  buttons = [
    { element: this.sosImage },
    { element: this.dangerImage },
    { element: this.no_passageImage },
    { element: this.crosshairsImage },
    { element: this.fireImage },
    { element: this.medicalImage },
  ]

  render() {
    // if (!this.props.screenProps.newPin.type) {
    //   this.props.screenProps._onChangeType("no_passage");
    // }

    return (
      <View style={styles.container}>
        <View style={styles.item}>
          <FormLabel>Title</FormLabel>
          <FormInput containerStyle={styles.formInput}
            value={this.props.screenProps.newPin.title}
            onChangeText={this.props.screenProps._onChangeTitle}
          />
          {this.props.screenProps.newPin.title ? null : (
            <FormValidationMessage>
              {"This field is required"}
            </FormValidationMessage>
          )}

          <FormLabel>Type</FormLabel>
          <ButtonGroup
            onPress={this.props.screenProps._onChangeTypeIndex}
            selectedIndex={this.props.screenProps.newPin.typeIndex}
            buttons={this.buttons}
            containerStyle={styles.pinButtonGroup}
          />

          <FormLabel>Details</FormLabel>
          <FormInput containerStyle={styles.formInput}
            value={this.props.screenProps.newPin.details}
            onChangeText={this.props.screenProps._onChangeDetails} />
          <Text />

          <TouchableOpacity style={styles.createPinButton} onPress={this._onSubmit}>
            <Text style={styles.createPinButtonText}>Create Pin</Text>
          </TouchableOpacity>
        </View>
      </View >
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
  createPinButton: {
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: "#005387",
    paddingVertical: 15,
    paddingHorizontal: 106
  },
  createPinButtonText: {
    color: "#ECECE7",
    fontSize: 22
  },
  formInput: {
    borderBottomWidth: 2,
    borderBottomColor: "black"
  },
  pinButtonGroup: {
    height: 50
  },
  pinButtonImage: {
    height: 50
  }
});
