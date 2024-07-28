import Row from '@/components/common/Row';
import ThemedText from '@/components/common/ThemedText';
import { colors } from '@/constants/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FC, ReactNode } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export const RecurredPaymentModalContainer: FC<{ children: ReactNode }> = ({ children }) => (
  <SafeAreaView edges={['bottom']}>{children}</SafeAreaView>
);

type RecurredPaymentModalProps = {
  title: string;
};
export const RecurredPaymentModalHeader: FC<RecurredPaymentModalProps> = ({ title }) => (
  <Row style={{ justifyContent: 'center', alignItems: 'center' }}>
    <MaterialCommunityIcons
      style={{ pointerEvents: 'none', opacity: 0 }}
      name={'trash-can'}
      size={32}
      disabled={true}
    />
    <ThemedText style={{ flex: 1, textAlign: 'center' }} variant="body2">
      {title}
    </ThemedText>
    <MaterialCommunityIcons style={{ color: colors.danger }} name={'trash-can'} size={32} />
  </Row>
);
