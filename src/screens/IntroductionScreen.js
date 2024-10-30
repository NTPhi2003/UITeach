import React from 'react';
import { View, Text, StyleSheet, Image, TextInput, ScrollView, SafeAreaView, ImageBackground } from 'react-native';
import HeaderBeforeLogin from '../components/HeaderBeforeLogin';
import { Ionicons } from '@expo/vector-icons';

export default function IntroductionScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <HeaderBeforeLogin />
      <ScrollView style={styles.content}>
        {/* First Content */}
        <ImageBackground source={require('../../assets/background_in_space.png')} resizeMode="cover" style={styles.image}>
        <View style={styles.firstContent}>
            
            
            
            <Text style={styles.title}>Học Lập Trình</Text>
            <Text style={styles.subtitle}>{`Cùng app học tập số 1 \ncho sinh viên UIT`}</Text>
            
            <View style={styles.searchContainer}>
            <TextInput
                style={styles.searchInput}  
                placeholder="Tìm kiếm tài liệu, đề cương..."
                placeholderTextColor="#666"
            />
            <Ionicons name="search" size={24} color="#007BFF" style={styles.searchIcon} />
            </View>

            <View style={styles.tagsContainer}>
            <Text style={styles.tagActive}>Giới thiệu</Text>
            <Text style={styles.tag}>Thành tựu cương</Text>
            <Text style={styles.tag}>Blog</Text>
            </View>

            
            <Image 
                source={require('../../assets/animalBox.png')} 
                style={styles.animalImage}
                resizeMode="contain"
            />
            </View>
        </ImageBackground>

        {/* Second Content */}
        <View style={styles.secondContent}>
            <Image 
                source={require('../../assets/StudyPic.png')} 
                style={styles.studyImage}
                resizeMode="contain"
            />
            <Text style={styles.sectionTitle}>Giới thiệu đôi nét về UITeach</Text>
            <Text style={styles.description}>
            UITeach là một ứng dụng học tập được thiết kế với mục đích nhằm hỗ trợ các bạn sinh viên trong việc nâng cao kiến thức thông qua các video chất lượng cao. Được thành lập bởi các sinh viên UIT, UITeach mong muốn mang đến cho sinh viên một trải nghiệm học tập tuyệt vời và không ngừng cải thiện để trở thành một nền tảng học tập chuyên nghiệp cũng như một cách tự tin và thành công.
            </Text>
        </View>
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    // paddingHorizontal: 16,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 20,
    marginBottom: 8,
    fontFamily: 'SourceSans3-Bold',
    alignSelf: 'center',
    paddingTop: 40,
  },
  subtitle: {
    fontSize: 26,
    color: '#FFF4A3',
    marginBottom: 20,
    alignSelf: 'center',
    textAlign: 'center',
    fontFamily: 'SourceSans3-Bold',

  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 18,
    paddingHorizontal: 12,
    marginBottom: 20,
    height: 48,
    width: '90%',
    alignSelf: 'center',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    height: '100%',
  },
  searchIcon: {
    
    padding: 8,
  },
  tagsContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  tag: {
    color: '#666',
    fontSize: 16,
    marginRight: 24,
    paddingVertical: 8,
  },
  tagActive: {
    color: '#007BFF',
    fontSize: 16,
    marginRight: 24,
    paddingVertical: 8,
    borderBottomWidth: 2,
    borderBottomColor: '#007BFF',
  },
  illustrationContainer: {
    width: '100%',
    height: 400,
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    marginBottom: 24,
    position: 'relative',
    overflow: 'hidden',
  },
  animalImage: {
    width: 200,
    height: 200,
    // position: 'absolute',
    // top: '30%',
    // left: '50%',
    // transform: [{translateX: -100}],
  },
  studyImage: {
    width: '100%',
    height: 200,
    
    // position: 'absolute',
    // bottom: 0,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 24,
  },
  firstContent: {
    paddingHorizontal: 16,
  },
  secondContent: {
    paddingHorizontal: 16,
  }
});

