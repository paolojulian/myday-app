import HomeWorkArea from '@/components/home/HomeWorkArea';
import { colors } from '@/constants/Colors';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StatusBar as RNStatusBar } from 'react-native';

export default function Home() {
  return (
    <>
      {/* android */}
      <StatusBar backgroundColor={colors.v2.black} style="light" />
      {/* ios */}
      <SafeAreaView style={{ flex: 0, backgroundColor: colors.v2.black }} />
      <RNStatusBar backgroundColor={colors.v2.black} barStyle="light-content" />
      <HomeWorkArea />
    </>
  );
}
