import React, { Component } from "react";
import { observer } from "mobx-react/native";
import { withNamespaces } from "react-i18next";
import {
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  StyleSheet
} from "react-native";
import Title from "../components/Title";
import StyledText from "../components/StyledText";

@withNamespaces(["contacts"], { wait: true })
@observer
export class ContactsScreen extends Component {
  render() {
    const { t } = this.props;
    return (
      <View>
        <Title>{t("Contacts")}</Title>
        <View style={[styles.listWrapper]}>
          {contactsData.map(({ link, title, foto: Foto }) => (
            <TouchableOpacity
              key={title}
              style={[styles.block]}
              onPress={() => Linking.openURL(link)}
            >
              <Foto />
              <StyledText.Medium textTransform="capitalize">
                {t(title)}
              </StyledText.Medium>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  }
}

const contactsData = [
  {
    foto: () => (
      <Image
        source={require(`../assets/images/contacts/facebook.png`)}
        style={[styles.foto]}
        resizeMode="cover"
      />
    ),
    link: "https://www.facebook.com/ukrainer.net/",
    title: "facebook"
  },
  {
    foto: () => (
      <Image
        source={require(`../assets/images/contacts/telegram.png`)}
        style={[styles.foto]}
        resizeMode="cover"
      />
    ),
    link: "https://t.me/ukrainer_net",
    title: "telegram"
  },
  {
    foto: () => (
      <Image
        source={require(`../assets/images/contacts/instagram.png`)}
        style={[styles.foto]}
        resizeMode="cover"
      />
    ),
    link: "https://www.instagram.com/ukrainer_net/",
    title: "instagram"
  },
  {
    foto: () => (
      <Image
        source={require(`../assets/images/contacts/google.png`)}
        style={[styles.foto]}
        resizeMode="cover"
      />
    ),
    link: "https://plus.google.com/u/0/+UkrainerNet/posts",
    title: "google plus"
  },
  {
    foto: () => (
      <Image
        source={require(`../assets/images/contacts/twitter.png`)}
        style={[styles.foto]}
        resizeMode="cover"
      />
    ),
    link: "https://twitter.com/ukrainer",
    title: "twitter"
  },
  {
    foto: () => (
      <Image
        source={require(`../assets/images/contacts/youtube.png`)}
        style={[styles.foto]}
        resizeMode="cover"
      />
    ),
    link: "https://youtube.com/c/UkrainerNet",
    title: "youtube"
  }
];

const styles = StyleSheet.create({
  foto: {
    height: 24,
    width: 24,
    paddingRight: 20
  },
  listWrapper: {
    paddingLeft: 20,
    paddingRight: 20
  },
  block: {
    paddingTop: 20,
    flexDirection: "row"
  }
});

export default ContactsScreen;
