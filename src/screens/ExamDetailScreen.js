import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import BackButton from '../components/BackButton';

export default function ExamDetailScreen({ route }) {
    const navigation = useNavigation();

    // Lấy dữ liệu từ params
    const { examData } = route.params || {};

    return (
      <SafeAreaProvider>
          <SafeAreaView style={styles.container}>
          <BackButton onPress={() => navigation.navigate('ExamMain')}/>
          <Text style={styles.headerTitle}>{examData?.title || 'Thư viện đề thi'}</Text>
          <ScrollView style={styles.scrollView}>
            {
              examData?.imageTest?.map((image, index) => (
                <Image source={image} key={index} style={styles.image} />
              ))
            }
          </ScrollView>
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
    scrollView: {
      // flex: 1,
    },
    image: {
      width: '100%',
      height: undefined,
      aspectRatio: 0.85,
      marginVertical: 10,
      resizeMode: "contain"
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#2282FE',
      marginVertical: 20,
      marginHorizontal: 20,
      marginTop: 30,
      textAlign: 'center'
    },
  });
  