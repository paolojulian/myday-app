import { colors } from '@/constants/Colors';
import React from 'react';
import { Svg, Path } from 'react-native-svg';

const ChevronRightIcon = () => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        d="M9 5L16 12L9 19"
        stroke={colors.v2.white}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default ChevronRightIcon;
