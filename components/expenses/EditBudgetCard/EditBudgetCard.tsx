import BentoCard from '@/components/common/BentoCard';
import EditIcon from '@/components/common/icons/EditIcon';
import ThemedView from '@/components/common/ThemedView';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { UpdateBudgetManager } from '../UpdateBudgetBottomSheet/UpdateBudgetBottomSheet';

function EditBudgetCard() {
  const handlePress = () => {
    UpdateBudgetManager.show();
  };

  return (
    <TouchableOpacity style={{ flex: 0 }} onPress={handlePress}>
      <BentoCard style={{ aspectRatio: '1/1' }}>
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
    </TouchableOpacity>
  );
}

export default EditBudgetCard;
