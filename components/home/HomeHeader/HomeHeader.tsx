import Container from '@/components/common/Container';
import ThemedText from '@/components/common/ThemedText';
import ThemedView from '@/components/common/ThemedView';
import { colors } from '@/constants/Colors';
import React from 'react';

function HomeHeader() {
  return (
    <Container
      style={{
        paddingVertical: 24,
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
          top: -420,
        }}
      ></ThemedView>
      <ThemedView style={{ marginTop: 24, alignItems: 'center' }}>
        <ThemedText variant="caps">MY DAY</ThemedText>
        <ThemedText variant="body">Friday, June 18, 2024</ThemedText>
      </ThemedView>
    </Container>
  );
}

export default HomeHeader;
