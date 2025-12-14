import { Check, ExternalLink, X } from 'lucide-react-native';
import { Linking, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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
        <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
            <View style={styles.detailsContainer}>
                <View style={styles.detailsHeader}>
                    <Text style={styles.detailsCategory}>{story.category}</Text>
                    <TouchableOpacity onPress={onClose} style={styles.closeBtnCircle}>
                        <X size={20} color="#333" />
                    </TouchableOpacity>
                </View>

                <ScrollView contentContainerStyle={styles.detailsContent}>
                    <Text style={styles.detailsTitle}>{story.title}</Text>

                    <View style={styles.section}>
                        <Text style={styles.sectionHeader}>What Happened</Text>
                        <Text style={styles.sectionText}>{story.details.whatHappened}</Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionHeader}>Why It Matters</Text>
                        <Text style={styles.sectionText}>{story.details.whyItMatters}</Text>
                    </View>

                    <TouchableOpacity onPress={() => Linking.openURL('https://google.com')} style={styles.sourceLink}>
                        <Text style={styles.linkText}>Read full story on {story.details.source}</Text>
                        <ExternalLink size={14} color="#2563eb" />
                    </TouchableOpacity>
                </ScrollView>
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
    },
    categoryTextActive: {
        color: '#fff',
        fontWeight: 'bold',
    },

    // Details Modal
    detailsContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    detailsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    detailsCategory: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#666',
        textTransform: 'uppercase',
    },
    closeBtnCircle: {
        backgroundColor: '#f0f0f0',
        padding: 8,
        borderRadius: 50,
    },
    detailsContent: {
        padding: 24,
        paddingBottom: 50,
    },
    detailsTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 32,
        lineHeight: 32,
        color: '#111',
    },
    section: {
        marginBottom: 24,
    },
    sectionHeader: {
        fontSize: 18,
        fontWeight: '600',
        color: '#2563eb',
        marginBottom: 8,
    },
    sectionText: {
        fontSize: 16,
        lineHeight: 26,
        color: '#333',
    },
    sourceLink: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginTop: 16,
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
    },
    linkText: {
        color: '#2563eb',
        fontSize: 14,
    }
});
