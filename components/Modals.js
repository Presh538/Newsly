import { Bookmark, Check, Clock, ExternalLink, Share2, Sparkles, X } from 'lucide-react-native';
import { Dimensions, Image, Linking, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width, height } = Dimensions.get('window');

// If expo-blur is not installed, fallback to View:
const BlurViewFallback = ({ children, style }) => (
    <View style={[style, { backgroundColor: 'rgba(0,0,0,0.9)' }]}>{children}</View>
);

export const CategoryModal = ({ visible, onClose, categories, selectedCategory, onSelect }) => {
    return (
        <Modal visible={visible} animationType="fade" transparent>
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>Select Category</Text>
                        <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                            <X size={24} color="#fff" />
                        </TouchableOpacity>
                    </View>

                    <ScrollView contentContainerStyle={styles.listContent}>
                        {categories.map(cat => (
                            <TouchableOpacity
                                key={cat.id}
                                onPress={() => onSelect(cat.id)}
                                style={[
                                    styles.categoryItem,
                                    selectedCategory === cat.id && styles.categoryItemActive
                                ]}
                            >
                                <Text style={[
                                    styles.categoryText,
                                    selectedCategory === cat.id && styles.categoryTextActive
                                ]}>
                                    {cat.name}
                                </Text>
                                {selectedCategory === cat.id && <Check size={20} color="#fff" />}
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
};

export const StoryDetailsModal = ({ visible, onClose, story }) => {
    if (!story) return null;

    return (
        <Modal visible={visible} animationType="slide" presentationStyle="fullScreen">
            <View style={styles.pageContainer}>

                <ScrollView contentContainerStyle={styles.scrollContent}>
                    {/* 1. Image at the top */}
                    <Image source={{ uri: story.image }} style={styles.heroImage} resizeMode="cover" />

                    <View style={styles.contentContainer}>
                        {/* 2. Title */}
                        <Text style={styles.pageTitle}>{story.title}</Text>

                        {/* 3. Source & Timestamp */}
                        <View style={styles.metaRow}>
                            <Text style={styles.sourceText}>{story.details.source}</Text>
                            <View style={styles.dotSeparator} />
                            <Clock size={12} color="#999" />
                            <Text style={styles.timeText}>{story.timestamp}</Text>
                        </View>

                        {/* 4. Actions */}
                        <View style={styles.actionsBar}>
                            <TouchableOpacity style={styles.actionBtn}>
                                <Bookmark size={20} color="#fff" />
                                <Text style={styles.actionLabel}>Bookmark</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.actionBtn}>
                                <Share2 size={20} color="#fff" />
                                <Text style={styles.actionLabel}>Share</Text>
                            </TouchableOpacity>
                        </View>

                        {/* 5. AI Analysis / Writeup */}
                        <View style={styles.writeupSection}>

                            <View style={styles.aiCard}>
                                <View style={styles.aiHeaderRow}>
                                    <Sparkles size={18} color="#A855F7" />
                                    <Text style={styles.aiTitle}>AI Analysis</Text>
                                </View>
                                <Text style={styles.aiText}>
                                    {story.summary || story.details.whyItMatters || "No summary available for this story."}
                                </Text>
                            </View>

                            <TouchableOpacity
                                onPress={() => Linking.openURL(story.url)}
                                style={styles.readMoreBtn}
                            >
                                <Text style={styles.readMoreText}>Read Full Article</Text>
                                <ExternalLink size={16} color="#000" />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={onClose} style={styles.bottomCloseBtn}>
                            <Text style={styles.bottomCloseText}>Close Story</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>

                {/* 6. Exit / Cancel Option */}
                {/* Floating X button at top right or Bottom Cancel Button. User asked for "Exit option (cancel)" which often implies a button at bottom or top.
                    Let's put a clear Cancel button at the bottom fixed, or top floating. Top floating X is standard for full screen modals.
                    However, user explicitly said "exit option (cancel), to go back".
                    I'll add a floating Close button at top AND a Cancel button at bottom of scroll if needed, but top is standard.
                */}
                <TouchableOpacity onPress={onClose} style={styles.floatingCloseBtn}>
                    <X size={24} color="#fff" />
                </TouchableOpacity>

            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.8)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#1a1a1a',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        maxHeight: '60%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        fontFamily: 'Geist_600SemiBold',
    },
    closeBtn: {
        padding: 4,
    },
    listContent: {
        paddingBottom: 40,
    },
    categoryItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 16,
        borderRadius: 12,
        marginBottom: 8,
        backgroundColor: 'rgba(255,255,255,0.05)',
    },
    categoryItemActive: {
        backgroundColor: '#2563eb',
    },
    categoryText: {
        fontSize: 16,
        color: '#ccc',
        fontFamily: 'Geist_500Medium',
    },
    categoryTextActive: {
        color: '#fff',
        fontWeight: 'bold',
    },

    // Story Page Styles
    pageContainer: {
        flex: 1,
        backgroundColor: '#000',
    },
    scrollContent: {
        paddingBottom: 60,
    },
    heroImage: {
        width: '100%',
        height: height * 0.4,
    },
    contentContainer: {
        flex: 1,
        marginTop: -30, // Overlap image slightly
        backgroundColor: '#000',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 24,
    },
    pageTitle: {
        fontSize: 28,
        color: '#fff',
        fontFamily: 'Geist_700Bold',
        marginBottom: 16,
        lineHeight: 34,
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
    },
    sourceText: {
        color: '#FF4C4C', // Accent color
        fontSize: 14,
        fontFamily: 'Geist_600SemiBold',
        textTransform: 'uppercase',
    },
    dotSeparator: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: '#666',
        marginHorizontal: 8,
    },
    timeText: {
        color: '#999',
        fontSize: 14,
        fontFamily: 'Geist_400Regular',
        marginLeft: 6,
    },
    actionsBar: {
        flexDirection: 'row',
        marginBottom: 32,
        gap: 16,
    },
    actionBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1A1A1A',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 20,
        gap: 8,
    },
    actionLabel: {
        color: '#fff',
        fontSize: 14,
        fontFamily: 'Geist_500Medium',
    },
    writeupSection: {
        gap: 16,
    },
    aiCard: {
        backgroundColor: '#1E1E1E',
        borderRadius: 16,
        padding: 20,
        borderWidth: 1,
        borderColor: '#333',
    },
    aiHeaderRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 12,
    },
    aiTitle: {
        color: '#A855F7', // Purple/AI color
        fontSize: 14,
        fontFamily: 'Geist_600SemiBold',
        letterSpacing: 0.5,
        textTransform: 'uppercase',
    },
    aiText: {
        color: '#E0E0E0',
        fontSize: 16,
        lineHeight: 26,
        fontFamily: 'Geist_400Regular',
    },
    readMoreBtn: {
        marginTop: 24,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        borderRadius: 12,
        gap: 8,
    },
    readMoreText: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'Geist_600SemiBold',
    },
    bottomCloseBtn: {
        marginTop: 16,
        alignItems: 'center',
        paddingVertical: 16,
    },
    bottomCloseText: {
        color: '#666',
        fontSize: 16,
        fontFamily: 'Geist_500Medium',
    },
    floatingCloseBtn: {
        position: 'absolute',
        top: 50,
        right: 20,
        backgroundColor: 'rgba(0,0,0,0.5)',
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 50,
    },
});
