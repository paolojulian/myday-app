import { colors } from '@/constants/Colors';
import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import { Animated, TextStyle, TouchableWithoutFeedback, View, ViewStyle } from 'react-native';
import { SnackbarType } from './Snackbar';
import ThemedText from '../ThemedText';

type StyledSnacbarContainerProps = {
  onExitAnimation: () => void;
  children: ReactNode;
  isOpen: boolean;
  duration_ms: number;
};
export const StyledSnacbarContainer: FC<StyledSnacbarContainerProps> = ({
  onExitAnimation,
  children,
  isOpen,
  duration_ms,
}) => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [translateYAnim] = useState(new Animated.Value(100));
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const clearAllTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const enterAnimation = (): void => {
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

  const exitAnimation = (): void => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => onExitAnimation());
    Animated.timing(translateYAnim, {
      toValue: 100,
      duration: 200,
      useNativeDriver: true,
    }).start(() => onExitAnimation());
  };

  useEffect(() => {
    if (isOpen) {
      enterAnimation();
      timeoutRef.current = setTimeout(() => {
        exitAnimation();
      }, duration_ms);
    } else {
      exitAnimation();
    }
  }, [isOpen, duration_ms]);

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
          pointerEvents: isOpen ? 'auto' : 'none',
        }}
      >
        {children}
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

type StyledSnackbarCardProps = {
  children: ReactNode;
  variant: SnackbarType;
};
export const StyledSnackbarCard: FC<StyledSnackbarCardProps> = ({ children, variant }) => {
  return (
    <View
      style={[
        {
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
        cardVariantStyle[variant] ?? {},
      ]}
    >
      {children}
    </View>
  );
};
const cardVariantStyle: Record<SnackbarType, ViewStyle> = {
  error: {
    backgroundColor: colors.v2.red,
  },
  info: {
    backgroundColor: colors.v2.grayLight,
  },
  success: {
    backgroundColor: colors.v2.success,
  },
};

type StyledSnackbarMessageProps = {
  message: string | null;
  variant: SnackbarType;
};
export const StyledSnackbarMessage: FC<StyledSnackbarMessageProps> = ({ message, variant }) => {
  return <ThemedText style={[messageVariantStyle[variant] ?? {}]}>{message}</ThemedText>;
};

const messageVariantStyle: Record<SnackbarType, TextStyle> = {
  info: {
    color: colors.v2.black,
  },
  error: {
    color: colors.v2.black,
  },
  success: {
    color: colors.v2.black,
  },
};
