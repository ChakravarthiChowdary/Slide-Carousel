import * as React from "react";
import {
  Animated,
  ImageBackground,
  StyleSheet,
  View,
  Text,
} from "react-native";

import { width } from "../utils/DeviceInfo";

type Slide = {
  image: any;
  title: string;
  subtitle: string;
};

const SlideItem: React.FC<{
  slide: Slide;
  scrollX: Animated.Value;
  index: number;
}> = ({ slide, scrollX, index }) => {
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

  const opacity = scrollX.interpolate({
    inputRange,
    outputRange: [0, 1, 0],
  });
  const scale = scrollX.interpolate({
    inputRange,
    outputRange: [0.6, 1, 0.6],
  });
  const perspective = scrollX.interpolate({
    inputRange,
    outputRange: [1200, 800, 1200],
  });
  const translateX = Animated.subtract(scrollX, index * width);
  const rotateY = scrollX.interpolate({
    inputRange,
    outputRange: ["-45deg", "0deg", "45deg"],
  });

  return (
    <Animated.View
      style={[
        styles.cardContainer,
        {
          opacity,
          transform: [{ scale }, { perspective }, { translateX }, { rotateY }],
        },
      ]}
    >
      <ImageBackground source={slide.image} style={{ flex: 1 }}>
        <View style={styles.cardContentContainer}>
          <Text style={styles.title}>{slide.title}</Text>
          <Text style={styles.subtitle}>{slide.subtitle}</Text>
        </View>
      </ImageBackground>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1, backgroundColor: "rgba(30,30,30,0.8)" },
  cardContainer: {
    width,
    flex: 1,
    justifyContent: "center",
    borderRadius: 30,
    overflow: "hidden",
  },
  cardContentContainer: {
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 16,
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
  },
  title: {
    color: "white",
    fontWeight: "bold",
    fontSize: 56,
    textShadowColor: "black",
    textShadowRadius: 4,
    textShadowOffset: {
      width: 1,
      height: 1,
    },
  },
  subtitle: {
    color: "rgb(230,230,230)",
    fontWeight: "600",
    fontSize: 16,
  },
});

export default SlideItem;
