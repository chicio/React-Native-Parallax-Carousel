import {FC, useEffect, useMemo} from 'react';
import {Dimensions} from 'react-native';
import Animated, {runOnJS, useAnimatedRef, useAnimatedScrollHandler, useSharedValue, scrollTo} from 'react-native-reanimated';
import {ParallaxCarouselItemData} from "@/parallax-carousel/parallax-carousel-item-data";
import {ParallaxCarouselItem} from "@/parallax-carousel/parallax-carousel-item";

const { width } = Dimensions.get('window');

export const ParallaxCarousel: FC<{ items: ParallaxCarouselItemData[] }> = ({ items }) => {
    const scrollX = useSharedValue(0);
    const flatListRef = useAnimatedRef<Animated.FlatList<ParallaxCarouselItemData>>();
    const itemsWithFakeEntries = useMemo(() => [items[items.length - 1], ...items, items[0]], [items]);

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

    const renderItem = ({ item, index }: {item: ParallaxCarouselItemData, index: number}) =>
            <ParallaxCarouselItem index={index} scrollX={scrollX} item={item}/>

    return (
        <Animated.FlatList
            ref={flatListRef}
            data={itemsWithFakeEntries}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={width}
            decelerationRate="fast"
            onScroll={scrollHandler}
            scrollEventThrottle={16}
            renderItem={renderItem}
            pagingEnabled
            initialScrollIndex={1}
            getItemLayout={(_, index) => ({ length: width, offset: width * index, index })}
            bounces={false}
        />
    );
};
