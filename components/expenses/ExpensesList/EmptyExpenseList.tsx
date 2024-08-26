import Container from '@/components/common/Container';
import ThemedText from '@/components/common/ThemedText';
import ThemedView from '@/components/common/ThemedView';
import { colors } from '@/constants/Colors';
import React from 'react';
import { Image } from 'react-native';

function EmptyExpenseList() {
  return (
    <Container>
      <ThemedView
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 24,
          paddingVertical: 24,
        }}
      >
        <Image
          style={{
            height: 138,
            width: 142,
          }}
          source={require('@/assets/images/no-recent-transactions.png')}
        />
        <ThemedText variant="body-md" style={{ color: colors.v2.grayLight }}>
          No expenses
        </ThemedText>
      </ThemedView>
    </Container>
  );
}

export default EmptyExpenseList;
