import React, { FC, useRef } from "react";
import { Animated } from "react-native";
import { StyleSheet, Text, View, Dimensions } from "react-native";

const { width } = Dimensions.get("screen");

const images: string[] = [
  "#D72D1E",
  "#E790E7",
  "#B3FE70",
  "#1BB1D8",
  "#005B52",
  "#9D216E",
  "#558F77",
  "#E25136",
  "#96B12C",
  "#B3FE70",
  "#1BB1D8",
  "#D72D1E",
  "#E790E7",
  "#BB2148",
];

const Carousel: FC = () => {
  const xScroll = useRef(new Animated.Value(0)).current;
  return (
    <View style={styles.container}>
      <Animated.FlatList
        horizontal
        snapToInterval={width}
        decelerationRate={"fast"}
        showsHorizontalScrollIndicator={false}
        data={images}
        style={styles.flatList}
        keyExtractor={(_, index) => index.toString()}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: xScroll } } }],
          {
            useNativeDriver: true,
          }
        )}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];
          const outputRange = ["-90deg", "0deg", "90deg"];
          const translateX = xScroll.interpolate({ inputRange, outputRange });
          return (
            <View style={styles.imageContainer}>
              <Animated.View
                style={[
                  styles.image,
                  {
                    transform: [{ rotateZ: translateX }],
                    backgroundColor: item,
                  },
                ]}
              />
            </View>
          );
        }}
      />
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  flatList: {
    flexGrow: 0,
  },
  imageContainer: {
    width,
    height: 500,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: 300,
    width: width - 150,
    borderRadius: 20,
    resizeMode: "cover",
  },
});
