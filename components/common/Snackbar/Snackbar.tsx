import ThemedText from '@/components/common/ThemedText';
import { colors } from '@/constants/Colors';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, StyleSheet, TouchableWithoutFeedback } from 'react-native';

export const SNACKBAR = {
  DURATION_SHORT: 2000,
  DURATION_LONG: 4000,
};

export type SnackbarType = 'error' | 'success' | 'info';

type SnackbarProps = {
  onDismiss: () => void;
  message: string | null;
  RightComponent?: React.ReactNode;
  type?: SnackbarType;
  duration?: number;
};

function Snackbar({
  onDismiss,
  RightComponent = null,
  message,
  duration = SNACKBAR.DURATION_SHORT,
  type = 'info',
}: SnackbarProps) {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [translateYAnim] = useState(new Animated.Value(100));
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const resolvedContainerStyle = useMemo(() => {
    switch (type) {
      case 'error':
        return errorStyles.container;
      case 'success':
        return successStyles.container;
      default:
        return infoStyles.container;
    }
  }, [type]);

  const resolvedTextStyle = useMemo(() => {
    switch (type) {
      case 'error':
        return errorStyles.text;
      case 'success':
        return successStyles.text;
      default:
        return infoStyles.text;
    }
  }, [type]);

  const enterAnimation = () => {
    clearAllTimeout();
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
    Animated.timing(translateYAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const exitAnimation = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => onDismiss());
    Animated.timing(translateYAnim, {
      toValue: 100,
      duration: 200,
      useNativeDriver: true,
    }).start(() => onDismiss());
  };

  const clearAllTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    if (message) {
      enterAnimation();

      timeoutRef.current = setTimeout(() => {
        exitAnimation();
      }, duration);
    }

    return () => {
      clearAllTimeout();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message, duration]);

  return (
    <TouchableWithoutFeedback onPress={exitAnimation}>
      <Animated.View
        style={{
          position: 'absolute',
          bottom: 120,
          left: 0,
          right: 0,
          flex: 1,
          opacity: fadeAnim,
          transform: [
            {
              translateY: translateYAnim,
            },
          ],
          zIndex: 999,
          pointerEvents: message ? 'auto' : 'none',
        }}
      >
        <Animated.View style={[styles.container, resolvedContainerStyle]}>
          <ThemedText style={[resolvedTextStyle]}>{message}</ThemedText>
          {RightComponent}
        </Animated.View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 8,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    borderRadius: 8,
    padding: 16,
    backgroundColor: colors.red,
    marginHorizontal: 16,
  },
});

const infoStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.grey,
  },
  text: {
    color: colors.black,
  },
});

const successStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.green,
  },
  text: {
    color: colors.white,
  },
});

const errorStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.red,
  },
  text: {
    color: colors.white,
  },
});

export default Snackbar;
