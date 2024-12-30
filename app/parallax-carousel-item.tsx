import React from "react";
import Animated, {interpolate, SharedValue, useAnimatedStyle} from "react-native-reanimated";
import {Dimensions, Image, StyleSheet, View} from "react-native";
import {Item} from "@/app/Item";

const { width, height } = Dimensions.get('window');
const ITEM_WIDTH = width;

export const ParallaxCarouselItem: React.FC<{ index: number,   scrollX: SharedValue<number>; item: Item }> = ({ index, scrollX, item }) => {
    const animatedStyle = useAnimatedStyle(() => {
        const inputRange = [
            (index - 1) * ITEM_WIDTH,
            index * ITEM_WIDTH,
            (index + 1) * ITEM_WIDTH,
        ];

        const translateX = interpolate(scrollX.value, inputRange, [-100, 0, 100]);

        return {
            transform: [{ translateX }],
        };
    });

    return (
        <View style={styles.itemContainer}>
            <Animated.View style={[styles.imageContainer, animatedStyle]}>
                <Image source={{ uri: item.image }} style={styles.image} />
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    itemContainer: {
        width: ITEM_WIDTH,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    imageContainer: {
        width: ITEM_WIDTH,
        height: height,
        overflow: 'hidden',
        borderRadius: 15,
        backgroundColor: 'red',
        position: 'absolute',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
});
