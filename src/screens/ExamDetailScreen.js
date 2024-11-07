import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity,SafeAreaProvider,SafeAreaView } from 'react-native';
import {tempExams} from '../data/Exams';
import BackButton from '../components/BackButton';

export default function ExamDetailScreen() {


    return (
      <SafeAreaProvider>
          <SafeAreaView style={styles.container}>
          <BackButton></BackButton>

          </SafeAreaView>
        </SafeAreaProvider>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: '#fff',
      marginTop: 30,
    },
  });
  