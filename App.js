import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import firebase from './src/database/firebase';
import StackNavigator from './src/navigator/StackNavigator';

export default function App() {
  
  return (
    
        <StackNavigator></StackNavigator>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
