import HomeWorkArea from '@/components/home/HomeWorkArea';
import { colors } from '@/constants/Colors';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native';

export default function Home() {
  return (
    <>
      {/* ios */}
      <SafeAreaView style={{ flex: 0, backgroundColor: colors.slateGrey[100] }} />
      {/* android */}
      <StatusBar backgroundColor={colors.slateGrey[100]} />
      <HomeWorkArea />
    </>
  );
}
