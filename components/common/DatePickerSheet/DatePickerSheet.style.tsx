import { colors } from '@/constants/Colors';
import { FC, ReactNode } from 'react';
import { TouchableOpacity, View } from 'react-native';
import ConditionalRender from '../ConditionalRender';
import dayjs from 'dayjs';
import Stack from '../Stack';
import ThemedText from '../ThemedText';

type DatePickerSheetContainerProps = {
  onPress: () => void;
  children: ReactNode;
};
export const DatePickerSheetContainer: FC<DatePickerSheetContainerProps> = ({
  onPress,
  children,
}) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.6}>
      <View
        aria-label="DatePickerContainer"
        style={{
          flexDirection: 'row',
          alignSelf: 'stretch',
          alignItems: 'center',
          backgroundColor: colors.v2.grayDark,
          borderRadius: 12,
          gap: 16,
          paddingHorizontal: 24,
          height: 64,
          borderWidth: 1,
          borderColor: colors.v2.grayLight,
        }}
      >
        {children}
      </View>
    </TouchableOpacity>
  );
};

type DatePickerSheetValueProps = {
  value: Date | null;
  placeholder: string;
};
export const DatePickerSheetValue: FC<DatePickerSheetValueProps> = ({ value, placeholder }) => {
  return (
    <View
      aria-label="AppDatePicker TextField component"
      style={{
        flex: 1,
        position: 'relative',
        overflow: 'hidden',
        alignSelf: 'stretch',
        justifyContent: 'center',
      }}
    >
      <ConditionalRender
        shouldRender={!!value && dayjs(value).isValid()}
        component={
          <Stack style={{ gap: 4 }}>
            <ThemedText color={'lighter'} variant="body-md">
              {placeholder}
            </ThemedText>
            <ThemedText>{dayjs(value).format('MMM D, YYYY')}</ThemedText>
          </Stack>
        }
        fallbackComponent={<ThemedText color={'lighter'}>{placeholder}</ThemedText>}
      ></ConditionalRender>
    </View>
  );
};
