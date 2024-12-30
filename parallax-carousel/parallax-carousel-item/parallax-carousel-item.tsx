import React from "react";
import Animated, {SharedValue} from "react-native-reanimated";
import {Dimensions, Image, StyleSheet, View} from "react-native";
import {ParallaxCarouselItemData} from "@/parallax-carousel/parallax-carousel-item/parallax-carousel-item-data";
import {LinearGradient} from 'expo-linear-gradient';
import {
    useParallaxWithOpacityAnimations
} from "@/parallax-carousel/parallax-carousel-item/use-parallax-with-opacity-animations";

const { width, height } = Dimensions.get('window');

export const ParallaxCarouselItem: React.FC<{ index: number,   scrollX: SharedValue<number>; item: ParallaxCarouselItemData }> = ({ index, scrollX, item }) => {
    const {parallaxAnimatedStyle, opacityAnimatedStyle} = useParallaxWithOpacityAnimations(index, scrollX, width);

    return (
        <View style={styles.itemContainer}>
            <Animated.View style={[styles.imageContainer, parallaxAnimatedStyle]}>
                <Image source={{ uri: item.image }} style={styles.image} />
            </Animated.View>
            <LinearGradient
                style={styles.gradient}
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
    },
    gradient: {
        height: '40%',
        width: '100%',
        marginTop: 'auto'
    }
});
