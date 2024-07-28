import ChevronLeftIcon from '@/components/common/icons/ChevronLeftIcon';
import ChevronRightIcon from '@/components/common/icons/ChevronRightIcon';
import Row from '@/components/common/Row';
import ThemedText from '@/components/common/ThemedText';
import ThemedView from '@/components/common/ThemedView';
import { colors } from '@/constants/Colors';
import { toLocaleCurrencyFormat } from '@/utils/currency/currency.utils';
import { convertEpochToDate } from '@/utils/date/date.utils';
import dayjs from 'dayjs';
import { FC } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

type RecurredPaymentsHeaderProps = {
  onPrevMonthPress: () => void;
  onNextMonthPress: () => void;
  shouldDisableNextMonth: boolean;
  selectedMonth: Date;
};
export const RecurredPaymentsHeader: FC<RecurredPaymentsHeaderProps> = ({
  onNextMonthPress,
  onPrevMonthPress,
  selectedMonth,
  shouldDisableNextMonth,
}) => (
  <Row style={{ justifyContent: 'space-between' }}>
    <ThemedText variant="body2">Recurred Payments</ThemedText>
    <Row style={{ alignItems: 'center', gap: 8 }}>
      <TouchableOpacity onPress={onPrevMonthPress}>
        <ChevronLeftIcon />
      </TouchableOpacity>
      <ThemedText variant="body2">{dayjs(selectedMonth).format('MMM')}</ThemedText>
      <TouchableOpacity
        style={{
          opacity: shouldDisableNextMonth ? 0.25 : 1,
        }}
        onPress={onNextMonthPress}
        disabled={shouldDisableNextMonth}
      >
        <ChevronRightIcon />
      </TouchableOpacity>
    </Row>
  </Row>
);

type RecurredPaymentsItemProps = {
  onPress: () => void;
  transactionDate_epoch: number;
  amount: number;
};
export const RecurredPaymentsItem: FC<RecurredPaymentsItemProps> = ({
  onPress,
  amount,
  transactionDate_epoch,
}) => (
  <TouchableOpacity onPress={onPress}>
    <ThemedView
      style={{
        borderWidth: 1,
        borderColor: colors.slateGrey[200],
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
      }}
    >
      <ThemedText style={{ color: colors.darkGrey }}>
        {convertEpochToDate(transactionDate_epoch).format('D MMM YYYY')}
      </ThemedText>
      <ThemedText style={{ color: colors.red }}>-{toLocaleCurrencyFormat(amount)}</ThemedText>
    </ThemedView>
  </TouchableOpacity>
);
