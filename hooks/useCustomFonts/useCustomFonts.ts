import { useFonts } from 'expo-font';

export function useCustomFonts() {
  const [loaded] = useFonts({
    Barlow_CondensedBold: require('../../assets/fonts/Barlow_Condensed/BarlowCondensed-Bold.ttf'),
    PoppinsRegular: require('../../assets/fonts/Poppins/Poppins-Regular.ttf'),
    PoppinsMedium: require('../../assets/fonts/Poppins/Poppins-Medium.ttf'),
    PoppinsSemiBold: require('../../assets/fonts/Poppins/Poppins-SemiBold.ttf'),
    PoppinsBold: require('../../assets/fonts/Poppins/Poppins-Bold.ttf'),
  });

  return { loaded };
}
