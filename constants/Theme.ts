import { colors } from '@/constants/Colors';
import { ThemeProvider } from '@react-navigation/native';
import { ComponentProps } from 'react';

const DefaultTheme: ComponentProps<typeof ThemeProvider>['value'] = {
  dark: false,
  colors: {
    primary: 'rgb(0, 122, 255)',
    background: colors.white,
    card: 'rgb(255, 255, 255)',
    text: 'rgb(28, 28, 30)',
    border: 'rgb(216, 216, 216)',
    notification: 'rgb(255, 59, 48)',
  },
};

export default DefaultTheme;
