import { DEFAULT_AVATAR } from '@/constants/Images';
import { BlurView } from 'expo-blur';
import { Bell, ChevronRight, LogOut, Moon, Settings, User, X } from 'lucide-react-native';
import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ProfileModalProps {
    visible: boolean;
    onClose: () => void;
}

export default function ProfileModal({ visible, onClose }: ProfileModalProps) {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.centeredView}>
                <BlurView intensity={80} tint="dark" style={styles.absolute} />

                <View style={styles.modalView}>
                    {/* Header / Close */}
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>Profile</Text>
                        <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                            <X size={20} color="#fff" />
                        </TouchableOpacity>
                    </View>

                    {/* User Info */}
                    <View style={styles.profileHeader}>
                        <Image
                            source={{ uri: DEFAULT_AVATAR }}
                            style={styles.avatarLarge}
                        />
                        <View>
                            <Text style={styles.userName}>Demo User</Text>
                            <Text style={styles.userHandle}>@newsly_user</Text>
                        </View>
                    </View>

                    {/* Stats or Membership (Placeholder) */}
                    <View style={styles.statsRow}>
                        <View style={styles.statItem}>
                            <Text style={styles.statVal}>12</Text>
                            <Text style={styles.statLabel}>Saved</Text>
                        </View>
                        <View style={[styles.statItem, styles.statBorder]}>
                            <Text style={styles.statVal}>5</Text>
                            <Text style={styles.statLabel}>Read</Text>
                        </View>
                        <View style={styles.statItem}>
                            <Text style={styles.statVal}>Free</Text>
                            <Text style={styles.statLabel}>Plan</Text>
                        </View>
                    </View>

                    <View style={styles.divider} />

                    {/* Menu Options */}
                    <TouchableOpacity style={styles.menuItem}>
                        <View style={styles.menuLeft}>
                            <User size={20} color="#ccc" />
                            <Text style={styles.menuText}>Edit Profile</Text>
                        </View>
                        <ChevronRight size={16} color="#666" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuItem}>
                        <View style={styles.menuLeft}>
                            <Bell size={20} color="#ccc" />
                            <Text style={styles.menuText}>Notifications</Text>
                        </View>
                        <ChevronRight size={16} color="#666" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuItem}>
                        <View style={styles.menuLeft}>
                            <Moon size={20} color="#ccc" />
                            <Text style={styles.menuText}>Dark Mode</Text>
                        </View>
                        {/* Toggle placeholder */}
                        <View style={{ width: 30, height: 16, borderRadius: 10, backgroundColor: '#3b82f6' }} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuItem}>
                        <View style={styles.menuLeft}>
                            <Settings size={20} color="#ccc" />
                            <Text style={styles.menuText}>Settings</Text>
                        </View>
                        <ChevronRight size={16} color="#666" />
                    </TouchableOpacity>

                    <View style={styles.divider} />

                    <TouchableOpacity style={[styles.menuItem, { marginTop: 10 }]}>
                        <View style={styles.menuLeft}>
                            <LogOut size={20} color="#ef4444" />
                            <Text style={[styles.menuText, { color: '#ef4444' }]}>Sign Out</Text>
                        </View>
                    </TouchableOpacity>

                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    absolute: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        width: '85%',
        backgroundColor: 'rgba(30,30,30,0.7)', // Semi-transparent card
        borderRadius: 24,
        padding: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 10,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    headerTitle: {
        fontSize: 20,
        fontFamily: 'Geist_700Bold',
        color: '#fff',
    },
    closeBtn: {
        padding: 4,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 12,
    },
    profileHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
    },
    avatarLarge: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 16,
        borderWidth: 2,
        borderColor: '#fff',
    },
    userName: {
        fontSize: 18,
        fontFamily: 'Geist_600SemiBold',
        color: '#fff',
    },
    userHandle: {
        fontSize: 14,
        fontFamily: 'Geist_400Regular',
        color: '#aaa',
    },
    statsRow: {
        flexDirection: 'row',
        backgroundColor: 'rgba(0,0,0,0.3)',
        borderRadius: 16,
        padding: 16,
        justifyContent: 'space-around',
        marginBottom: 24,
    },
    statItem: {
        alignItems: 'center',
        flex: 1,
    },
    statBorder: {
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    statVal: {
        fontSize: 18,
        fontFamily: 'Geist_700Bold',
        color: '#fff',
    },
    statLabel: {
        fontSize: 12,
        fontFamily: 'Geist_400Regular',
        color: '#888',
        marginTop: 4,
    },
    menuItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
    },
    menuLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    menuText: {
        fontSize: 16,
        fontFamily: 'Geist_500Medium',
        color: '#eee',
        marginLeft: 12,
    },
    divider: {
        height: 1,
        backgroundColor: 'rgba(255,255,255,0.1)',
        marginVertical: 12,
    }
});
