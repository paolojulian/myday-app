import React from 'react';
import { Image } from 'react-native';
import { VARIANT_ASSETS } from './GlowingHeader.constants';

export type Variants = 'teal' | 'yellow' | 'red' | 'white';

type GlowingHeaderProps = {
  variant: Variants;
};

function GlowingHeader({ variant }: GlowingHeaderProps) {
  const source = VARIANT_ASSETS[variant];

  return (
    <Image
      source={source as any}
      style={{ position: 'absolute', top: -16, left: 0, right: 0, zIndex: 100 }}
      resizeMode="contain"
    />
  );
}

export default GlowingHeader;
