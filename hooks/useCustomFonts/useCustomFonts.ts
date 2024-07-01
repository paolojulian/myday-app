import { useFonts } from 'expo-font';

export function useCustomFonts() {
  const [loaded] = useFonts({
    Barlow_CondensedBold: require('../../assets/fonts/Barlow_Condensed/BarlowCondensed-Bold.ttf'),
    Open_SansRegular: require('../../assets/fonts/Open_Sans/static/OpenSans-Regular.ttf'),
    Open_SansMedium: require('../../assets/fonts/Open_Sans/static/OpenSans-Medium.ttf'),
    Open_SansSemiBold: require('../../assets/fonts/Open_Sans/static/OpenSans-SemiBold.ttf'),
    Open_SansBold: require('../../assets/fonts/Open_Sans/static/OpenSans-Bold.ttf'),
    PoppinsRegular: require('../../assets/fonts/Poppins/Poppins-Regular.ttf'),
    PoppinsMedium: require('../../assets/fonts/Poppins/Poppins-Medium.ttf'),
    PoppinsSemiBold: require('../../assets/fonts/Poppins/Poppins-SemiBold.ttf'),
    PoppinsBold: require('../../assets/fonts/Poppins/Poppins-Bold.ttf'),
  });

  return { loaded };
}
