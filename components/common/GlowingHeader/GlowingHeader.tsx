import { Image, View } from 'react-native';
import { VARIANT_ASSETS } from './GlowingHeader.constants';

export type Variants = 'teal' | 'yellow' | 'red' | 'white';

type GlowingHeaderProps = {
  variant: Variants;
};

function GlowingHeader({ variant }: GlowingHeaderProps) {
  const source = VARIANT_ASSETS[variant];

  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        pointerEvents: 'none',
      }}
    >
      <Image source={source as any} resizeMode="contain" />
    </View>
  );
}

export default GlowingHeader;
