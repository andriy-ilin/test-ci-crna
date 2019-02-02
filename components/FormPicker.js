import React, { Component } from "react";
import {
  Modal,
  TouchableWithoutFeedback,
  Text,
  StyleSheet,
  Platform,
  View,
  Picker,
  TextInput,
  TouchableOpacity
} from "react-native";

export default class FormPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      selectedValue: null
    };
  }

  render() {
    if (Platform.OS === "android") {
      const selectedLabel =
        this.props.value !== "" ? this.props.value : this.props.placeholder;
      return (
        <View>
          <Picker
            style={[styles.picker]}
            selectedValue={this.props.value}
            onValueChange={this.props.onValueChange}
            mode={this.props.mode ? this.props.mode : "dropdown"}
          >
            {this.props.items.map((i, index) => (
              <Picker.Item key={index} label={i.label} value={i.value} />
            ))}
          </Picker>
        </View>
      );
    } else {
      const selectedItem = this.props.items.find(
        i => i.value === this.props.value
      );

      const selectedLabel = selectedItem
        ? selectedItem.label
        : this.props.placeholder;

      return (
        <View style={styles.inputContainer}>
          <TouchableOpacity
            style={styles.block}
            // keyboardShouldPersistTaps="handled"
            onPress={() => {
              return this.setState({ modalVisible: true });
            }}
          >
            <Text
              style={[
                styles.font,
                this.props.colorText && styles.colorText,
                // styles.placeholder
                // selectedLabel === "Оберіть інтервал" && styles.placeholder,
                !selectedItem && styles.placeholder
              ]}
            >
              {selectedLabel}
            </Text>
          </TouchableOpacity>
          <Modal
            // animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}
          >
            <TouchableWithoutFeedback
              onPress={() => this.setState({ modalVisible: false })}
            >
              <View style={styles.modalContainer}>
                <View style={styles.buttonContainer}>
                  <Text style={styles.buttonText} onPress={this.choose}>
                    Обрати
                  </Text>
                </View>
                <View style={styles.modalContainerColor}>
                  <Picker
                    selectedValue={this.props.value}
                    onValueChange={this.choosePicker}
                  >
                    {this.props.items.map((i, index) => (
                      <Picker.Item
                        key={index}
                        label={i.label}
                        value={i.value}
                      />
                    ))}
                  </Picker>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        </View>
      );
    }
  }

  choose = () => {
    this.props.onValueChange(
      this.state.selectedValue
        ? this.state.selectedValue
        : this.props.items[0].value
    );
    this.setState({ modalVisible: false, selectedValue: null });
  };

  choosePicker = value => {
    this.setState({ selectedValue: value });
    this.props.onValueChange(value);
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  block: {
    padding: 15,
    paddingTop: 10,
    paddingBottom: 10
  },
  picker: {
    width: 160,
    flex: 1,
    flexDirection: "row",
    alignSelf: "stretch",
    alignItems: "flex-end",
    padding: 0,
    margin: 0
    // backgroundColor:'#eee'
  },
  pickerItem: {
    color: "green",
    textAlign: "right"
  },
  content: {
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 5,
    paddingTop: 10,
    paddingBottom: 10,
    alignSelf: "stretch",
    justifyContent: "center"
  },
  font: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#77d9a0"
    // fontFamily: regular,
    // fontSize: defaultSize
  },
  colorText: {
    color: "red"
  },
  inputContainer: {
    ...Platform.select({
      ios: {
        // borderBottomColor: "gray",
        // borderBottomWidth: 1
      }
    })
  },
  placeholder: {
    color: "#c8c8c8",
    fontWeight: "100"
  },
  input: {
    // height: 40
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end"
    // backgroundColor: '#fff'
  },
  buttonContainer: {
    justifyContent: "flex-end",
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#fff"
    //
  },
  buttonText: {
    color: "#77d9a0",
    fontSize: 14,
    fontWeight: "bold"
  },
  modalContainerColor: {
    backgroundColor: "#fff"
  }
});
