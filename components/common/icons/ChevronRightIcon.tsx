import { colors } from '@/constants/Colors';
import React, { FC } from 'react';
import { Svg, Path } from 'react-native-svg';

type ChevronRightIconProps = {
  color?: string;
};

const ChevronRightIcon: FC<ChevronRightIconProps> = ({ color = colors.v2.white }) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" color={color} fill="none">
      <Path
        d="M9 5L16 12L9 19"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default ChevronRightIcon;
