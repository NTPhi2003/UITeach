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
        <ImageBackground source={require('../../assets/background_in_space_2.png')} resizeMode="cover" style={styles.backgroundImage}>
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
              <Text style={styles.tag}>Toán đại cương</Text>
              <Text style={styles.tag}>Blogs</Text>
              <Text style={styles.tag}>Đề thi các môn</Text>
              <Text style={styles.tag}>Lập trình cơ bản</Text>
            </View>

            <View style={styles.animalImgContainer}>
              <Image 
                  source={require('../../assets/Ellipse.png')} 
                  style={styles.ellipseImage}
                  resizeMode="contain"
              />
              
              <Image 
                  source={require('../../assets/animalBox.png')} 
                  style={styles.animalImage}
                  resizeMode="contain"
              />

              <Image 
                source={require('../../assets/Polygon.png')} 
                style={styles.polygonImage}
                resizeMode="contain"
              />
            </View>
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
            UITeach là ứng dụng học tập dành với mục đích nhằm hỗ trợ các bạn sinh viên trong việc nắm vững kiến thức về IT và các môn đại cương liên quan thông qua các video chất lượng cao. Được thành lập bởi 4 sinh viên ĐH CNTT, UITeach cam kết mang đến cho học sinh một trải nghiệm học tập thú vị, hiệu quả và tương tác, giúp họ phát triển kỹ năng IT và nền tảng đại cương một cách tự tin và thành công.
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
    borderRadius: 25,
    paddingRight: 16,
    paddingLeft: 24,
    marginBottom: 20,
    height: 52,
    width: '95%',
    alignSelf: 'center',
    
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    height: '100%',
    fontFamily: 'SourceSans3-Bold',
  },
  searchIcon: {
    padding: 8,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 10,
    marginTop: 20,
    marginBottom: 30,
    gap: 10,
    justifyContent: 'center'
  },
  tag: {
    color: '#6F6F6F',
    fontSize: 16,
    // marginRight: 24,
    padding: 8,
    borderWidth: 1.5,
    borderColor: "#6F6F6F",
    borderRadius: 18,
    fontFamily: 'SourceSans3-Bold',
  },
  tagActive: {
    color: '#ffffff',
    fontSize: 16,
    // marginRight: 18,
    padding: 8,
    borderWidth: 1.5,
    borderRadius: 18,
    borderColor: '#007BFF',
    fontFamily: 'SourceSans3-Bold',
    backgroundColor: '#007BFF',
    overflow: 'hidden',
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
  animalImgContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    gap: 25,
  },  
  firstContent: {
    paddingHorizontal: 16,
    flex: 1,
  },
  backgroundImage: {
    width: '100%',
    minHeight: 600,
  },

  secondContent: {
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    flex: 1,
  },
});

