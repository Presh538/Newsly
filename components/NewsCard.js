import { LinearGradient } from 'expo-linear-gradient';
import { Bookmark, Clock, Share2 } from 'lucide-react-native';
import React, { memo } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import Animated, { Extrapolation, interpolate, useAnimatedStyle } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const NewsCard = ({ story, onDetailsPress, onBookmarkPress, onSharePress, isBookmarked, height, index, scrollY }) => {

    // Parallax Effect for Image
    const rImageStyle = useAnimatedStyle(() => {
        const inputRange = [
            (index - 1) * height,
            index * height,
            (index + 1) * height
        ];

        if (!scrollY) return {};

        const translateY = interpolate(
            scrollY.value,
            inputRange,
            [-height * 0.15, 0, height * 0.15], // Move image slightly to create depth
            Extrapolation.CLAMP
        );

        const scale = interpolate(
            scrollY.value,
            inputRange,
            [1.2, 1, 1.2], // Slight zoom out when centered
            Extrapolation.CLAMP
        );

        return {
            transform: [
                { translateY },
                { scale }
            ]
        };
    });

    // Content Entry Animation (Fade/Slide)
    const rContentStyle = useAnimatedStyle(() => {
        const inputRange = [
            (index - 0.5) * height,
            index * height,
            (index + 0.5) * height
        ];

        if (!scrollY) return {};

        const opacity = interpolate(
            scrollY.value,
            inputRange,
            [0, 1, 0],
            Extrapolation.CLAMP
        );

        const translateY = interpolate(
            scrollY.value,
            inputRange,
            [50, 0, -50], // Slide effect
            Extrapolation.CLAMP
        );

        return {
            opacity,
            transform: [{ translateY }]
        };
    });

    return (
        <TouchableWithoutFeedback onPress={onDetailsPress}>
            <View style={[styles.container, { height }]}>
                <Animated.Image
                    source={{ uri: story.image }}
                    style={[styles.image, rImageStyle]}
                    resizeMode="cover"
                />

                {/* Full screen gradient for text legibility */}
                <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.4)', 'rgba(0,0,0,0.95)']}
                    locations={[0.4, 0.7, 1]}
                    style={styles.gradient}
                />

                <Animated.View style={[styles.content, rContentStyle]}>
                    {/* Read Time Tag */}
                    <View style={styles.readTimeRow}>
                        <Clock size={14} color="#ccc" style={{ marginRight: 4 }} />
                        <Text style={styles.readTimeText}>{story.timestamp}</Text>
                    </View>

                    {/* Title */}
                    <Text style={styles.title} numberOfLines={3}>{story.title}</Text>

                    {/* Summary */}
                    <Text style={styles.summary} numberOfLines={3}>{story.summary}</Text>

                    {/* Bottom Actions Row */}
                    <View style={styles.actionsRow}>
                        <TouchableOpacity onPress={onBookmarkPress} style={styles.actionBtn}>
                            <Bookmark size={20} color={isBookmarked ? "#fff" : "#ccc"} fill={isBookmarked ? "#fff" : "transparent"} />
                            <Text style={[styles.actionText, isBookmarked && { color: '#fff' }]}>{isBookmarked ? 'Bookmarked' : 'Bookmark'}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={onSharePress} style={styles.actionBtn}>
                            <Share2 size={20} color="#ccc" />
                            <Text style={styles.actionText}>Share</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        width: width,
        justifyContent: 'flex-end',
        backgroundColor: '#000',
        overflow: 'hidden', // Important for parallax
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        height: '120%', // Make image taller for parallax movement
        top: '-10%', // Center the taller image
    },
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: '100%',
    },
    content: {
        padding: 24,
        paddingBottom: 48,
    },
    readTimeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    readTimeText: {
        color: '#ccc',
        fontSize: 12,
        fontFamily: 'Geist_600SemiBold',
        letterSpacing: 1,
        textTransform: 'uppercase',
    },
    title: {
        color: '#fff',
        fontSize: 28, // Matches large Figma title
        fontFamily: 'Geist_700Bold',
        marginBottom: 12,
        lineHeight: 34,
    },
    summary: {
        color: '#e0e0e0',
        fontSize: 16,
        fontFamily: 'Geist_400Regular',
        lineHeight: 24,
        marginBottom: 24,
        opacity: 0.9,
    },
    actionsRow: {
        flexDirection: 'row',
        gap: 24,
    },
    actionBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    actionText: {
        color: '#ccc',
        fontSize: 14,
        fontFamily: 'Geist_500Medium',
    }
});

export default memo(NewsCard);
