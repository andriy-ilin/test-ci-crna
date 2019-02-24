import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Image,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { MapView } from "expo";
import Title from "../components/Title";
import StyledText from "../components/StyledText";
import Video from "../components/Video";
import Link from "../components/Link";
import CloseIcon from "../icons/CloseIcon";
import LeftArrow from "../icons/LeftArrow";

const ChernivtsiUniversity = require("../assets/images/map/сhernivtsiUniversity.png");
const Pamir = require("../assets/images/map/pamir.png");
const CarpathianTram = require("../assets/images/map/carpathianTram.png");
const Dzharylgach = require("../assets/images/map/dzharylgach.png");
const ViaductVorokhta = require("../assets/images/map/viaductVorokhta.png");
const Khotyn = require("../assets/images/map/khotyn.png");
const GenicheskLake = require("../assets/images/map/genicheskLake.png");
const Heroic = require("../assets/images/map/heroic.png");
const KorostyshivCanyon = require("../assets/images/map/korostyshivCanyon.png");

const { width, height } = Dimensions.get("window");

const CARD_HEIGHT = height / 4;
const CARD_WIDTH = width - 50;

export default class screens extends Component {
  state = {
    openIndex: null,
    render: false,
    show: false,
    overlayImage: false,
    coords: {
      left: new Animated.Value(0),
      top: new Animated.Value(0),
      width: new Animated.Value(0),
      height: new Animated.Value(0)
    },
    transition: {},
    markers: dataMarkers,
    region: {
      latitude: 47.9184002,
      longitude: 25.3856996,
      latitudeDelta: 0.5,
      longitudeDelta: 0.5
    }
  };

  componentWillMount() {
    this.index = 0;
    this.images = {};
    this.animation = new Animated.Value(0);
    this.opacityAnimation = new Animated.Value(0);
  }
  componentDidMount() {
    // We should detect when scrolling has stopped then animate
    // We should just debounce the event listener here
    this.animation.addListener(({ value }) => {
      let index = Math.floor(value / (CARD_WIDTH - 60) + 0.3); // animate 30% away from landing on the next item
      if (index >= this.state.markers.length) {
        index = this.state.markers.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(this.regionTimeout);
      this.regionTimeout = setTimeout(() => {
        if (this.index !== index) {
          this.index = index;
          const { coordinate } = this.state.markers[index];
          this.map.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: this.state.region.latitudeDelta,
              longitudeDelta: this.state.region.longitudeDelta
            },
            350
          );
        }
      }, 10);
    });
  }

  handleClose = () => {
    const { openIndex: index } = this.state;

    this.tImage.measure(
      (tframeX, tframeY, tframeWidth, tframeHeight, tpageX, tpageY) => {
        this.state.coords.top.setValue(tpageY);
        this.state.coords.left.setValue(tpageX);
        this.state.coords.width.setValue(tframeWidth);
        this.state.coords.height.setValue(tframeHeight);
        Animated.timing(this.opacityAnimation, {
          toValue: 0,
          duration: 100 // THIS SHOULD BE INTERPOLATION FROM X AND Y!
        }).start();

        this.setState(
          {
            overlayImage: true
          },
          () => {
            this.images[index].measure(
              (frameX, frameY, frameWidth, frameHeight, pageX, pageY) => {
                Animated.parallel([
                  Animated.timing(this.state.coords.top, {
                    toValue: pageY,
                    duration: 250
                  }),
                  Animated.timing(this.state.coords.left, {
                    toValue: pageX,
                    duration: 250
                  }),
                  Animated.timing(this.state.coords.width, {
                    toValue: frameWidth,
                    duration: 250
                  }),
                  Animated.timing(this.state.coords.height, {
                    toValue: frameHeight,
                    duration: 250
                  })
                ]).start(() => {
                  this.setState({
                    overlayImage: false,
                    render: false,
                    openIndex: null
                  });
                });
              }
            );
          }
        );
      }
    );
  };

  handleShow = index => {
    this.setState(
      {
        openIndex: index,
        render: true,
        transition: this.state.markers[index]
      },
      () => {
        this.images[index].measure(
          (frameX, frameY, frameWidth, frameHeight, pageX, pageY) => {
            this.state.coords.top.setValue(pageY);
            this.state.coords.left.setValue(pageX);
            this.state.coords.width.setValue(frameWidth);
            this.state.coords.height.setValue(frameHeight);
            this.setState(
              {
                overlayImage: true
              },
              () => {
                this.tImage.measure(
                  (
                    tframeX,
                    tframeY,
                    tframeWidth,
                    tframeHeight,
                    tpageX,
                    tpageY
                  ) => {
                    Animated.parallel([
                      Animated.timing(this.state.coords.top, {
                        toValue: tpageY,
                        duration: 250
                      }),
                      Animated.timing(this.state.coords.left, {
                        toValue: tpageX,
                        duration: 250
                      }),
                      Animated.timing(this.state.coords.width, {
                        toValue: tframeWidth,
                        duration: 250
                      }),
                      Animated.timing(this.state.coords.height, {
                        toValue: tframeHeight,
                        duration: 250
                      })
                    ]).start(() => {
                      this.opacityAnimation.setValue(1);
                      this.setState({
                        overlayImage: false
                      });
                    });
                  }
                );
              }
            );
          }
        );
      }
    );
  };

  render() {
    const interpolations = this.state.markers.map((marker, index) => {
      const inputRange = [
        (index - 1) * (CARD_WIDTH - 60),
        index * (CARD_WIDTH - 60),
        (index + 1) * (CARD_WIDTH - 60) + 1
      ];
      const scale = this.animation.interpolate({
        inputRange,
        outputRange: [1, 2.5, 1],
        extrapolate: "clamp"
      });
      const opacity = this.animation.interpolate({
        inputRange,
        outputRange: [0.35, 1, 0.35],
        extrapolate: "clamp"
      });
      return { scale, opacity };
    });
    return (
      <View style={styles.container}>
        <MapView
          ref={map => (this.map = map)}
          initialRegion={this.state.region}
          style={styles.container}
          // provider={MapView.PROVIDER_GOOGLE}
          // customMapStyle={mapStyle}
        >
          {this.state.markers.map((marker, index) => {
            const scaleStyle = {
              transform: [
                {
                  scale: interpolations[index].scale
                }
              ]
            };
            const opacityStyle = {
              opacity: interpolations[index].opacity
            };
            return (
              <MapView.Marker key={index} coordinate={marker.coordinate}>
                <Animated.View style={[styles.markerWrap, opacityStyle]}>
                  <Animated.View style={[styles.ring, scaleStyle]} />
                  <View style={styles.marker} />
                </Animated.View>
              </MapView.Marker>
            );
          })}
        </MapView>
        <Animated.ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          decelerationRate={0}
          snapToAlignment={"center"}
          snapToInterval={CARD_WIDTH - 40}
          contentInset={{
            top: 0,
            left: 20,
            bottom: 0,
            right: 20
          }}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: this.animation
                  }
                }
              }
            ],
            { useNativeDriver: true }
          )}
          style={styles.scrollView}
          contentContainerStyle={styles.endPadding}
        >
          {this.state.markers.map(
            ({ source, description, image, title }, index) => (
              <Card
                key={index}
                index={index}
                onPress={index => this.handleShow(index)}
                refFn={img => (this.images[index] = img)}
                image={image}
                title={title}
                description={description}
              />
            )
          )}
        </Animated.ScrollView>
        {false && this.state.overlayImage && (
          <Animated.Image
            resizeMode="cover"
            style={{
              position: "absolute",
              top: this.state.coords.top,
              left: this.state.coords.left,
              width: this.state.coords.width,
              height: this.state.coords.height
            }}
            source={this.state.transition.image}
          />
        )}
        {this.state.render && (
          <Animated.View
            style={[
              styles.transitionContainer,
              StyleSheet.absoluteFill,
              { opacity: this.opacityAnimation }
            ]}
          >
            <View style={{ paddingBottom: 50 }} />
            <TouchableOpacity onPress={this.handleClose}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  paddingLeft: 10
                }}
              >
                <LeftArrow />
                <StyledText.Light
                  containerProps={{
                    paddingLeft: 10,
                    paddingTop: 0,
                    paddingBottom: 0
                  }}
                >
                  Back
                </StyledText.Light>
              </View>
            </TouchableOpacity>
            <Title>{this.state.transition.title}</Title>

            <Image
              source={this.state.transition.image}
              style={[styles.transitionImage, { opacity: 0, display: "none" }]}
              ref={tImage => (this.tImage = tImage)}
              resizeMode="cover"
            />

            <Video src={this.state.transition.video} />
            <View style={{ flex: 2 }}>
              <StyledText.Light
                containerProps={{
                  paddingTop: 0,
                  paddingBottom: 20
                }}
              >
                {this.state.transition.description}
              </StyledText.Light>
              <Link url={this.state.transition.mapUrl}>
                <Text>Open in Google maps </Text>
              </Link>
            </View>
          </Animated.View>
        )}
        {!this.state.render && (
          <TouchableOpacity
            style={styles.closeMapButton}
            onPress={() => this.props.navigation.goBack()}
          >
            <CloseIcon />
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

const Card = ({ index, onPress, refFn, image, title, description }) => (
  <TouchableOpacity onPress={() => onPress(index)}>
    <View style={styles.card}>
      <Image
        source={image}
        style={styles.cardImage}
        resizeMode="cover"
        ref={img => refFn(img)}
      />
      <View style={styles.textContent}>
        <StyledText.Bold
          fontSize={14}
          containerProps={{
            paddingLeft: 12,
            paddingTop: 12,
            paddingBottom: 0
          }}
          numberOfLines={2}
        >
          {title}
        </StyledText.Bold>
      </View>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  hide: {
    opacity: 0
  },
  transitionContainer: {
    backgroundColor: "#FFF"
    // padding: 10
  },
  transitionImage: {
    width: "100%",
    flex: 1
  },
  scrollView: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    paddingVertical: 10
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH
  },
  card: {
    borderRadius: 8,
    // paddingBottom: 10,
    elevation: 2,
    backgroundColor: "#FFF",
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH - 60,
    overflow: "hidden"
  },
  cardImage: {
    flex: 4,
    width: "100%",
    height: "100%",
    alignSelf: "center"
  },
  textContent: {
    flex: 1
  },
  cardtitle: {
    fontSize: 12,
    marginTop: 5,
    fontWeight: "bold"
  },
  cardDescription: {
    fontSize: 12,
    color: "#444"
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center"
  },
  marker: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(119, 217, 160, .9)"
  },
  ring: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(119, 217, 160, .3)",
    position: "absolute",
    borderWidth: 1,
    borderColor: "rgba(119, 217, 160, .5)"
  },
  closeMapButton: {
    width: 28,
    height: 28,

    // padding: 5,
    borderRadius: 14,
    backgroundColor: "rgba(255, 255, 255, .8)",
    position: "absolute",
    top: 50,
    left: 30,
    alignItems: "center",
    justifyContent: "center"
  }
});

const dataMarkers = [
  {
    coordinate: {
      latitude: 47.9184002,
      longitude: 25.3856996
    },

    title: "Pamir on Mount Tomnatyk",
    description:
      "In the Bukovynian Carpathians 5 white domes were hidden, which provided control of the air border of the USSR. The remnants of the station with the call of Pamir are still crocheted by the summit of Mount Tomnatyk on the border with Romania.",
    video: "https://www.youtube.com/embed/c6QLFf6liZo",
    image: Pamir,
    mapUrl:
      "https://www.google.com/maps/search/Pamir+on+Mount+Tomnatyk/@39.0000315,71.9824904,14z/data=!3m1!4b1"
  },
  {
    coordinate: {
      latitude: 48.2961974,
      longitude: 25.918711
    },

    title: "Chernivtsi University",
    description:
      "From the residence of the Metropolitan to the UNESCO World Heritage and Education Facility. Unique ensemble of buildings of Chernivtsi National University.",
    video: "https://www.youtube.com/embed/annlesFomPs",
    image: ChernivtsiUniversity,
    mapUrl:
      "https://www.google.com/maps/place/%D0%A7%D0%B5%D1%80%D0%BD%D1%96%D0%B2%D0%B5%D1%86%D1%8C%D0%BA%D0%B8%D0%B9+%D0%BD%D0%B0%D1%86%D1%96%D0%BE%D0%BD%D0%B0%D0%BB%D1%8C%D0%BD%D0%B8%D0%B9+%D1%83%D0%BD%D1%96%D0%B2%D0%B5%D1%80%D1%81%D0%B8%D1%82%D0%B5%D1%82+%D1%96%D0%BC%D0%B5%D0%BD%D1%96+%D0%AE%D1%80%D1%96%D1%8F+%D0%A4%D0%B5%D0%B4%D1%8C%D0%BA%D0%BE%D0%B2%D0%B8%D1%87%D0%B0/@48.2969306,25.9219931,17z/data=!3m1!4b1!4m5!3m4!1s0x4734062770c7b427:0x70798ec25d36654d!8m2!3d48.2969271!4d25.9241818"
  },
  {
    coordinate: {
      latitude: 48.9345102,
      longitude: 23.905185
    },
    title: "Carpathian tram",
    description:
      "The Carpathian narrow-gauge in Benefit is one of four operating in Ukraine. The train, which took mountain forests for more than a hundred years, in 2003 got the name 'Carpathian tram' and began to actively carry even tourists.",
    video: "https://www.youtube.com/embed/Nr2FJ7T2d7A",
    image: CarpathianTram,
    mapUrl:
      "https://www.google.com/maps/place/%D0%9A%D0%B0%D1%80%D0%BF%D0%B0%D1%82%D1%81%D1%8C%D0%BA%D0%B8%D0%B9+%D1%82%D1%80%D0%B0%D0%BC%D0%B2%D0%B0%D0%B9%D1%87%D0%B8%D0%BA/@48.9345523,23.9087897,17z/data=!3m1!4b1!4m5!3m4!1s0x473a05560fc5a9f1:0x6828fc96d455590f!8m2!3d48.9345488!4d23.9109784"
  },
  {
    coordinate: {
      latitude: 46.5282767,
      longitude: 31.7885074
    },
    title: "Dzharylgach. The largest uninhabited island",
    description:
      "Dzharylgach is the largest uninhabited island of Ukraine. It has an elongated shape that resembles a natural wave break. In this corner of silence and virtually untouched nature in Tavria, conditions for rest in tents are created.",
    video: "https://www.youtube.com/embed/6KqBRFSlbR8",
    image: Dzharylgach,
    mapUrl:
      "https://www.google.com/maps/place/%D0%94%D0%B6%D0%B0%D1%80%D0%B8%D0%BB%D0%B3%D0%B0%D1%87/@46.0371869,32.5346298,10z/data=!3m1!4b1!4m5!3m4!1s0x40c115aaa4b6c09d:0x44391ac93e365224!8m2!3d46.03372!4d32.8974944"
  },
  {
    coordinate: {
      latitude: 48.2852938,
      longitude: 24.4598661
    },
    title: "Viaduct in Vorokhta",
    description:
      "Vorohtyan viaduct - a bridge of massive stone blocks, built in the late nineteenth century. Look at his panorama from the sky.",
    video: "https://www.youtube.com/embed/BJkeOOWq42g",
    image: ViaductVorokhta
  },
  {
    coordinate: {
      latitude: 48.5167798,
      longitude: 26.492965
    },
    title: "Khotyn Fortress",
    description:
      "Khotyn fortress for centuries defended an important trade and customs point over the Dniester plain. Here at different times lived Turkish and Polish soldiers, Cossacks and Hetman, and today this place attracts tourists from all over the world.",
    video: "https://www.youtube.com/embed/HlBDPQLUpHE",
    image: Khotyn,
    mapUrl:
      "https://www.google.com/maps/place/%D0%A5%D0%BE%D1%82%D0%B8%D0%BD,+%D0%A7%D0%B5%D1%80%D0%BD%D1%96%D0%B2%D0%B5%D1%86%D1%8C%D0%BA%D0%B0+%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%8C/@48.5084725,26.4578351,13z/data=!3m1!4b1!4m5!3m4!1s0x4733944a622a3ceb:0x13412835dea98852!8m2!3d48.5097106!4d26.4903334"
  },
  {
    coordinate: {
      latitude: 46.0791206,
      longitude: 34.6591928
    },
    title: "Genichesk lake",
    description:
      "Genichesk lake is located on the north shoal Arabatskaya Arrow.This lake is salty and rich in valuable minerals. It has long been extracted from the kitchen salt and used in medicine and cosmetology. When the lava becomes concentrated in the summer, the lake is rosy. Smooth rustic salt sparkles on the shores of sunny days. To see the pink lake, tourists and photographers come from everywhere",
    video: "https://www.youtube.com/embed/v=y_u5X3eaZLo",
    image: GenicheskLake,
    mapUrl:
      "https://www.google.com/maps/search/Genichesk+lake/@46.0360503,34.7781492,11.16z"
  },
  {
    coordinate: {
      latitude: 46.3041777,
      longitude: 32.4123315
    },

    title: "Heroic. Salt fishing",
    description:
      "On the colorful lakes of Tavriya, the ancient tradition of salt extraction has been preserved by phased evaporation. Take a look at the water supply palette of the company that grows the salt crystals under the bright southern sun.",
    video: "https://www.youtube.com/embed/3QbhrkzFx7g",
    image: Heroic,
    mapUrl:
      "https://www.google.com/maps/place/46%C2%B018'15.0%22N+32%C2%B024'44.4%22E/@46.1864899,32.0562974,9.94z/data=!4m5!3m4!1s0x0:0x0!8m2!3d46.3041777!4d32.4123315"
  },
  {
    coordinate: {
      latitude: 50.3169836,
      longitude: 29.08012
    },
    title: "Korostyshiv Canyon",
    description:
      "Korostyshiv Canyon - a thrown granite quarry in Polissya, which turned into a deep lake, surrounded by carved rocks. Pine trees, spruce and birch trees grow on top of a stone, creating strange landscapes.",
    video: "https://www.youtube.com/embed/6tqy6S75bEM",
    image: KorostyshivCanyon,
    mapUrl:
      "https://www.google.com/maps/place/%D0%9A%D0%B0%D0%BD%D1%8C%D0%B9%D0%BE%D0%BD/@50.3150515,29.0910003,17z/data=!3m1!4b1!4m5!3m4!1s0x472c8239091e68f1:0xe2a85a4c99ea33e4!8m2!3d50.3151088!4d29.0931168"
  }
];

const mapStyle = [
  {
    elementType: "geometry",
    stylers: [
      {
        color: "#f5f5f5"
      }
    ]
  },
  {
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#616161"
      }
    ]
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#f5f5f5"
      }
    ]
  },
  {
    featureType: "administrative.land_parcel",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#bdbdbd"
      }
    ]
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [
      {
        color: "#eeeeee"
      }
    ]
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575"
      }
    ]
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [
      {
        color: "#e5e5e5"
      }
    ]
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#9e9e9e"
      }
    ]
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [
      {
        color: "#ffffff"
      }
    ]
  },
  {
    featureType: "road.arterial",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575"
      }
    ]
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        color: "#dadada"
      }
    ]
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#616161"
      }
    ]
  },
  {
    featureType: "road.local",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#9e9e9e"
      }
    ]
  },
  {
    featureType: "transit.line",
    elementType: "geometry",
    stylers: [
      {
        color: "#e5e5e5"
      }
    ]
  },
  {
    featureType: "transit.station",
    elementType: "geometry",
    stylers: [
      {
        color: "#eeeeee"
      }
    ]
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#c9c9c9"
      }
    ]
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#9e9e9e"
      }
    ]
  }
];
