import { useState, useEffect } from "react";
import useMutation from "../useMutation";
import { useSQLiteContext } from "expo-sqlite";


//TODO
const useCreateExpense = (expense: Expense) => {
  const db = useSQLiteContext();
  const { data, isLoading, error } = useMutation(mutate)

  async function mutate() {
    // const { whereString, values } = filtersToString(filters);
    const result = await db.runAsync('INSERT INTO Expense (amount, description) VALUES (?, ?)', expense.description, expense.amount);
    return result
  }

  return { data, isLoading, error };
};

export default useCreateExpense;
