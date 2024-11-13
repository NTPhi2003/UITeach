import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';


export default function CourseScreen() {
  const [selected, setSelected] = useState('it'); // 'it' là giá trị mặc định
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Course Screen</Text>
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
