import React from 'react';
import { View, StyleSheet } from 'react-native';
import ExpenseForm from '../components/ExpenseForm';
import { addExpense } from '../utils/storage';

function AddExpenseScreen({ navigation }) {
  const handleSave = async (expense) => {
    await addExpense(expense);
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <ExpenseForm onSave={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
});

export default AddExpenseScreen;