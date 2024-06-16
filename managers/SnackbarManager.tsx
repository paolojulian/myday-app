import ThemedText from '@/components/common/ThemedText';
import ThemedView from '@/components/common/ThemedView';
import { colors } from '@/constants/Colors';
import React, { useEffect, useMemo, useState } from 'react';
import {
  Animated,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import EventEmitter from 'react-native/Libraries/vendor/emitter/EventEmitter';

export const SNACKBAR_TEST_IDS = {
  container: 'snackbar-container',
};

export const snackbarEventEmitter = new EventEmitter();

export enum SnackbarTypeEnum {
  error = 'error',
  success = 'success',
  info = 'info',
}

type ShowSnackbarParams = {
  message: string;
  duration?: number;
  type?: SnackbarTypeEnum;
};

function show(params: ShowSnackbarParams) {
  snackbarEventEmitter.emit('show', params);
}
function hide() {
  snackbarEventEmitter.emit('hide');
}

export const Snackbar = {
  show,
  hide,
  LENGTH_SHORT: 2000,
  LENGTH_LONG: 4000,
};

function SnackbarManager() {
  const [message, setMessage] = useState<string | null>(null);
  const [duration, setDuration] = useState<number>(Snackbar.LENGTH_SHORT);
  const [type, setType] = useState<SnackbarTypeEnum>(SnackbarTypeEnum.info);
  const [fadeAnim] = useState(new Animated.Value(0));

  const resolvedContainerStyle = useMemo(() => {
    switch (type) {
      case SnackbarTypeEnum.error:
        return errorStyles.container;
      case SnackbarTypeEnum.success:
        return successStyles.container;
      default:
        return infoStyles.container;
    }
  }, [type]);

  const resolvedTextStyle = useMemo(() => {
    switch (type) {
      case SnackbarTypeEnum.error:
        return errorStyles.text;
      case SnackbarTypeEnum.success:
        return successStyles.text;
      default:
        return infoStyles.text;
    }
  }, [type]);

  const handleHide = () => {
    setMessage(null);
  };
  const handleShow = (params: ShowSnackbarParams) => {
    setMessage(params.message);
    setDuration(params.duration || Snackbar.LENGTH_SHORT);
    setType(params.type || SnackbarTypeEnum.info);
  };

  useEffect(() => {
    snackbarEventEmitter.addListener('show', handleShow);
    snackbarEventEmitter.addListener('hide', handleHide);

    return () => {
      snackbarEventEmitter.removeAllListeners('show');
      snackbarEventEmitter.removeAllListeners('hide');
    };
  }, []);

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
        }).start();
      }, duration);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message, duration]);

  if (!message) {
    return null;
  }

  return (
    <Modal onRequestClose={handleHide} visible={!!message} animationType="slide" transparent>
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
          onPress={handleHide}
        />
        <SafeAreaView style={{ alignSelf: 'stretch' }}>
          <ThemedView style={[styles.container, resolvedContainerStyle]}>
            <ThemedText style={[resolvedTextStyle]}>{message}</ThemedText>
          </ThemedView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 'auto',
    alignSelf: 'stretch',
    elevation: 8,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    borderRadius: 8,
    padding: 16,
    backgroundColor: colors.red,
    marginHorizontal: 16,
    marginBottom: 24,
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

export default SnackbarManager;
