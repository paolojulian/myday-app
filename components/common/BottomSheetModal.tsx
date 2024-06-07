import ThemedView from '@/components/common/ThemedView';
import { colors } from '@/constants/Colors';
import { KeyboardAvoidingView, Modal, Platform, Pressable, StyleSheet, View } from 'react-native';

export type BottomSheetModalProps = {
  onClose: () => void;
  isOpen: boolean;
  children: React.ReactElement;
};

export default function BottomSheetModal({ onClose, isOpen, children }: BottomSheetModalProps) {
  return (
    <Modal onRequestClose={onClose} visible={isOpen} animationType="slide" transparent>
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
            backgroundColor: 'transparent',
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
          }}
        >
          {/* Small thumb on the middle top of this sheet */}
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
          {children}
        </ThemedView>
      </KeyboardAvoidingView>
    </Modal>
  );
}
