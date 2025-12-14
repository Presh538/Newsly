import { BlurView } from 'expo-blur';
import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import Animated, { Easing, FadeInLeft, FadeInUp, FadeOutUp } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

interface CategoryDropdownProps {
    visible: boolean;
    onClose: () => void;
    categories: { id: string; name: string }[];
    selectedCategory: string;
    onSelect: (id: string) => void;
    top: number;
}

export default function CategoryDropdown({ visible, onClose, categories, selectedCategory, onSelect, top }: CategoryDropdownProps) {
    if (!visible) return null;

    return (
        <View style={styles.overlay} pointerEvents="box-none">
            {/* Clickable Overlay to Close */}
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.backdrop} />
            </TouchableWithoutFeedback>

            {/* Dropdown Menu */}
            <Animated.View
                entering={FadeInUp.duration(300).easing(Easing.out(Easing.cubic))}
                exiting={FadeOutUp.duration(200)}
                style={[styles.container, styles.shadow, { top }]}
            >
                <BlurView intensity={40} tint="systemThinMaterialDark" style={styles.blurContainer}>

                    {/* Header Title */}
                    <Text style={styles.headerTitle}>Select Category</Text>

                    {/* List Items */}
                    <View style={styles.listContainer}>
                        {categories.map((category, index) => {
                            const isSavedStories = category.id === 'saved';
                            const isSelected = selectedCategory === category.id;

                            return (
                                <React.Fragment key={category.id}>
                                    {/* Separator before Saved Stories */}
                                    {isSavedStories && <View style={styles.separator} />}

                                    <Animated.View
                                        entering={FadeInLeft.delay(index * 60).duration(200).easing(Easing.out(Easing.quad))}
                                    >
                                        <TouchableOpacity
                                            style={styles.itemBtn}
                                            onPress={() => onSelect(category.id)}
                                        >
                                            <View style={styles.itemRow}>
                                                <Text style={[styles.itemText, isSavedStories && styles.savedText]}>
                                                    {category.name}
                                                </Text>

                                                {/* Red Dot Indicator for Selected */}
                                                {isSelected && (
                                                    <View style={styles.activeDot} />
                                                )}
                                            </View>
                                        </TouchableOpacity>
                                    </Animated.View>
                                </React.Fragment>
                            );
                        })}
                    </View>

                </BlurView>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 1000,
        // Ensure it covers everything
        height: height,
        width: width,
    },
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'transparent', // Or semi-transparent 'rgba(0,0,0,0.2)' if dimmed desired
    },
    container: {
        position: 'absolute',
        // top passed via style prop
        left: 20,
        right: 20,
        borderRadius: 24,
        overflow: 'hidden',
        // zIndex handled by overlay
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 10,
    },
    blurContainer: {
        padding: 24,
        backgroundColor: 'rgba(20,20,20,0.6)',
    },
    headerTitle: {
        color: '#909090',
        fontSize: 13,
        fontFamily: 'Geist_500Medium',
        marginBottom: 16,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    listContainer: {
        gap: 0,
    },
    itemBtn: {
        paddingVertical: 12,
    },
    itemRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    itemText: {
        color: '#fff',
        fontSize: 18,
        fontFamily: 'Geist_500Medium',
    },
    savedText: {
        color: '#E0E0E0',
    },
    activeDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#FF2929',
        shadowColor: '#FF2929',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
    },
    separator: {
        height: 1,
        backgroundColor: 'rgba(255,255,255,0.1)',
        marginVertical: 8,
    }
});
