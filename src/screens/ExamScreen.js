import React, {useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Dimensions, FlatList, StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import CourseCard from '../components/CourseCard';
import {tempExams} from '../data/Exams';
import { useNavigation } from '@react-navigation/native';

export default function ExamScreen() {
  const [selected, setSelected] = useState('all'); // 'all' là giá trị mặc định
  const navigation = useNavigation();
  const filteredExams = () => {
    if (selected === 'math') {
      return tempExams.filter(exam => exam.courseId === 2);
    } else if (selected === 'IT') {
      return tempExams.filter(exam => exam.courseId === 1);
    }
    return tempExams; // Trả về tất cả nếu selected là 'all'
  };

  const handlePress = (value) => {
    setSelected(value);
  };
  const renderExam = ({ item }) => (
    <CourseCard
      title={item.title}
      description={item.description || ""}
      duration={item.duration}
      image={item.image}
      examData={item}
      onPress={() => navigation.navigate("ExamDetail", { examData: item })}

    />
  );


  return (
    <SafeAreaProvider>
      <StatusBar backgroundColor="transparent" translucent barStyle="dark-content" />
        <SafeAreaView style={styles.container}>
          {/* Header */}
          <View style={styles.header}>  
            <Text style={styles.headerTitle}>Thư viện đề thi</Text>
            <View style={styles.buttons}>
              <TouchableOpacity
                style={[styles.button, selected === 'all' && styles.selectedButton]}
                onPress={() => handlePress('all')}
              >
                <Text style={[styles.buttonText, selected === 'all' && styles.selectedText]}>Tất cả</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, selected === 'math' && styles.selectedButton]}
                onPress={() => handlePress('math')}
              >
                <Text style={[styles.buttonText, selected === 'math' && styles.selectedText]}>Toán đại cương</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, selected === 'IT' && styles.selectedButton]}
                onPress={() => handlePress('IT')}
              >
                <Text style={[styles.buttonText, selected === 'IT' && styles.selectedText]}>Cơ sở ngành</Text>
              </TouchableOpacity>
            </View>
          </View>

        
          {/* Exams List */}
          <View style={styles.ExamsList}>
            <FlatList
              data={filteredExams()}
              renderItem={renderExam}
              keyExtractor={item => item.id.toString()}
              showsVerticalScrollIndicator={false}
              style={styles.flatList}
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
  ExamsList: {
    flex: 1,
    paddingVertical: 20,
    position: 'relative',
  },
  header: {
    flexDirection: 'collum',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    marginTop: 35,
    
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2282FE',
    marginBottom: 20,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 16,
  },
  button: {
    padding: 10,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: 'white',
  },
  selectedButton: {
    backgroundColor: '#2282FE', // Màu xanh khi được chọn
  },
  buttonText: {
    fontSize: 16,
    color: 'black',
  },
  selectedText: {
    color: 'white', // Màu chữ trắng khi được chọn
  },
  flatList: {
    
  }
});
