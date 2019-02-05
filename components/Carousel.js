import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions
} from "react-native";
const { width } = Dimensions.get("window");

class Carousel extends Component {
  componentDidMount() {
    setTimeout(
      () => this.scrollView && this.scrollView.scrollTo({ x: -20 }),
      1
    ); // scroll view position fix
  }

  render() {
    const {
      scrollContainerStyle = {},
      widthItem = width,
      distanceBetween = 40,
      data = [],
      renderItem: Item = DefaultItem,
      ...props
    } = this.props;
    return (
      <ScrollView
        ref={scrollView => {
          this.scrollView = scrollView;
        }}
        style={scrollContainerStyle}
        //pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        decelerationRate={0}
        snapToInterval={width - distanceBetween}
        snapToAlignment={"center"}
        contentInset={{
          top: 0,
          left: distanceBetween / 2,
          bottom: 0,
          right: distanceBetween / 2
        }}
        {...props}
      >
        {data.map((image = {}, key) => (
          <Item {...image} key={key} />
        ))}
      </ScrollView>
    );
  }
}

const DefaultItem = ({ image } = {}) => (
  <Image style={[styles.image]} source={image.source} />
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },

  image: {
    width: width - 60,
    margin: 10,
    height: 446,
    borderRadius: 10
  },
  firstImage: {
    marginLeft: 20
  }
});

export default Carousel;
