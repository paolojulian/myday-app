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
          width: '180%',
          height: 518,
          borderBottomLeftRadius: 900,
          borderBottomRightRadius: 900,

          backgroundColor: colors.slateGrey[100],
          borderWidth: 1,
          borderColor: colors.slateGrey[200],
          position: 'absolute',
          top: -430,
        }}
      ></ThemedView>
      <ThemedView style={{ marginTop: 24 }}>
        <ThemedText variant="caps">MY DAY</ThemedText>
      </ThemedView>
    </Container>
  );
}

export default HomeHeader;
