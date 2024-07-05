import ThemedText from '@/components/common/ThemedText';
import ThemedView from '@/components/common/ThemedView';
import { BudgetModalManager } from '@/components/expenses/BudgetCard/BudgetModal';
import { colors } from '@/constants/Colors';
import useBudget from '@/hooks/services/budget/useBudget';
import useSetBudget from '@/hooks/services/budget/useSetBudget';
import useExpenses from '@/hooks/services/expense/useExpenses';
import { toLocaleCurrencyFormat } from '@/utils/currency/currency.utils';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { selectionAsync } from 'expo-haptics';
import React, { useMemo, useState } from 'react';
import { StyleSheet, TextInput, TextInputProps, TouchableOpacity } from 'react-native';

function BudgetCard() {
  const handlePress = () => {
    selectionAsync();
    BudgetModalManager.show();
  };
  const thisMonth = useMemo(() => new Date(), []);
  const [isEditable, setIsEditable] = useState(false);
  const { data: budget } = useBudget(thisMonth);
  const [inputBudget, setInputBudget] = useState(budget?.amount ?? 0);
  const { data: expenses } = useExpenses({ transactionDate: thisMonth, filterType: 'monthly' });
  const totalSpending = expenses?.reduce((total, expense) => total + expense.amount, 0) ?? 0;
  const toggleEdit = () => {
    setIsEditable(!isEditable);
  };

  const { mutate: setBudget } = useSetBudget();

  //TODO update budget and refactor
  const updateBudget = () => {
    setBudget(inputBudget);
    setIsEditable(!isEditable);
  };

  const handleOnChange: TextInputProps['onChangeText'] = value => {
    setInputBudget(parseInt(value));
  };

  return (
    <>
      <TouchableOpacity delayPressIn={400} onLongPress={handlePress} activeOpacity={0.6}>
        <ThemedView style={styles.container}>
          <ThemedText variant="body">Total spending</ThemedText>
          <ThemedView style={styles.budgetSection}>
            <ThemedView style={styles.budget}>
              <ThemedText variant="body">{toLocaleCurrencyFormat(totalSpending)} /</ThemedText>
              {isEditable ? (
                <TextInput
                  defaultValue={String(budget?.amount ?? 0)}
                  editable={isEditable}
                  onChangeText={handleOnChange}
                ></TextInput>
              ) : (
                <ThemedText variant="body">
                  {toLocaleCurrencyFormat(budget?.amount ?? 0)}
                </ThemedText>
              )}
            </ThemedView>
          </ThemedView>
          {isEditable ? (
            <TouchableOpacity style={styles.editButton} onPress={updateBudget}>
              <MaterialCommunityIcons name="content-save" size={28}></MaterialCommunityIcons>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.editButton} onPress={toggleEdit}>
              <MaterialCommunityIcons name="square-edit-outline" size={28}></MaterialCommunityIcons>
            </TouchableOpacity>
          )}
        </ThemedView>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 4,
    paddingVertical: 16,
    paddingHorizontal: 24,
    backgroundColor: colors.white,
    elevation: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.black,
    display: 'flex',
    flexDirection: 'column',
  },
  budgetSection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  budget: {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    alignItems: 'center',
  },
  editButton: {
    flexShrink: 1,
    alignItems: 'center',
  },
});

export default BudgetCard;
