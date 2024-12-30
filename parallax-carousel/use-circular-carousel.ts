import {ParallaxCarouselItemData} from "@/parallax-carousel/parallax-carousel-item/parallax-carousel-item-data";
import Animated, {runOnJS, useAnimatedRef, useAnimatedScrollHandler, useSharedValue} from "react-native-reanimated";
import {useMemo} from "react";
import {Dimensions} from "react-native";

const { width } = Dimensions.get('window');

export const useCircularCarousel = (items: ParallaxCarouselItemData[]) => {
    const scrollX = useSharedValue(0);
    const flatListRef = useAnimatedRef<Animated.FlatList<ParallaxCarouselItemData>>();
    const itemsWithFakeEntries = useMemo(
        () => [items[items.length - 1], ...items, items[0]],
        [items]
    );

    const scrollToIndex = (index: number) => {
        flatListRef.current?.scrollToIndex({ index: index, animated: false });
    };

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollX.value = event.contentOffset.x;
        },
        onMomentumEnd: event => {
            const index = Math.round(event.contentOffset.x / width);

            if (index < 1) {
                runOnJS(scrollToIndex)(items.length);
            } else if (index > items.length) {
                runOnJS(scrollToIndex)(1);
            }
        }
    });

    const getItemLayout= (_: ArrayLike<ParallaxCarouselItemData> | null | undefined, index: number) =>
        ({ length: width, offset: width * index, index })

    return {
        scrollX,
        flatListRef,
        itemsWithFakeEntries,
        scrollHandler,
        getItemLayout
    }
}
