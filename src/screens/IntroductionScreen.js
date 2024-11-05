import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, ScrollView, SafeAreaView, StatusBar, ImageBackground, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import HeaderBeforeLogin from '../components/HeaderBeforeLogin';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function IntroductionScreen() {
  const navigation = useNavigation();
  const usersPreviews = [
    {
      id: 1,
      name: 'Gia Minh',
      role: 'Sinh viên năm 2',
      avatar: require('../../assets/GiaMinh.png'),
      comment: '"UITeach đã giúp tôi học code hiệu quả hơn. Bên cạnh các bài giảng và bài tập phù hợp, UITeach còn xây dựng một cộng đồng những người học lập trình để chúng tôi có thể cùng học, cùng tiến bộ."'
    },
    {
      id: 2,
      name: 'Đăng Quang',
      role: 'Sinh viên năm 4',
      avatar: require('../../assets/DangQuang.png'),
      comment: '"Ban đầu tôi hoàn toàn không biết mình nên bắt đầu từ đâu khi bắt đầu học lập trình từ con số 0. UITeach đã giúp tôi vạch rõ lộ trình, khiến việc học của tôi dễ dàng hơn rất nhiều."'
    },
    {
      id: 3,
      name: 'Trung Vũ',
      role: 'Giảng viên IT',
      avatar: require('../../assets/TrungVu.png'),
      comment: '"Tôi thấy UITeach giúp ích rất nhiều trong việc học tập của sinh viên học IT. UITeach có những bài giảng chất lượng cùng các đề thi mẫu để các bạn sinh viên có thể đạt điểm tốt hơn rất nhiều."'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / (Dimensions.get('window').width - 32));
    setCurrentIndex(index);
  };

  const renderUserPreview = ({ item }) => (
    <View style={styles.userPreviewCard}>
      <Image 
        source={item.avatar}
        style={styles.userAvatar}
      />
      <Text style={styles.userName}>{item.name}</Text>
      <Text style={styles.userRole}>{item.role}</Text>
      <Text style={styles.userComment}>{item.comment}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="transparent" translucent barStyle="dark-content" />
      <HeaderBeforeLogin />
      <ScrollView style={styles.content}>
        {/* First Content */}
        <ImageBackground source={require('../../assets/background_in_space_2.png')} resizeMode="cover" style={styles.backgroundImage}>
        <View style={styles.firstContent}>
            
            
            
            <Text style={styles.title} numberOfLines={1} adjustsFontSizeToFit>Học Lập Trình</Text>
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
            <Text style={styles.sectionTitle}>Giới thiệu đôi nét{'\n'}về UITeach</Text>
            <Text style={styles.description}>
            UITeach là ứng dụng học tập dành với mục đích nhằm hỗ trợ các bạn sinh viên trong việc nắm vững kiến thức về IT và các môn đại cương liên quan thông qua các video chất lượng cao. Được thành lập bởi 4 sinh viên ĐH CNTT, UITeach cam kết mang đến cho học sinh một trải nghiệm học tập thú vị, hiệu quả và tương tác, giúp họ phát triển kỹ năng IT và nền tảng đại cương một cách tự tin và thành công.
            </Text>
        </View>


        {/* Third Content */}
        <View style={styles.thirdContent}>
          <Text style={styles.thirdTitle}>Học viên nói gì{'\n'}về UITeach ?</Text>
          <View style={styles.carouselContainer}>
            <FlatList
              data={usersPreviews}
              renderItem={renderUserPreview}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.id.toString()}
              onScroll={handleScroll}
              scrollEventThrottle={16}
            />
            
           
          </View>
           {/* Dot indicators */}
           <View style={styles.dotContainer}>
              {usersPreviews.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.dot,
                    currentIndex === index ? styles.dotActive : styles.dotInactive
                  ]}
                />
              ))}
            </View>
        </View>

        {/* Button */}
        <TouchableOpacity 
            style={styles.loginButton} 
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.buttonText}>BẮT ĐẦU HỌC THÔI !</Text>
        </TouchableOpacity>
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
    fontSize: 46,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 20,
    marginBottom: 8,
    fontFamily: 'SourceSans3-Bold',
    alignSelf: 'center',
    paddingTop: 40,
    textAlign: 'center',
    width: '100%',
    flexShrink: 1,
    flexWrap: 'nowrap',
  },
  subtitle: {
    fontSize: 25,
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
    fontSize: 14,
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
    fontSize: 13,
    // marginRight: 24,
    padding: 8,
    borderWidth: 1.5,
    borderColor: "#6F6F6F",
    borderRadius: 18,
    fontFamily: 'SourceSans3-Bold',
  },
  tagActive: {
    color: '#ffffff',
    fontSize: 13,
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
    fontSize: 26,
    fontWeight: 'bold',
    color: '#000',
    marginVertical: 24,
    alignSelf: 'center',
    textAlign: 'center',
  },
  thirdTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 0,
    alignSelf: 'center',
    textAlign: 'center',
    fontFamily: 'SourceSans3-Bold',
  },


  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 24,
    // textAlign: 'center',
    alignSelf: 'center',
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
    marginTop: 40,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    flex: 1,
  },

  thirdContent: {
    marginTop: 30,
    paddingTop: 20,
    backgroundColor: '#fff',
  },

  carouselContainer: {
    backgroundColor: '#EBF5FF',
    paddingVertical: 30,
    marginTop: 20,
    position: 'relative',
  },

  userPreviewCard: {
    width: Dimensions.get('window').width - 32,
    marginHorizontal: 16,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    // shadowColor: 'black',
    // shadowOffset: {
    //   width: 20,
    //   height: 0,
    // },
    // shadowOpacity: 0.6,
    // shadowRadius: 28,
    // elevation: 5,
    
    borderRightWidth: 1.5,
    borderBottomWidth: 1.5,
    borderColor: '#224DB8',
    paddingTop: 60,
    marginTop: 40,
    minHeight: 250,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },

  userAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    position: 'absolute',
    top: -40,
    alignSelf: 'center',
    borderWidth: 4,
    borderColor: '#fff',
    zIndex: 1,
  },

  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#224DB8',
    marginBottom: 4,
    fontFamily: 'SourceSans3-Bold',
  },

  userRole: {
    fontSize: 15,
    color: '#666',
    marginBottom: 16,
    marginTop: 8,
    fontFamily: 'SourceSans3-Regular',
  },

  userComment: {
    fontSize: 16,
    color: '#093D60',
    textAlign: 'center',
    lineHeight: 24,
    fontFamily: 'SourceSans3-Regular',
    marginHorizontal: 16,
  },

  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    gap: 8,
  },

  dot: {
    width: 12,
    height: 12,
    borderRadius: 9,

  },

  dotActive: {
    backgroundColor: '#007BFF',
  },

  dotInactive: {
    backgroundColor: '#D9D9D9',
  },

  loginButton: {
    width: '90%',
    height: 50,
    backgroundColor: '#007BFF',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 40,
    marginHorizontal: 20,
    
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    
  },
});

