import { ImageURISource } from 'react-native';
import { GlowingHeaderVariants } from '.';

export const VARIANT_ASSETS: Record<GlowingHeaderVariants, ImageURISource> = {
  red: require('../../../assets/images/glow-red.png'),
  teal: require('../../../assets/images/glow-teal.png'),
  yellow: require('@/assets/images/glow-yellow.png'),
  white: require('@/assets/images/glow-white.png'),
};
