import RefreshIcon from '@/components/common/icons/RefreshIcon';
import Row from '@/components/common/Row';
import Stack from '@/components/common/Stack';
import ThemedText from '@/components/common/ThemedText';
import { colors } from '@/constants/Colors';
import { FC, ReactNode } from 'react';
import { TouchableHighlight } from 'react-native';

type RecurringExpenseItemContainerProps = {
  onPress: () => void;
  children: ReactNode;
};
export const StyledTouchableContainer: FC<RecurringExpenseItemContainerProps> = ({
  onPress,
  children,
}) => (
  <TouchableHighlight
    style={{ borderRadius: 8 }}
    delayPressIn={400}
    onPress={onPress}
    activeOpacity={0.9}
  >
    <Stack
      style={{
        width: '100%',
        paddingVertical: 16,
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: colors.v2.black,
      }}
    >
      {children}
    </Stack>
  </TouchableHighlight>
);

export const StyledCategoryName: FC<{ categoryName: string | null }> = ({ categoryName }) =>
  !!categoryName && (
    <ThemedText variant="body-md" style={{ color: colors.v2.grayLight }}>
      {categoryName}
    </ThemedText>
  );

export const StyledRecurrenceType: FC<{ title: string }> = ({ title }) => (
  <Row style={{ gap: 4, alignItems: 'center' }}>
    <ThemedText
      variant="body-md"
      style={{ color: colors.v2.grayLight, textTransform: 'capitalize' }}
    >
      {title}
    </ThemedText>
    <RefreshIcon />
  </Row>
);

type StyledRecurrenceItemProps = {
  transactionDate: string;
  amount: string;
};
export const StyledRecurrenceItem: FC<StyledRecurrenceItemProps> = ({
  transactionDate,
  amount,
}) => (
  <Row style={{ justifyContent: 'space-between' }}>
    <ThemedText style={{ color: colors.v2.grayLight }}>{transactionDate}</ThemedText>
    <ThemedText style={{ color: colors.v2.teal }}>{amount}</ThemedText>
  </Row>
);

export const StyledTotalAmount: FC<{ amount: string }> = ({ amount }) => (
  <Stack style={{ marginTop: 16 }}>
    <Row style={{ justifyContent: 'space-between' }}>
      <ThemedText style={{ color: colors.v2.grayLight }}>Total</ThemedText>
      <ThemedText variant="header-md" style={{ color: colors.v2.teal }}>
        {amount}
      </ThemedText>
    </Row>
  </Stack>
);

export const StyledRecurredPaymentsContainer: FC<{ children: ReactNode }> = ({ children }) => (
  <Stack style={{ paddingLeft: 16 }}>{children}</Stack>
);
