import ThemedText from '@/components/common/ThemedText';
import EventEmitter from 'events';
import React, { useEffect, useState } from 'react';
import { Animated } from 'react-native';

export const snakbarEventEmitter = new EventEmitter();

function show(message: string) {
  snakbarEventEmitter.emit('show', message);
}
function hide() {
  snakbarEventEmitter.emit('hide');
}

export const Snackbar = {
  show,
  hide,
  LENGTH_SHORT: 2000,
  LENGTH_LONG: 4000,
};

function SnackbarManager() {
  const [message, setMessage] = useState<string | null>(null);
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    snakbarEventEmitter.on('show', setMessage);

    return () => {
      snakbarEventEmitter.off('show', setMessage);
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
        }).start(() => setMessage(null));
      }, 2000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

  if (!message) {
    return null;
  }

  return (
    <Animated.View style={{ opacity: fadeAnim }}>
      <ThemedText>{message}</ThemedText>
    </Animated.View>
  );
}

export default SnackbarManager;
