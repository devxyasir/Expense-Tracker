import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { format } from 'date-fns';

function ExpenseList({ expenses, onEdit, onDelete }) {
  if (expenses.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          No expenses yet. Add your first expense!
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {expenses.map((expense) => (
        <View key={expense.id} style={styles.expenseItem}>
          <View style={styles.expenseDetails}>
            <Text style={styles.title}>{expense.title}</Text>
            <Text style={styles.date}>
              {format(new Date(expense.date), 'MMM dd, yyyy')}
            </Text>
            <Text style={styles.amount}>${expense.amount.toFixed(2)}</Text>
          </View>
          <View style={styles.actions}>
            <TouchableOpacity
              onPress={() => onEdit(expense)}
              style={[styles.button, styles.editButton]}
            >
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onDelete(expense.id)}
              style={[styles.button, styles.deleteButton]}
            >
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
  expenseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginBottom: 8,
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  expenseDetails: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  amount: {
    fontSize: 16,
    marginTop: 4,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    padding: 8,
    borderRadius: 4,
    marginLeft: 8,
  },
  editButton: {
    backgroundColor: '#e3f2fd',
  },
  deleteButton: {
    backgroundColor: '#ffebee',
  },
  editButtonText: {
    color: '#1976d2',
  },
  deleteButtonText: {
    color: '#d32f2f',
  },
});

export default ExpenseList;