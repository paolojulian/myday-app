import ThemedView from '@/components/common/ThemedView';
import type { PropsWithChildren, ReactElement } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated';

export const HEADER_HEIGHT = 200;

type Props = PropsWithChildren<{
  headerContent?: ReactElement;
  headerBackgroundColor: string;
}>;

export default function ParallaxScrollView({
  children,
  headerContent,
  headerBackgroundColor,
}: Props) {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);

  const headerAnimatedStyle = useAnimatedStyle(() => {
    // const shouldShrink = scrollOffset.value > HEADER_HEIGHT - MIN_HEADER_HEIGHT;
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.7],
          ),
        },
        {
          scale: interpolate(scrollOffset.value, [-HEADER_HEIGHT, 0, HEADER_HEIGHT], [2, 1, 1]),
        },
      ],
      borderBottomEndRadius: interpolate(
        scrollOffset.value,
        [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
        [24, 24, 0],
      ),
      borderBottomStartRadius: interpolate(
        scrollOffset.value,
        [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
        [24, 24, 0],
      ),
    };
  });

  return (
    <ThemedView style={styles.container}>
      <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
        <Animated.View
          style={[styles.header, { backgroundColor: headerBackgroundColor }, headerAnimatedStyle]}
        >
          {headerContent}
        </Animated.View>
        <ThemedView style={styles.content}>{children}</ThemedView>
      </Animated.ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: HEADER_HEIGHT,
    borderBottomEndRadius: 24,
    borderBottomStartRadius: 24,
  },
  content: {
    flex: 1,
    gap: 16,
  },
});
