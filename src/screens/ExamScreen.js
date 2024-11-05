import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ExamScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Exam Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    color: '#333',
  }
});