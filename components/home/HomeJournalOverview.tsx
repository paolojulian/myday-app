import { TabName } from '@/app/(tabs)/_layout';
import { colors } from '@/constants/Colors';
import { useJournal } from '@/hooks/services/journal/useJournal';
import { router } from 'expo-router';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import AppCard from '../common/AppCard';
import JournalIcon from '../common/icons/JournalIcon';
import Stack from '../common/Stack';
import ThemedText from '../common/ThemedText';

const today = new Date();
function HomeJournalOverview() {
  const { data } = useJournal(today);

  const hasJournalToday: boolean = !!data?.id;

  const handlePress = () => {
    router.push(TabName.Journal);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <AppCard style={{ backgroundColor: colors.v2.red, height: 197 }}>
        <Stack style={{ justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <View style={{ marginBottom: 16 }}>
            <JournalIcon />
          </View>

          <ThemedText variant="title-sm" color="inverted" style={{ textAlign: 'center' }}>
            {hasJournalToday ? 'Update your journal for today' : 'Add a journal today'}
          </ThemedText>
        </Stack>
      </AppCard>
    </TouchableOpacity>
  );
}

export default HomeJournalOverview;
