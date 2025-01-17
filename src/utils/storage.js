import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'expenses';

// Helper function to get expenses from storage
export const getExpenses = async () => {
  try {
    const expensesJson = await AsyncStorage.getItem(STORAGE_KEY);
    return expensesJson ? JSON.parse(expensesJson) : [];
  } catch (error) {
    console.error('Error getting expenses:', error);
    return [];
  }
};

// Helper function to save expenses to storage
const saveExpenses = async (expenses) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
  } catch (error) {
    console.error('Error saving expenses:', error);
    throw error;
  }
};

// Add a new expense
export const addExpense = async (expense) => {
  try {
    const expenses = await getExpenses();
    const newExpense = {
      ...expense,
      id: Date.now().toString(),
    };
    await saveExpenses([...expenses, newExpense]);
    return newExpense;
  } catch (error) {
    console.error('Error adding expense:', error);
    throw error;
  }
};

// Update an existing expense
export const updateExpense = async (updatedExpense) => {
  try {
    const expenses = await getExpenses();
    const updatedExpenses = expenses.map((expense) =>
      expense.id === updatedExpense.id ? updatedExpense : expense
    );
    await saveExpenses(updatedExpenses);
    return updatedExpense;
  } catch (error) {
    console.error('Error updating expense:', error);
    throw error;
  }
};

// Delete an expense
export const deleteExpense = async (id) => {
  try {
    const expenses = await getExpenses();
    const updatedExpenses = expenses.filter((expense) => expense.id !== id);
    await saveExpenses(updatedExpenses);
  } catch (error) {
    console.error('Error deleting expense:', error);
    throw error;
  }
};