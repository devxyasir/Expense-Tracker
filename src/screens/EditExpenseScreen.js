import React from 'react';
import { View, StyleSheet } from 'react-native';
import ExpenseForm from '../components/ExpenseForm';
import { updateExpense } from '../utils/storage';

function EditExpenseScreen({ navigation, route }) {
  const { expense } = route.params;

  const handleSave = async (updatedExpense) => {
    await updateExpense({ ...updatedExpense, id: expense.id });
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <ExpenseForm initialValues={expense} onSave={handleSave} />
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

export default EditExpenseScreen;