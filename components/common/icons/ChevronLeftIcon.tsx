import { colors } from '@/constants/Colors';
import React from 'react';
import { Svg, Path } from 'react-native-svg';

const ChevronLeftIcon = () => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        d="M15 19L8 12L15 5"
        stroke={colors.v2.white}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default ChevronLeftIcon;
