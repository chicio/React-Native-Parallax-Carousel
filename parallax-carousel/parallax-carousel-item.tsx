import React from "react";
import Animated, {interpolate, SharedValue, useAnimatedStyle} from "react-native-reanimated";
import {Dimensions, Image, StyleSheet, View} from "react-native";
import {Item} from "@/parallax-carousel/Item";
import { LinearGradient } from 'expo-linear-gradient';
const { width, height } = Dimensions.get('window');

export const ParallaxCarouselItem: React.FC<{ index: number,   scrollX: SharedValue<number>; item: Item }> = ({ index, scrollX, item }) => {
    const inputRange = [
        (index - 1) * width,
        index * width,
        (index + 1) * width,
    ];

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: interpolate(scrollX.value, inputRange, [-200, 0, 200]) }],
        };
    });

    const opacityAnimatedStyle = useAnimatedStyle(() => {
        return { opacity: interpolate(scrollX.value, inputRange, [0, 1, 0]) };
    });

    return (
        <View style={styles.itemContainer}>
            <Animated.View style={[styles.imageContainer, animatedStyle]}>
                <Image source={{ uri: item.image }} style={styles.image} />
            </Animated.View>
            <LinearGradient
                style={{height: '40%', width: '100%', marginTop: 'auto'}}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                colors={['#00000000', '#000000CC']}
            >
                <View style={styles.caption}>
                    <Animated.Text style={[opacityAnimatedStyle, styles.title]}>{item.title}</Animated.Text>
                    <Animated.Text style={[opacityAnimatedStyle, styles.description]}>{item.description}</Animated.Text>
                </View>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    itemContainer: {
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    imageContainer: {
        width: width,
        height: height,
        overflow: 'hidden',
        borderRadius: 15,
        position: 'absolute',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    caption: {
        paddingHorizontal: 24,
        position: "absolute",
        bottom: 60,
        display: "flex",
        flexDirection: "column",
        gap: 12,
    },
    title: {
        fontSize: 32,
        color: 'white'
    },
    description: {
        fontSize: 18,
        color: 'white',
        fontStyle: 'italic',
        height: 80
    }
});
