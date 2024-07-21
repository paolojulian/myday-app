import ThemedView from '@/components/common/ThemedView';
import { colors } from '@/constants/Colors';
import {
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
  return (
    <>
      <Modal onRequestClose={onClose} visible={isOpen} animationType={variant} transparent>
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
          <Pressable
            style={{
              ...StyleSheet.absoluteFillObject,
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: variant === 'fade' ? 'rgba(0, 0, 0, 0.5)' : 'transparent',
            }}
            onPress={onClose}
          />

          {/* Main content */}
          <ThemedView
            style={{
              height: 'auto',
              alignSelf: 'stretch',
              elevation: 16,
              shadowColor: colors.black,
              shadowOpacity: 0.15,
              borderTopEndRadius: 16,
              borderTopStartRadius: 16,
              padding: 16,
              backgroundColor: colors.white,
              minHeight: minHeight ?? 'auto',
            }}
          >
            {/* Small thumb on the middle top of this sheet */}
            <TouchableWithoutFeedback onPress={onClose}>
              <View
                style={{
                  alignSelf: 'center',
                  width: 40,
                  height: 4,
                  backgroundColor: colors.grey,
                  borderRadius: 8,
                  marginBottom: 24,
                }}
              ></View>
            </TouchableWithoutFeedback>
            {children}
          </ThemedView>
        </KeyboardAvoidingView>
      </Modal>
    </>
  );
}
