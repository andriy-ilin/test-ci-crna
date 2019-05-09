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
    const {
      buttonText = "Choose",
      value,
      placeholder,
      onValueChange,
      mode,
      colorText,
      items = []
    } = this.props;
    const { modalVisible } = this.state;
    if (Platform.OS === "android") {
      const selectedLabel = value || placeholder;
      return (
        <View>
          <Picker
            style={[styles.picker]}
            selectedValue={value}
            onValueChange={onValueChange}
            mode={mode || "dropdown"}
          >
            {items.map(({ value, label }, index) => (
              <Picker.Item key={index} label={label} value={value} />
            ))}
          </Picker>
        </View>
      );
    } else {
      const selectedItem = items.find(i => i.value === value);

      const selectedLabel = selectedItem ? selectedItem.label : placeholder;

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
                colorText && styles.colorText,
                !selectedItem && styles.placeholder
              ]}
            >
              {selectedLabel}
            </Text>
          </TouchableOpacity>
          <Modal
            // animationType="slide"
            transparent={true}
            visible={modalVisible}
          >
            <TouchableWithoutFeedback
              onPress={() => this.setState({ modalVisible: false })}
            >
              <View style={styles.modalContainer}>
                <View style={styles.buttonContainer}>
                  <Text style={styles.buttonText} onPress={this.choose}>
                    {buttonText}
                  </Text>
                </View>
                <View style={styles.modalContainerColor}>
                  <Picker
                    selectedValue={value}
                    onValueChange={this.choosePicker}
                  >
                    {items.map(({ label, value }, index) => (
                      <Picker.Item key={index} label={label} value={value} />
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
