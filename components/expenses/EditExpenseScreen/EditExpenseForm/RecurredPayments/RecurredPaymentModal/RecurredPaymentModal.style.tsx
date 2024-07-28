import { FC, ReactNode } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export const RecurredPaymentModalContainer: FC<{ children: ReactNode }> = ({ children }) => (
  <SafeAreaView edges={['bottom']} style={{ flex: 1 }}>
    {children}
  </SafeAreaView>
);
