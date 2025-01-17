import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './src/screens/SplashScreen';
import HomeScreen from './src/screens/HomeScreen';
import AddExpenseScreen from './src/screens/AddExpenseScreen';
import EditExpenseScreen from './src/screens/EditExpenseScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen 
          name="Splash" 
          component={SplashScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ title: 'Expense Tracker' }}
        />
        <Stack.Screen 
          name="AddExpense" 
          component={AddExpenseScreen}
          options={{ title: 'Add Expense' }}
        />
        <Stack.Screen 
          name="EditExpense" 
          component={EditExpenseScreen}
          options={{ title: 'Edit Expense' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}