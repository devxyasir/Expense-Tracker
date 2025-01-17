import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import ExpenseList from '../components/ExpenseList';
import { getExpenses, deleteExpense } from '../utils/storage';

function HomeScreen({ navigation }) {
  const [expenses, setExpenses] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadExpenses();
    });

    return unsubscribe;
  }, [navigation]);

  const loadExpenses = async () => {
    try {
      const loadedExpenses = await getExpenses();
      setExpenses(loadedExpenses);
      calculateTotal(loadedExpenses);
    } catch (error) {
      Alert.alert('Error', 'Failed to load expenses');
    }
  };

  const calculateTotal = (expenseList) => {
    const sum = expenseList.reduce((acc, curr) => acc + curr.amount, 0);
    setTotal(sum);
  };

  const handleDelete = async (id) => {
    Alert.alert(
      'Delete Expense',
      'Are you sure you want to delete this expense?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteExpense(id);
              await loadExpenses();
            } catch (error) {
              Alert.alert('Error', 'Failed to delete expense');
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Total Expenses:</Text>
        <Text style={styles.totalAmount}>${total.toFixed(2)}</Text>
      </View>
      
      <ExpenseList 
        expenses={expenses}
        onEdit={(expense) => navigation.navigate('EditExpense', { expense })}
        onDelete={handleDelete}
      />
      
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddExpense')}
      >
        <Text style={styles.addButtonText}>Add New Expense</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  header: {
    alignItems: 'center',
    marginBottom: 16,
  },
  headerText: {
    fontSize: 18,
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#65adf1',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;