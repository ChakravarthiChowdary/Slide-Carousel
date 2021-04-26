import * as React from "react";
import { Animated, StyleSheet, View } from "react-native";

import { width } from "./utils/DeviceInfo";
import SlideItem from "./components/SlideItem";

type Slide = {
  image: any;
  title: string;
  subtitle: string;
};

const SLIDES: Slide[] = [
  {
    image: require("./assets/img/1.jpg"),
    title: "Giraffe",
    subtitle: "The giraffe is an African artiodactyl mammal",
  },
  {
    image: require("./assets/img/2.jpg"),
    title: "A Cute Bird",
    subtitle: "This a Cute Blue Bird",
  },
  {
    image: require("./assets/img/3.jpg"),
    title: "A Cute Cat",
    subtitle: "This is a cute cat",
  },
  {
    image: require("./assets/img/4.jpg"),
    title: "The Leopord",
    subtitle: "The leopard is one of the five extant species",
  },
];

const App: React.FC = () => {
  const scrollX = React.useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.background}>
      <Animated.FlatList
        data={SLIDES}
        renderItem={({ item, index }: { item: Slide; index: number }) => (
          <SlideItem slide={item} scrollX={scrollX} index={index} />
        )}
        horizontal
        snapToInterval={width}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        decelerationRate={-1}
        bounces={true}
        keyExtractor={(slide: Slide) => slide.title}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
      />
    </View>
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
    backgroundColor: "rgba(0,0,0,0.3)",
    padding: 16,
  },
  title: {
    color: "white",
    fontWeight: "bold",
    fontSize: 64,
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
    fontSize: 18,
  },
});

export default App;
