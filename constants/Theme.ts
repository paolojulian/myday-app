import { colors } from '@/constants/Colors';
import { ThemeProvider } from '@react-navigation/native';
import { ComponentProps } from 'react';

const DefaultTheme: ComponentProps<typeof ThemeProvider>['value'] = {
  dark: true,
  colors: {
    primary: 'rgb(0, 122, 255)',
    background: colors.v2.black,
    card: 'rgb(255, 255, 255)',
    text: colors.v2.white,
    border: colors.v2.grayDark,
    notification: 'rgb(255, 59, 48)',
  },
};

export default DefaultTheme;
