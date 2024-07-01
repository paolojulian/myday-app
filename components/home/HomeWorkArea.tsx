import ItemValueBentoCard from '@/components/common/BentoCard/ItemValueBentoCard';
import Container from '@/components/common/Container';
import ThemedText from '@/components/common/ThemedText';
import HomeHeader from '@/components/home/HomeHeader';
import React, { Fragment } from 'react';

function HomeWorkArea() {
  return (
    <Fragment>
      <HomeHeader />
      <Container style={{ flexDirection: 'row', gap: 8 }}>
        <ItemValueBentoCard value={14} label="Friday" />
        <ItemValueBentoCard value={4} label="Tasks" />
        <ItemValueBentoCard value={<ThemedText variant="heading">40%</ThemedText>} label="Tasks" />
      </Container>
    </Fragment>
  );
}

export default HomeWorkArea;
