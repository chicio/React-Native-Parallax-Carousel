import {interpolate, SharedValue, useAnimatedStyle} from "react-native-reanimated";

export const useParallaxWithOpacityAnimations = (
    index: number,
    scrollX: SharedValue<number>,
    width: number
) => {
    const inputRange = [
        (index - 1) * width,
        index * width,
        (index + 1) * width,
    ];

    const parallaxAnimatedStyle = useAnimatedStyle(() => ({
        transform: [{translateX: interpolate(scrollX.value, inputRange, [-200, 0, 200])}],
    }));

    const opacityAnimatedStyle = useAnimatedStyle(() => ({
        opacity: interpolate(scrollX.value, inputRange, [0, 1, 0])
    }));

    return {
        parallaxAnimatedStyle,
        opacityAnimatedStyle,
    }
}
