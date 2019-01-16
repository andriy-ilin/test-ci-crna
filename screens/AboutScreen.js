import React, { Component } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity
} from "react-native";
import { observer } from "mobx-react/native";
import { withNamespaces } from "react-i18next";

import Line from "../components/Line";
import Title from "../components/Title";
import Blockquote from "../components/Blockquote";
import StyledText from "../components/StyledText";

@withNamespaces(["about", "common"], { wait: true })
@observer
export class AboutScreen extends Component {
  render() {
    const { t } = this.props;
    return (
      <ScrollView>
        <Title>{t("Expedition")}</Title>
        <Image
          source={require("../assets/images/about/first.png")}
          style={{ width: "100%", height: 252 }}
          resizeMode="cover"
        />
        <Blockquote>
          {t(
            `After National Geographic disappeared from the Ukrainian media space, there were no projects for the aficionados of intellectual media and unexpected geographical discoveries left to replace it.`
          )}
        </Blockquote>
        <StyledText.Medium>
          {t(
            `For the last few decades, Ukrainians have been actively moving out to big cities – or even emigrating – leaving their land without ever really getting to know it. The stories of small settlements did not attract the attention of large-scale media, and instead were buried in family archives, becoming completely erased with time.`
          )}
        </StyledText.Medium>
        <StyledText.Light>
          {t(
            `Our country tends to be under the scrutiny of the rest of the world because of its ongoing political and economic issues, war, or natural disasters. But there are some who see Ukraine in a different light. To stranger’s eyes, this land can unfold as an unexpected, interesting, unpredictable, and colourful place.`
          )}
        </StyledText.Light>
        <StyledText.Light>
          {t(
            `So how do the locals see their own country? Coming back from abroad, why do they focus on the greyness, the negativity, the coarseness, of big cities? Could the constantly negative representation of Ukraine in media be the culprit?`
          )}
        </StyledText.Light>
        <StyledText.Light>
          {t(
            `Domestic tourism in Ukraine is underdeveloped, and transport infrastructure is in need of serious work. Many Ukrainians have never even left the borders of their region, and those who do travel throughout the country have probably noticed how little we know about neighbouring regions and Ukraine as a whole.`
          )}
        </StyledText.Light>
        <StyledText.Light>
          {t(
            `To fix this, we are starting Ukraїner,  a new media project aimed to discover through a thorough research who we actually are and to share these discoveries.`
          )}
        </StyledText.Light>
        <Image
          source={require("../assets/images/about/second.png")}
          style={{ width: "100%", height: 252 }}
          resizeMode="cover"
        />
        <StyledText.Light paddingTop={25}>
          {t(
            `Our expedition will last eighteen months and will embrace all sixteen historical regions of Ukraine, from Slobozhanshchyna to Podillia, Volyn to Tavria. We will be starting with the western part of Ukraine and introducing you to Zakarpattia throughout the summer. You can join our mission by opening your unique region to our team and sharing its amazing people with us.`
          )}
        </StyledText.Light>
        <StyledText.Light>
          {t(
            `Ukraїner will share curious stories from obscure places, people, art, and food. Using what we’ve discovered, we will create a modern guide to Ukraine, translated into multiple languages. All we need is our loyal readers’ curiosity and trust.`
          )}
        </StyledText.Light>
        <Title>{t("Our team")}</Title>
        {teamData.map(
          ({ fotoSrc, name, role, description, talk, last }, key, array) => (
            <Person
              key={fotoSrc}
              fotoSrc={fotoSrc}
              name={name}
              role={role}
              description={description}
              talk={talk}
              t={t}
              first={key === 0}
              last={array.length - 1 === key}
            />
          )
        )}
      </ScrollView>
    );
  }
}

const Person = ({
  fotoSrc: Foto,
  name,
  role,
  description,
  t,
  talk,
  last,
  first
}) => (
  <View>
    <View style={[styles.profile, first && { paddingTop: 0 }]}>
      <Foto />
      <View style={{ width: "100%" }}>
        <Text style={[styles.role]}>{t(name)}</Text>
        <Text style={[styles.role]}>{t(role)}</Text>
      </View>
    </View>
    <StyledText.Light>{t(description)}</StyledText.Light>
    <View style={[styles.talkWrapper]}>
      <Image
        source={require(`../assets/images/about/quote.png`)}
        style={[styles.talkQuote]}
        resizeMode="cover"
      />
      <View>
        <Text style={[styles.textQuote]}>{t(talk)}</Text>
      </View>

      {/*<StyledText.Light>{t(talk)}</StyledText.Light>*/}
    </View>
    {!last && <Line />}
  </View>
);

const styles = StyleSheet.create({
  profile: {
    paddingTop: 24,
    paddingBottom: 24,
    paddingLeft: 24,
    paddingRight: 24,
    flexDirection: "row",
    alignItems: "center"
  },
  foto: {
    height: 87,
    width: 87
  },
  role: {
    color: "#272727",
    fontWeight: "bold",
    fontSize: 16,
    lineHeight: 22,
    paddingLeft: 24,
    paddingRight: 55
  },
  talkWrapper: {
    flexDirection: "row",
    marginLeft: 20
  },
  talkQuote: {
    height: 25,
    width: 31
  },
  textQuote: {
    marginLeft: 20,
    fontSize: 16,
    lineHeight: 22,
    paddingRight: 55,
    fontWeight: "100",
    paddingBottom: 24,
    color: "#272727"
  }
});

const teamData = [
  {
    fotoSrc: () => (
      <Image
        source={require(`../assets/images/about/bogdan.png`)}
        style={[styles.foto]}
        resizeMode="cover"
      />
    ),
    name: "Bogdan Logvynenko",
    role: "project author",
    description:
      "Has been involved in cultural and social initiatives for over a decade. Worked as a music manager, critic, TV host. Has visited over fifty countries and has lived in five of them for a considerable amount of time. Has written three books, one of which has become a bestseller in Ukraine.",
    talk:
      "Ukraїner is more than just a media project.  It’s a part of my life. We have a lot of ambitious goals. The first one is to develop coverage in Ukraine and thus, to help develop domestic tourism. Our second goal is to discover unknown places and people and to tell as many insider stories as possible. And our third goal, the most important one, is to popularize Ukraine in the world and to get involved in the changes in public diplomacy. In the world most dangerous countries index, Ukrainer is ranked eighth. This fact alone scares hundreds of thousands of potential foreign tourists away. We could change it, not through denial, but through the production of alternative information."
  },
  {
    fotoSrc: () => (
      <Image
        source={require(`../assets/images/about/dmytro.png`)}
        style={[styles.foto]}
        resizeMode="cover"
      />
    ),
    name: "Dmytro Okhrimenko",
    role: "videographer",
    description:
      "Camera operator by training founded his own video studio OHRIM Production in 2011, last year joined the film crew of “Orel & Reshka. Around the world” and visited fifteen countries as its member.",
    talk:
      "Ukraїner is an opportunity to feel what my country really looks like, what kind of people live in it, to discover new places and, therefore, new reasons to be proud of Ukraine. I want people to see my country just as beautiful as I see other countries in my travels. After all, Ukraine has huge potential, amazing cultural variety, incredibly delicious cuisine, and the best people!"
  },
  {
    fotoSrc: () => (
      <Image
        source={require(`../assets/images/about/taras.png`)}
        style={[styles.foto]}
        resizeMode="cover"
      />
    ),
    name: "Taras Kovalchuk",
    role: "photographer",
    description:
      "Co-founder of the Khata-Maisternia project. Has visited over twenty countries in the past five years. A professional photographer that receives offers from various corners of the world.",
    talk:
      "Ukraїner is my chance to see the unknown corners of Ukraine, to embrace fully its natural and cultural diversity. At the same time, I’d like to reflect on its everyday life in my photos as many Ukrainians have a talent for living and being happy with simple things. Taking photos of these simple mundane activities and emotions, I want to let people see how beautiful they really are, to introduce them to each other and to themselves.I’m ready to grab my camera as early as 4 a.m. to catch the best lighting. I’m ready to climb the highest hill to get the best angle. I’m ready for almost everything, for that matter."
  },
  {
    fotoSrc: () => (
      <Image
        source={require(`../assets/images/about/mykola.png`)}
        style={[styles.foto]}
        resizeMode="cover"
      />
    ),
    name: "Mykola Nosok",
    role: "director",
    description:
      "Involved in directing and editing. Created his own project 28 Litres, a film devoted to alcohol abuse. As a student, he managed the Ukraine Welcomes U project visiting big cities of Ukraine and filming promotional videos about them. All this was based on huge enthusiasm and a desire for adventures.",
    talk:
      "After I saw the info about Ukraïner, I recalled my unrealized wish to work on the idea of travelling around Ukraine. My plan of action was pretty simple. I wrote I wanted to become a part of the project, we met and that did it – I was in. So simple. And I value our project for this simplicity and understanding in communication. This is the atmosphere we try to find in every region of Ukraine. We want to discover true ‘Ukrainers’ and tell their story."
  },
  {
    fotoSrc: () => (
      <Image
        source={require(`../assets/images/about/marichka.png`)}
        style={[styles.foto]}
        resizeMode="cover"
      />
    ),
    name: "Marichka Pohorilko",
    role: "volunteer and translation coordinator",
    description:
      "Historian, musician, mom. Lives in Lviv, which she considers her own ‘base’ and ‘a place of power’. Worked at the Сentre for the urban history of East and Central Europe and the Ukrainian Leadership Academy.",
    talk:
      "I joined the project willing to volunteer a bit and to distract myself from work. But soon it turned into a passion that keeps growing with every released material. I’ve been travelling since I was a kid. First, as a member of music groups, and then on my own. At some point, I realized that you don’t have to go far away, there is so much interesting and amazing stuff just around you! Now I am at a new travel stage – I discover Ukraine with my dear son."
  },
  {
    fotoSrc: () => (
      <Image
        source={require(`../assets/images/about/pavlo.png`)}
        style={[styles.foto]}
        resizeMode="cover"
      />
    ),
    name: "Pavlo Pashko",
    role: "videographer",
    description:
      "Lives in Zaporizhzhia, works as a sound designer. Has dedicated his whole life to working with music and sound.",
    talk:
      "The events of the past three years, as well as my travels around Ukraine, have made me realize that a lot of events in my country don’t get due attention. So I borrowed a camera from my friends and started filming amateur documentaries, mostly in the East of Ukraine. Those films tell about ordinary people doing great things for everyone. After I met the Ukraїner team, I realized I’m not alone. Ukraine really needs such stories as they inspire many people to change themselves and do something."
  },
  {
    fotoSrc: () => (
      <Image
        source={require(`../assets/images/about/natalka.png`)}
        style={[styles.foto]}
        resizeMode="cover"
      />
    ),
    name: "Natalka Panchenko",
    role: "producer",
    description:
      "Social activist, head of the Euromaidan-Warszawa Foundation. Has visited over twenty countries. Natalka has joined the Ukraїner project during the expedition in Poltava region. She is responsible for organizing and regulating the work, developing the project, looking for strategic partners, and advancing the expeditions.",
    talk:
      "Ukraїner gives me an opportunity to do the things I love – open my country to myself, my friends, and those who have never heard of Ukraine. It is also an opportunity to discover simple people, listen to them, and learn from them."
  },
  {
    fotoSrc: () => (
      <Image
        source={require(`../assets/images/about/sergey.png`)}
        style={[styles.foto]}
        resizeMode="cover"
      />
    ),
    name: "Sergey Korovayny",
    role: "photographer",
    description:
      "Visual journalist. The youngest project member, Serhiy studies at the Mohyla School of Journalism. Has travelled a lot around Europe and lived in the USA for a while. At first, he shot photographic reports and later got interested in documentary photography. As he comes from Donbas, Serhiy works on many projects connected with this region. Recently he has got involved in filming videos and creating virtual reality.",
    talk:
      "I’ve joined Ukraїner by accident. In a train from Mariupol to Kyiv, I saw that the project was looking for a photographer for their Pryazovia expedition. At that same moment, I contacted these guys, and they answered. Ukraїner is a dream project. It is for things like this that I switched from economics to photojournalism. It’s an opportunity to travel and tell stories. What else do you need to be happy? Probably, a cool team, a nice atmosphere and an understanding that you’re doing something really important. Ukraїner has it all."
  },
  {
    fotoSrc: () => (
      <Image
        source={require(`../assets/images/about/traian.png`)}
        style={[styles.foto]}
        resizeMode="cover"
      />
    ),
    name: "Traian Mustiatse",
    role: "social media manager",
    description:
      "Works as a guide in Zakarpattia mountain tours and as a music teacher in Dubove village art school (Tiachiv district, Zakarpattia Oblast). Follows a raw food diet. Has travelled to seven countries.",
    talk:
      "Works as a guide in Zakarpattia mountain tours and as a music teacher in Dubove village art school (Tiachiv district, Zakarpattia Oblast). Follows a raw food diet. Has travelled to seven countries."
  },
  {
    fotoSrc: () => (
      <Image
        source={require(`../assets/images/about/olha.png`)}
        style={[styles.foto]}
        resizeMode="cover"
      />
    ),
    name: "Olha Shor",
    role: "expedition coordinator",
    description:
      "Holds a Master’s degree in Cultural Studies. Coordinator and Consultant for global media projects like Associated Press London, Die Zeit, and Aljazeera America. Line producer for the United Nations Television project in Ukraine. Filming administrator for the travel show “Veriu – ne veriu” in twenty-four countries.",
    talk:
      "I am happy to have been invited to the project that encapsulates the best about Ukraine for Ukrainians and foreigners. When taking part in international projects in Ukraine, I’m proud of my country. I see how my foreign colleagues are impressed by that inconceivable and incorruptible sense of freedom, sincerity, profound worldview, intellectuality, and beauty of a whole people in a country that most of them knew little about before the 2013 revolution. Ukraine is unique, it is being created by exceptional people from the periphery. That is what I want to keep telling about, I want our culture to reach the world."
  },
  {
    fotoSrc: () => (
      <Image
        source={require(`../assets/images/about/iryna.png`)}
        style={[styles.foto]}
        resizeMode="cover"
      />
    ),
    name: "Iryna Shvets",
    role: "fundraiser",
    description:
      "Has ten years of professional experience in the social sector.",
    talk:
      "I joined the Ukraїner team by accident: a friend asked for my help regarding a grant application. That’s how I stayed in the project. Then I realized that volunteering is a great way to get a break from monitoring political processes in our country and to add some #peremoha [#win] to my routine."
  },
  {
    fotoSrc: () => (
      <Image
        source={require(`../assets/images/about/maria.png`)}
        style={[styles.foto]}
        resizeMode="cover"
      />
    ),
    name: "Maria Terebus",
    role: "film editor",
    description:
      "Geographer by training and filmmaker by calling. At the age of twelve, she started recording and editing short features with a film camera. She began exploring Ukraine as a kid due to yearly kayak trips and hiked a lot in the Crimea and the Carpathians. Using buses and hitchhiking, Maria has visited over twenty regions of Ukraine.",
    talk:
      "In spring 2016, I took part in the ‘86’ Festival [International Cinema and Urban Planning Festival ‘86’] with a documentary about the Dombrovsky quarry in Kalush. It was then that I got the idea of an expedition around Ukraine. A month later, I came across the wonderful Ukraїner project and thought to myself, “It’s destiny!” Ukraїner provides Ukrainians with a key to unity and mutual understanding that we lack so much as well as a powerful stream of energy and inspiration for us to build a ‘dream country’ on our own land."
  }
];

export default AboutScreen;
