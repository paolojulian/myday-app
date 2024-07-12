import Container from '@/components/common/Container';
import ThemedText from '@/components/common/ThemedText';
import ThemedView from '@/components/common/ThemedView';
import { colors } from '@/constants/Colors';
import dayjs from 'dayjs';
import React, { useMemo } from 'react';

function HomeHeader() {
  const formattedDateToday = useMemo(() => dayjs().format('dddd, MMMM D, YYYY'), []);

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
          top: -440,
        }}
      ></ThemedView>
      <ThemedView style={{ marginTop: 24, alignItems: 'center' }}>
        <ThemedText variant="caps">MY DAY</ThemedText>
        <ThemedText variant="body">{formattedDateToday}</ThemedText>
      </ThemedView>
    </Container>
  );
}

export default HomeHeader;
