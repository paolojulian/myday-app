import { colors } from '@/constants/Colors';
import React, { FC } from 'react';
import { Svg, Path } from 'react-native-svg';

type ChevronLeftIconProps = {
  color?: string;
};
const ChevronLeftIcon: FC<ChevronLeftIconProps> = ({ color = colors.v2.white }) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" color={color}>
      <Path
        d="M15 19L8 12L15 5"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default ChevronLeftIcon;
