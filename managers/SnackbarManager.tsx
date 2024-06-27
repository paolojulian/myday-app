import Snackbar from '@/components/common/Snackbar';
import { SnackbarType } from '@/components/common/Snackbar/Snackbar';
import React, { useEffect, useState } from 'react';
import EventEmitter from 'react-native/Libraries/vendor/emitter/EventEmitter';

export const SNACKBAR_TEST_IDS = {
  container: 'snackbar-container',
};

export const snackbarEventEmitter = new EventEmitter();

type ShowSnackbarParams = {
  message: string;
  duration?: number;
  type?: SnackbarType;
};

function show(params: ShowSnackbarParams) {
  snackbarEventEmitter.emit('show', params);
}
function hide() {
  snackbarEventEmitter.emit('hide');
}

export const GlobalSnackbar = {
  show,
  hide,
  LENGTH_SHORT: 2000,
  LENGTH_LONG: 4000,
};

function SnackbarManager() {
  const [message, setMessage] = useState<string | null>(null);
  const [duration, setDuration] = useState<number>(GlobalSnackbar.LENGTH_SHORT);
  const [type, setType] = useState<SnackbarType>('info');

  const handleHide = () => {
    setMessage(null);
  };

  const handleShow = (params: ShowSnackbarParams) => {
    setMessage(params.message);
    setDuration(params.duration || GlobalSnackbar.LENGTH_SHORT);
    setType(params.type || 'info');
  };

  useEffect(() => {
    snackbarEventEmitter.addListener('show', handleShow);
    snackbarEventEmitter.addListener('hide', handleHide);

    return () => {
      snackbarEventEmitter.removeAllListeners('show');
      snackbarEventEmitter.removeAllListeners('hide');
    };
  }, []);

  return <Snackbar onDismiss={handleHide} message={message} duration={duration} type={type} />;
}

export default SnackbarManager;
