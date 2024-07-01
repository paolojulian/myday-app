import BentoCard from '@/components/common/BentoCard/BentoCard';
import Stack from '@/components/common/Stack';
import ThemedText from '@/components/common/ThemedText';
import React, { ReactElement } from 'react';

type ItemValueBentoCardProps = {
  value: string | number | ReactElement;
  label: string | number | ReactElement;
};

function ItemValueBentoCard({ value, label }: ItemValueBentoCardProps) {
  const ValueComponent =
    typeof value === 'number' ? <ThemedText variant="large">{value}</ThemedText> : value;
  const LabelComponent =
    typeof label === 'string' ? <ThemedText variant="body">{label}</ThemedText> : label;
  return (
    <BentoCard>
      <Stack style={{ aspectRatio: '1/1', alignItems: 'center', justifyContent: 'space-between' }}>
        {ValueComponent}
        {LabelComponent}
      </Stack>
    </BentoCard>
  );
}

export default ItemValueBentoCard;
