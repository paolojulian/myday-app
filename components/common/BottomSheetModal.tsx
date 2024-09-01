import { colors } from '@/constants/Colors';
import { useEffect, useRef } from 'react';
import {
  Animated,
  DimensionValue,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

type BottomSheetModalVariants = 'fade' | 'slide';

export type BottomSheetModalProps = {
  onClose: () => void;
  isOpen: boolean;
  children: React.ReactElement;
  variant?: BottomSheetModalVariants;
  minHeight?: DimensionValue;
};

export default function BottomSheetModal({
  onClose,
  variant,
  isOpen,
  children,
  minHeight,
}: BottomSheetModalProps) {
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isOpen) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 800,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isOpen]);

  return (
    <>
      <Modal onRequestClose={onClose} visible={isOpen} animationType={'fade'} transparent>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignItems: 'center',
            margin: 0,
          }}
        >
          {/* Backdrop */}
          <Animated.View style={{ ...StyleSheet.absoluteFillObject }}>
            <Pressable
              style={{
                ...StyleSheet.absoluteFillObject,
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
              }}
              onPress={onClose}
            />
          </Animated.View>
          {/* Main content */}
          <Animated.View
            style={{
              height: 'auto',
              alignSelf: 'stretch',
              elevation: 16,
              shadowColor: colors.v2.black,
              shadowOpacity: 0.8,
              shadowRadius: 48,
              borderTopEndRadius: 24,
              borderTopStartRadius: 24,
              borderWidth: 1,
              borderTopColor: colors.v2.grayDark,
              padding: 16,
              backgroundColor: colors.v2.black,
              minHeight: minHeight ?? 'auto',
              transform: [
                {
                  translateY: variant === 'slide' ? slideAnim : 0,
                },
              ],
            }}
          >
            {/* Small thumb on the middle top of this sheet */}
            <TouchableWithoutFeedback onPress={onClose}>
              <View
                style={{
                  alignSelf: 'center',
                  width: 40,
                  height: 4,
                  backgroundColor: colors.v2.grayLight,
                  borderRadius: 8,
                  marginBottom: 24,
                }}
              ></View>
            </TouchableWithoutFeedback>
            {children}
          </Animated.View>
        </KeyboardAvoidingView>
      </Modal>
    </>
  );
}
