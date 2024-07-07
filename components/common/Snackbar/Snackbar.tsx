import ThemedText from '@/components/common/ThemedText';
import { colors } from '@/constants/Colors';
import React, { useEffect, useMemo, useState } from 'react';
import { Animated, StyleSheet } from 'react-native';

export const SNACKBAR = {
  DURATION_SHORT: 2000,
  DURATION_LONG: 4000,
};

export type SnackbarType = 'error' | 'success' | 'info';

type SnackbarProps = {
  onDismiss: () => void;
  message: string | null;
  type?: SnackbarType;
  duration?: number;
};

let timeout: NodeJS.Timeout | null = null;

function Snackbar({
  onDismiss,
  message,
  duration = SNACKBAR.DURATION_SHORT,
  type = 'info',
}: SnackbarProps) {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    if (message) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
      timeout = setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start(() => onDismiss());
      }, duration);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

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

  useEffect(() => {
    if (message) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();

      setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start(() => onDismiss());
      }, duration);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message, duration]);

  return (
    <Animated.View
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flex: 1,
        opacity: fadeAnim,
        zIndex: 999,
        marginBottom: 120,
        pointerEvents: message ? 'auto' : 'none',
      }}
    >
      <Animated.View style={[styles.container, resolvedContainerStyle]}>
        <ThemedText style={[resolvedTextStyle]}>{message}</ThemedText>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
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
