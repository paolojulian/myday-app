import Container from '@/components/common/Container';
import ThemedText from '@/components/common/ThemedText';
import ThemedView from '@/components/common/ThemedView';
import { colors } from '@/constants/Colors';
import React from 'react';

function HomeHeader() {
  return (
    <Container
      style={{
        paddingVertical: 16,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
      }}
    >
      <ThemedView
        style={{
          width: '110%',
          height: 218,
          borderRadius: 800,

          backgroundColor: colors.slateGrey[100],
          position: 'absolute',
          top: -160,
        }}
      ></ThemedView>
      <ThemedView>
        <ThemedText variant="caps">MY DAY</ThemedText>
      </ThemedView>
    </Container>
  );
}

export default HomeHeader;
