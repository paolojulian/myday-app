import ThemedText from '@/components/common/ThemedText';
import ThemedView from '@/components/common/ThemedView';
import { colors } from '@/constants/Colors';
import React from 'react';
import { Image } from 'react-native';

function EmptyRecentTransactions() {
  return (
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
          height: 168,
          width: 172,
        }}
        source={require('../../../assets/images/no-recent-transactions.png')}
      />
      <ThemedText variant="body1" style={{ color: colors.slateGrey[500] }}>
        No recent transactions
      </ThemedText>
    </ThemedView>
  );
}

export default EmptyRecentTransactions;
