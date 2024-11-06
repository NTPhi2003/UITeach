import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity,SafeAreaProvider,SafeAreaView, Dimensions, FlatList } from 'react-native';
import CourseCard from '../components/CourseCard';
import tempExams from '../data/Exams';

export default function ExamScreen() {

  const renderExam = ({ item }) => (
    <CourseCard
      title={item.title}
      description={item.description || ""}
      duration={item.duration}
      image={item.image}
    />
  );

  return (
    <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          {/* Header */}

          <View style={styles.header}>
            
            <Text style={styles.headerTitle}>Thư viện đề thi</Text>
          </View>
  
          
  
          {/* Exams List */}
          <View style={styles.ExamsList}>
            <FlatList
              data={tempExams}
              renderItem={renderExam}
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.id.toString()}
            />
          </View>
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
