import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';

function ExpenseForm({ initialValues, onSave }) {
  const [title, setTitle] = useState(initialValues?.title || '');
  const [amount, setAmount] = useState(initialValues?.amount?.toString() || '');
  const [date, setDate] = useState(initialValues?.date || new Date().toISOString().split('T')[0]);

  const validate = () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Title is required');
      return false;
    }

    if (!amount.trim()) {
      Alert.alert('Error', 'Amount is required');
      return false;
    }

    const numAmount = Number(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      Alert.alert('Error', 'Amount must be a positive number');
      return false;
    }

    if (!date.trim()) {
      Alert.alert('Error', 'Date is required');
      return false;
    }

    return true;
  };

  const handleSubmit = () => {
    if (validate()) {
      onSave({
        title: title.trim(),
        amount: Number(amount),
        date,
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Enter expense title"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Amount</Text>
        <TextInput
          style={styles.input}
          value={amount}
          onChangeText={setAmount}
          placeholder="Enter amount"
          keyboardType="decimal-pad"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Date</Text>
        <TextInput
          style={styles.input}
          value={date}
          onChangeText={setDate}
          placeholder="YYYY-MM-DD"
        />
      </View>

      <TouchableOpacity
        style={styles.saveButton}
        onPress={handleSubmit}
      >
        <Text style={styles.saveButtonText}>Save Expense</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#65adf1',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ExpenseForm;