import { colors } from '@/constants/Colors';
import { FC } from 'react';
import { Platform } from 'react-native';
import { SafeAreaView, SafeAreaViewProps } from 'react-native-safe-area-context';

type AppSafeAreaViewProps = SafeAreaViewProps & {
  statusBarColor?: string;
};

const AppSafeAreaView: FC<AppSafeAreaViewProps> = ({
  style,
  statusBarColor = colors.v2.black,
  ...props
}) => {
  return (
    <SafeAreaView
      {...props}
      style={[
        {
          flex: 1,
          backgroundColor: statusBarColor,
          paddingTop: Platform.OS === 'android' ? 25 : 0,
        },
        style,
      ]}
    />
  );
};

export default AppSafeAreaView;
