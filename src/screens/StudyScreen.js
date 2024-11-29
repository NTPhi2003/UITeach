import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, StatusBar, Alert, Modal } from 'react-native';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import BackButton from '../components/BackButton';
import YoutubePlayer from 'react-native-youtube-iframe';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function StudyScreen({ route }) {
    const { subjectData } = route.params;
    const [currentVideoId, setCurrentVideoId] = useState(subjectData.lessons[0].datas[0].videoId);
    const insets = useSafeAreaInsets();
    const [showCompletionModal, setShowCompletionModal] = useState(false);
    const [isLastLesson, setIsLastLesson] = useState(false);

    const handleLessonPress = (videoId) => {
        setCurrentVideoId(videoId);
    };

    const checkIfLastLesson = (videoId) => {
        const lastLesson = subjectData.lessons[subjectData.lessons.length - 1];
        const lastVideo = lastLesson.datas[lastLesson.datas.length - 1];
        return lastVideo.videoId === videoId;
    };

    const handleVideoStateChange = useCallback((state) => {
        if (state === "ended") {
            setIsLastLesson(checkIfLastLesson(currentVideoId));
            setShowCompletionModal(true);
        }
    }, [currentVideoId]);

    const handleNextLesson = () => {
        let currentLessonIndex = -1;
        let currentDataIndex = -1;
        
        subjectData.lessons.forEach((lesson, lessonIdx) => {
            lesson.datas.forEach((data, dataIdx) => {
                if (data.videoId === currentVideoId) {
                    currentLessonIndex = lessonIdx;
                    currentDataIndex = dataIdx;
                }
            });
        });

        if (currentLessonIndex !== -1 && currentDataIndex !== -1) {
            const currentLesson = subjectData.lessons[currentLessonIndex];
            
            if (currentDataIndex + 1 < currentLesson.datas.length) {
                setCurrentVideoId(currentLesson.datas[currentDataIndex + 1].videoId);
            } else if (currentLessonIndex + 1 < subjectData.lessons.length) {
                setCurrentVideoId(subjectData.lessons[currentLessonIndex + 1].datas[0].videoId);
            }
        }
        
        setShowCompletionModal(false);
    };

    const renderLessonData = (lessonData, index) => {
        const isActive = currentVideoId === lessonData.videoId;
        return (
            <TouchableOpacity 
                key={index} 
                style={[styles.lessonItem, isActive && styles.activeLessonItem]}
                onPress={() => handleLessonPress(lessonData.videoId)}
            >
                <Text style={[styles.lessonNumber, isActive && styles.activeLessonNumber]}>
                    {String(index + 1).padStart(2, '0')}
                </Text>
                <View style={styles.lessonContent}>
                    <Text style={[styles.lessonTitle, isActive && styles.activeLessonTitle]}>
                        {lessonData.title}
                    </Text>
                    <Text style={[styles.lessonTime, isActive && styles.activeLessonTime]}>
                        {lessonData.time} Phút
                    </Text>
                </View>
                <Icon 
                    name="play-circle-outline" 
                    size={24} 
                    color={isActive ? "#2282FE" : "#666"} 
                />
            </TouchableOpacity>
        );
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fff',
        },
        fixedVideoContainer: {
            position: 'absolute',
            top: Platform.OS === 'ios' ? insets.top : StatusBar.currentHeight,
            left: 0,
            right: 0,
            height: 230,
            zIndex: 999,
            elevation: 999,
            backgroundColor: '#fff',
        },
        scrollView: {
            flex: 1,
        },
        scrollViewContent: {
            paddingBottom: 16,
        },
        videoSpacing: {
            height: Platform.OS === 'ios' ? 230 + insets.top - 28 : 230 + StatusBar.currentHeight - 30,
        },
        courseInfo: {
            // padding: 16,
        },
        instructor: {
            fontSize: 15,
            color: '#FF6B00',
            marginBottom: 4,
            fontWeight: 'bold',
            paddingTop: 16,
            paddingLeft: 16,
        },
        courseTitle: {
            fontSize: 22,
            fontWeight: 'bold',
            marginBottom: 8,
            color : '#202244',
            paddingLeft: 16,
            paddingBottom: 10,
        },
        statsContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 16,
            paddingHorizontal: 20,
            backgroundColor: '#F5F7FF',
            // borderRadius: 12,
            elevation: 1,
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.1,
            shadowRadius: 2,
        },
        statsContent: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        statItem: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        statDivider: {
            width: 1.5,
            height: 18,
            backgroundColor: '#D1D1D1',
            marginHorizontal: 12,
        },
        statsIcon: {
            marginRight: 8,
        },
        stats: {
            color: '#444',
            fontSize: 16,
            fontWeight: '600',
        },
        freeLabel: {
            color: '#2282FE',
            fontWeight: '700',
            fontSize: 16,
        },
        tabContainer: {
            borderBottomWidth: 1.5,
            borderBottomColor: '#EAEAEA',
            marginBottom: 12,
        },
        tabWrapper: {
            flexDirection: 'row',
            paddingHorizontal: 16,
            paddingTop: 12,
        },
        tabItemWrapper: {
            position: 'relative',
            marginRight: 40,
            paddingBottom: 10,
        },
        tabItem: {
            color: '#666',
            fontSize: 17,
            fontWeight: '500',
            paddingVertical: 6,
        },
        activeTab: {
            color: '#2282FE',
            fontWeight: '700',
        },
        activeTabIndicator: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 3,
            backgroundColor: '#2282FE',
            borderRadius: 2,
        },
        lessonHeaderContainer: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            paddingBottom: 16,
        },
        lessonContainer: {
            padding: 16,
            paddingBottom: 0,
        },
        lessonHeader: {
            flex: 0.7,
            fontSize: 17,
            fontWeight: 'bold',
            marginBottom: 4,
        },
        lessonDuration: {
            textAlign: 'right',
            flex: 0.3,
            color: '#666',
            fontSize: 16,
            fontWeight: 'bold',
            color: '#2282FE',
            // alignSelf: 'flex-end',

            // marginBottom: 16,
        },
        lessonItem: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 16,
        },
        lessonNumber: {
            width: 24,
            marginRight: 12,
            color: '#666',
        },
        lessonContent: {
            flex: 1,
        },
        lessonTitle: {
            fontSize: 16,
            marginBottom: 4,
            fontWeight: 'bold',
            color : '#202244',
        },
        lessonTime: {
            fontSize: 13,
            color: '#666',
        },
        topicText: {
            color: '#2282FE',
        },
        activeLessonItem: {
            backgroundColor: '#F5F7FF',
            borderRadius: 8,
            paddingVertical: 8,
            paddingHorizontal: 12,
            marginHorizontal: -12,
        },
        activeLessonNumber: {
            color: '#2282FE',
        },
        activeLessonTitle: {
            color: '#2282FE',
            fontWeight: '600',
        },
        activeLessonTime: {
            color: '#2282FE',
        },
        modalOverlay: {
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            justifyContent: 'center',
            alignItems: 'center',
        },
        modalContainer: {
            backgroundColor: 'white',
            padding: 20,
            borderRadius: 10,
            width: '80%',
            maxWidth: 400,
        },
        modalContent: {
            alignItems: 'center',
        },
        modalIcon: {
            marginBottom: 10,
        },
        modalTitle: {
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 5,
        },
        modalMessage: {
            textAlign: 'center',
            marginBottom: 20,
            color: '#666',
        },
        modalButtons: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            width: '100%',
        },
        modalButton: {
            padding: 10,
            borderRadius: 5,
            width: '40%',
        },
        stayButton: {
            backgroundColor: '#2282FE',
        },
        stayButtonText: {
            color: '#fff',
            fontWeight: 'bold',
            textAlign: 'center',
        },
        nextButton: {
            backgroundColor: '#fff',
            borderWidth: 2,
            borderColor: '#2282FE',
        },
        nextButtonText: {
            color: '#2282FE',
            fontWeight: 'bold',
            textAlign: 'center',
        },
    });

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <View style={styles.fixedVideoContainer}>
                    <YoutubePlayer
                        height={230}
                        play={true}
                        videoId={currentVideoId}
                        onChangeState={handleVideoStateChange}
                    />
                </View>
                
                <ScrollView 
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollViewContent}
                >
                    <View style={styles.videoSpacing} />
                    
                    <View style={styles.courseInfo}>
                        <Text style={styles.instructor}>{subjectData.author}</Text>
                        <Text style={styles.courseTitle}>{subjectData.title}</Text>
                        
                        <View style={styles.statsContainer}>
                            <View style={styles.statsContent}>
                                <View style={styles.statItem}>
                                    <Icon name="ondemand-video" size={22} color="#444" style={styles.statsIcon} />
                                    <Text style={styles.stats}>{subjectData.lessons.length} bài học</Text>
                                    <View style={styles.statDivider} />
                                    <Icon name="schedule" size={22} color="#444" style={styles.statsIcon} />
                                    <Text style={styles.stats}>{subjectData.duration}</Text>
                                </View>
                            </View>
                            <Text style={styles.freeLabel}>Miễn phí</Text>
                        </View>

                        <View style={styles.tabContainer}>
                            <View style={styles.tabWrapper}>
                                <View style={styles.tabItemWrapper}>
                                    <Text style={[styles.tabItem, styles.activeTab]}>Video</Text>
                                    <View style={styles.activeTabIndicator} />
                                </View>
                                <View style={styles.tabItemWrapper}>
                                    <Text style={styles.tabItem}>Bài tập</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    {subjectData.lessons.map((lesson, lessonIndex) => (
                        <View key={lessonIndex} style={styles.lessonContainer}>
                            <View style={styles.lessonHeaderContainer}>
                                <Text style={styles.lessonHeader}>
                                        Chủ đề {String(lesson.id).padStart(2, '0')} - <Text style={styles.topicText}>{lesson.topic}</Text>
                                </Text>
                                <Text style={styles.lessonDuration}>{lesson.time} Phút</Text>
                            </View>
                            
                            {lesson.datas.map((data, dataIndex) => renderLessonData(data, dataIndex))}
                        </View>
                    ))}
                </ScrollView>
                <Modal
                    transparent={true}
                    visible={showCompletionModal}
                    animationType="fade"
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <View style={styles.modalIcon}>
                                    <Icon 
                                        name={isLastLesson ? "emoji-events" : "check-circle"} 
                                        size={50} 
                                        color="#2282FE" 
                                    />
                                </View>
                                <Text style={styles.modalTitle}>
                                    {isLastLesson ? "Chúc mừng!" : "Hoàn thành!"}
                                </Text>
                                <Text style={styles.modalMessage}>
                                    {isLastLesson 
                                        ? "Bạn đã hoàn thành tất cả các bài học!" 
                                        : "Bạn đã hoàn thành video này"
                                    }
                                </Text>
                                <View style={styles.modalButtons}>
                                    {isLastLesson ? (
                                        <TouchableOpacity 
                                            style={[styles.modalButton, styles.stayButton]}
                                            onPress={() => setShowCompletionModal(false)}
                                        >
                                            <Text style={styles.stayButtonText}>Đóng</Text>
                                        </TouchableOpacity>
                                    ) : (
                                        <>
                                            <TouchableOpacity 
                                                style={[styles.modalButton, styles.stayButton]}
                                                onPress={() => setShowCompletionModal(false)}
                                            >
                                                <Text style={styles.stayButtonText}>Ở lại</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity 
                                                style={[styles.modalButton, styles.nextButton]}
                                                onPress={handleNextLesson}
                                            >
                                                <Text style={styles.nextButtonText}>Bài tiếp theo</Text>
                                            </TouchableOpacity>
                                        </>
                                    )}
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}
  