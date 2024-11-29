import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '../components/BackButton';
import YoutubePlayer from 'react-native-youtube-iframe';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function StudyScreen({ route }) {
    const { subjectData } = route.params;
    const videoId = "1nQe2ZiwWFw";

    const renderLessonData = (lessonData, index) => {
        return (
            <View key={index} style={styles.lessonItem}>
                <Text style={styles.lessonNumber}>{String(index + 1).padStart(2, '0')}</Text>
                <View style={styles.lessonContent}>
                    <Text style={styles.lessonTitle}>{lessonData.title}</Text>
                    <Text style={styles.lessonTime}>{lessonData.time} Phút</Text>
                </View>
                <Icon name="play-circle-outline" size={24} color="#2282FE" />
            </View>
        );
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.scrollView}>
                    <View style={styles.videoContainer}>
                        <YoutubePlayer
                            height={300}
                            play={true}
                            videoId={videoId}
                        />
                    </View>

                    <View style={styles.courseInfo}>
                        <Text style={styles.instructor}>{subjectData.instructor}</Text>
                        <Text style={styles.courseTitle}>{subjectData.title}</Text>
                        
                        <View style={styles.statsContainer}>
                            <Text style={styles.stats}>
                                {subjectData.lessons.length} bài học | {subjectData.duration} Giờ
                            </Text>
                            <Text style={styles.freeLabel}>Miễn phí</Text>
                        </View>

                        <View style={styles.tabContainer}>
                            <Text style={[styles.tabItem, styles.activeTab]}>Giới thiệu</Text>
                            <Text style={styles.tabItem}>Giáo trình</Text>
                        </View>
                    </View>

                    {subjectData.lessons.map((lesson, lessonIndex) => (
                        <View key={lessonIndex} style={styles.lessonContainer}>
                            <Text style={styles.lessonHeader}>
                                Chủ đề {String(lesson.id).padStart(2, '0')} - {lesson.topic}
                            </Text>
                            <Text style={styles.lessonDuration}>{lesson.duration} Phút</Text>
                            
                            {lesson.datas.map((data, dataIndex) => renderLessonData(data, dataIndex))}
                        </View>
                    ))}
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollView: {
        flex: 1,
    },
    videoContainer: {
        width: '100%',
        backgroundColor: '#000',
    },
    courseInfo: {
        padding: 16,
    },
    instructor: {
        fontSize: 14,
        color: '#FF6B00',
        marginBottom: 4,
    },
    courseTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    stats: {
        color: '#666',
    },
    freeLabel: {
        color: '#2282FE',
        fontWeight: '500',
    },
    tabContainer: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
    },
    tabItem: {
        paddingVertical: 12,
        marginRight: 24,
        color: '#666',
    },
    activeTab: {
        color: '#2282FE',
        borderBottomWidth: 2,
        borderBottomColor: '#2282FE',
    },
    lessonContainer: {
        padding: 16,
    },
    lessonHeader: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    lessonDuration: {
        color: '#666',
        marginBottom: 16,
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
        fontSize: 14,
        marginBottom: 4,
    },
    lessonTime: {
        fontSize: 12,
        color: '#666',
    },
});
  