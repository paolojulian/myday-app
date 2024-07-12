import BentoCard from '@/components/common/BentoCard';
import EditIcon from '@/components/common/icons/EditIcon';
import ThemedView from '@/components/common/ThemedView';
import React from 'react';

function EditBudgetCard() {
  return (
    <BentoCard style={{ flex: 0, aspectRatio: '1/1' }}>
      <ThemedView
        style={{
          gap: 16,
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
        }}
      >
        <EditIcon />
      </ThemedView>
    </BentoCard>
  );
}

export default EditBudgetCard;
