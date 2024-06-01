import DatePickerNumber from '@/components/common/forms/DatePicker/DatePickerNumber';
import ThemedText from '@/components/common/ThemedText';
import ThemedView from '@/components/common/ThemedView';
import { colors } from '@/constants/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet } from 'react-native';

type DatePickerVariants = 'shadow' | 'border';

type DatePickerProps = {
  variant?: DatePickerVariants;
};

function DatePicker({ variant = 'border' }: DatePickerProps) {
  return (
    <ThemedView
      style={[
        styles.container,
        {
          ...(variant === 'shadow' && styles.containerShadow),
          ...(variant === 'border' && styles.containerBorder),
        },
      ]}
    >
      <ThemedView style={styles.header}>
        <ThemedText style={{ color: colors.black }}>March 2024</ThemedText>
        <ThemedView style={styles.monthNavigation}>
          <MaterialCommunityIcons size={24} name="chevron-left" color={colors.black} />
          <MaterialCommunityIcons size={24} name="chevron-right" color={colors.black} />
        </ThemedView>
      </ThemedView>
      <ThemedView style={styles.body}>
        <ThemedView style={styles.weekNames}>
          <DatePickerNumber value="Sun" isActive={false} isToday={false} />
          <DatePickerNumber value="Mon" isActive={false} isToday={false} />
          <DatePickerNumber value="Tue" isActive={false} isToday={false} />
          <DatePickerNumber value="Wed" isActive={false} isToday={false} />
          <DatePickerNumber value="Thu" isActive={false} isToday={false} />
          <DatePickerNumber value="Fri" isActive={false} isToday={false} />
          <DatePickerNumber value="Sat" isActive={false} isToday={false} />
        </ThemedView>
        <ThemedView style={styles.weekNames}>
          <DatePickerNumber value={31} isActive={false} isToday={false} isNotCurrentMonth />
          <DatePickerNumber value={1} isActive={false} isToday={false} />
          <DatePickerNumber value={2} isActive={false} isToday={false} />
          <DatePickerNumber value={3} isActive={false} isToday />
          <DatePickerNumber value={4} isActive isToday={false} />
          <DatePickerNumber value={5} isActive={false} isToday={false} />
          <DatePickerNumber value={6} isActive={false} isToday={false} />
        </ThemedView>
        <ThemedView style={styles.weekNames}>
          <DatePickerNumber value={7} isActive={false} isToday={false} />
          <DatePickerNumber value={8} isActive={false} isToday={false} />
          <DatePickerNumber value={9} isActive={false} isToday={false} />
          <DatePickerNumber value={10} isActive={false} isToday={false} />
          <DatePickerNumber value={11} isActive={false} isToday={false} />
          <DatePickerNumber value={12} isActive={false} isToday={false} />
          <DatePickerNumber value={13} isActive={false} isToday={false} />
        </ThemedView>
        <ThemedView style={styles.weekNames}>
          <DatePickerNumber value={14} isActive={false} isToday={false} />
          <DatePickerNumber value={15} isActive={false} isToday={false} />
          <DatePickerNumber value={16} isActive={false} isToday={false} />
          <DatePickerNumber value={17} isActive={false} isToday={false} />
          <DatePickerNumber value={18} isActive={false} isToday={false} />
          <DatePickerNumber value={19} isActive={false} isToday={false} />
          <DatePickerNumber value={20} isActive={false} isToday={false} />
        </ThemedView>
        <ThemedView style={styles.weekNames}>
          <DatePickerNumber value={21} isActive={false} isToday={false} />
          <DatePickerNumber value={22} isActive={false} isToday={false} />
          <DatePickerNumber value={23} isActive={false} isToday={false} />
          <DatePickerNumber value={24} isActive={false} isToday={false} />
          <DatePickerNumber value={25} isActive={false} isToday={false} />
          <DatePickerNumber value={26} isActive={false} isToday={false} />
          <DatePickerNumber value={27} isActive={false} isToday={false} />
        </ThemedView>
        <ThemedView style={styles.weekNames}>
          <DatePickerNumber value={28} isActive={false} isToday={false} />
          <DatePickerNumber value={29} isActive={false} isToday={false} />
          <DatePickerNumber value={30} isActive={false} isToday={false} />
          <DatePickerNumber value={1} isActive={false} isToday={false} isNotCurrentMonth />
          <DatePickerNumber value={2} isActive={false} isToday={false} isNotCurrentMonth />
          <DatePickerNumber value={3} isActive={false} isToday={false} isNotCurrentMonth />
          <DatePickerNumber value={4} isActive={false} isToday={false} isNotCurrentMonth />
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {},
  containerShadow: {
    shadowColor: colors.black,
    shadowOpacity: 0.24,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 5,
  },
  containerBorder: {
    borderWidth: 2,
    borderRadius: 12,
    borderColor: colors.whiteSmoke,
  },
  header: {
    borderTopStartRadius: 12,
    borderTopEndRadius: 12,
    backgroundColor: colors.whiteSmoke,
    paddingVertical: 16,
    paddingHorizontal: 24,

    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  monthNavigation: {
    display: 'flex',
    flexDirection: 'row',
  },
  body: {
    borderBottomStartRadius: 12,
    borderBottomEndRadius: 12,
    backgroundColor: colors.white,
    padding: 16,
    gap: 8,
  },
  weekNames: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default DatePicker;
