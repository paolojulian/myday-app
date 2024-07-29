import React from 'react';
import {
  StyledSnacbarContainer,
  StyledSnackbarCard,
  StyledSnackbarMessage,
} from './Snackbar.style';

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
  return (
    <StyledSnacbarContainer onExitAnimation={onDismiss} duration_ms={duration} isOpen={!!message}>
      <StyledSnackbarCard variant={type}>
        <StyledSnackbarMessage message={message} variant={type} />
        {RightComponent}
      </StyledSnackbarCard>
    </StyledSnacbarContainer>
  );
}

export default Snackbar;
