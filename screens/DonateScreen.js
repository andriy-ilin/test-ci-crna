import React, { Component } from "react";
import { observer } from "mobx-react/native";
import { withNamespaces } from "react-i18next";
import { LinearGradient } from "expo";
import {
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Linking
} from "react-native";
import Button from "../components/Button";
import Title from "../components/Title";
import StyledText from "../components/StyledText";

@withNamespaces(["donate"], { wait: true })
@observer
export class DonateScreen extends Component {
  render() {
    const { t } = this.props;
    return (
      <ScrollView>
        <Title>
          {t("We are raising")}
          {"\n"}
          {t("1 million UAH")}
        </Title>

        <View style={[styles.statisticWrapper]}>
          <Text style={[styles.textAmount]}>{t("357 000 UAH")}</Text>
          <View style={[styles.lineContainer]}>
            <View style={[styles.lineInside]}>
              <LinearGradient
                colors={["#7db242", "#77d9a0"]}
                start={[0, 1]}
                end={[1, 1]}
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  top: 0,
                  height: 6
                }}
              />
            </View>
          </View>
          <Text style={[styles.textAmount, { color: "#9b9b9b", fontSize: 20 }]}>
            {t("35%")}
          </Text>
        </View>
        <StyledText.Light>
          {t(
            "We discover Ukraine and turn these discoveries into useful visual content which is already being used in education,"
          )}{" "}
          {t(
            "as a presentation of regions inside the country as well as to display the touristic potential of Ukraine in the world."
          )}
        </StyledText.Light>
        <StyledText.Bold>
          {t(
            `Therefore, any contribution to Ukraїner is your contribution to Ukraine!`
          )}
        </StyledText.Bold>
        <Button
          onPress={() =>
            Linking.openURL("https://ukrainer.net/donate/#my_contribution")
          }
        >
          {t("Support the project")}
        </Button>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  statisticWrapper: {
    alignItems: "center",
    justifyContent: "center",
    height: 172,
    borderRadius: 10,
    borderColor: "#fff",
    borderWidth: 1,
    shadowColor: "#9b9b9b",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    backgroundColor: "#fff",
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    marginTop: 10
  },
  textAmount: {
    color: "#4a4a4a",
    fontSize: 28,
    fontWeight: "bold",
    paddingTop: 10
  },
  lineContainer: {
    width: 262,
    height: 6,
    marginTop: 15,
    marginBottom: 15,
    backgroundColor: "#d8d8d8",
    borderRadius: 3
  },
  lineInside: {
    width: 68,
    borderRadius: 3,
    overflow: "hidden",
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 6
  }
});

export default DonateScreen;
