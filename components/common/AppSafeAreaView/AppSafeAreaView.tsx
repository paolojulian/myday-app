import { colors } from '@/constants/Colors';
import { FC } from 'react';
import { Platform, StatusBar } from 'react-native';
import { SafeAreaView, SafeAreaViewProps } from 'react-native-safe-area-context';

type AppSafeAreaViewProps = SafeAreaViewProps & {
  statusBarColor?: string;
};

const AppSafeAreaView: FC<AppSafeAreaViewProps> = ({
  children,
  style,
  statusBarColor = colors.v2.black,
  ...props
}) => {
  return (
    <>
      <StatusBar backgroundColor={colors.v2.black} barStyle="light-content" />
      <SafeAreaView
        {...props}
        style={[
          {
            flex: 1,
            backgroundColor: statusBarColor,
            paddingTop: Platform.OS === 'android' ? 25 : 0,
            position: 'relative',
          },
          style,
        ]}
      >
        {children}
      </SafeAreaView>
    </>
  );
};

export default AppSafeAreaView;
