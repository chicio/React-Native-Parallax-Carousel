import {FC} from 'react';
import Animated from 'react-native-reanimated';
import {ParallaxCarouselItemData} from "@/parallax-carousel/parallax-carousel-item/parallax-carousel-item-data";
import {ParallaxCarouselItem} from "@/parallax-carousel/parallax-carousel-item/parallax-carousel-item";
import {useCircularCarousel} from "@/parallax-carousel/use-circular-carousel";

export const ParallaxCarousel: FC<{ items: ParallaxCarouselItemData[] }> = ({ items }) => {
    const {
        scrollX,
        flatListRef,
        itemsWithFakeEntries,
        scrollHandler,
        getItemLayout
    } = useCircularCarousel(items);

    return (
        <Animated.FlatList
            ref={flatListRef}
            data={itemsWithFakeEntries}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            horizontal
            showsHorizontalScrollIndicator={false}
            decelerationRate="fast"
            onScroll={scrollHandler}
            scrollEventThrottle={16}
            renderItem={({item, index}: { item: ParallaxCarouselItemData, index: number }) =>
                <ParallaxCarouselItem index={index} scrollX={scrollX} item={item}/>}
            pagingEnabled
            initialScrollIndex={1}
            getItemLayout={getItemLayout}
            bounces={false}
        />
    );
};
