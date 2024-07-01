import BentoCard from '@/components/common/BentoCard';
import ItemValueBentoCard from '@/components/common/BentoCard/ItemValueBentoCard';
import Container from '@/components/common/Container';
import Stack from '@/components/common/Stack';
import ThemedText from '@/components/common/ThemedText';
import ThemedView from '@/components/common/ThemedView';
import HomeHeader from '@/components/home/HomeHeader';
import { toLocaleCurrencyFormat } from '@/utils/currency/currency.utils';
import React, { Fragment } from 'react';
import { Image } from 'react-native';

function HomeWorkArea() {
  return (
    <Fragment>
      <HomeHeader />
      <Stack style={{ gap: 8 }}>
        <Container style={{ flexDirection: 'row', gap: 8 }}>
          <ItemValueBentoCard value={14} label="Friday" />
          <ItemValueBentoCard value={4} label="Tasks" />
          <ItemValueBentoCard
            value={<ThemedText variant="heading">40%</ThemedText>}
            label="Tasks"
          />
        </Container>
        <Container style={{ flexDirection: 'row', gap: 8 }}>
          <BentoCard>
            <Stack style={{ gap: 16, alignItems: 'center', justifyContent: 'flex-end' }}>
              <ThemedView style={{ marginTop: 16 }}>
                <Image source={require('../../assets/images/total-spent-today.png')} />
              </ThemedView>
              <Stack style={{ alignItems: 'center' }}>
                <ThemedText variant="heading">{toLocaleCurrencyFormat(17000)}</ThemedText>
                <ThemedText variant="body">Remaining Budget</ThemedText>
              </Stack>
            </Stack>
          </BentoCard>
          <BentoCard>
            <Stack style={{ gap: 16, alignItems: 'center', justifyContent: 'flex-end' }}>
              <ThemedView style={{ marginTop: 16 }}>
                <Image source={require('../../assets/images/total-spent-today.png')} />
              </ThemedView>
              <Stack style={{ alignItems: 'center' }}>
                <ThemedText variant="heading">{toLocaleCurrencyFormat(1200)}</ThemedText>
                <ThemedText variant="body">Total Spent Today</ThemedText>
              </Stack>
            </Stack>
          </BentoCard>
        </Container>
      </Stack>
    </Fragment>
  );
}

export default HomeWorkArea;
