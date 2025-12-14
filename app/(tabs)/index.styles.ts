import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        color: '#fff',
        fontSize: 18,
        fontFamily: 'Geist_400Regular',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        height: 60,
    },
    categorySelector: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerTitle: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'Geist_600SemiBold',
    },
    iconBtn: {
        padding: 4,
    },
    notificationBtn: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        backgroundColor: 'rgba(49, 49, 49, 0.30)',
    },
    userAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 1.5,
        borderColor: '#fff',
    },
    progressContainer: {
        flexDirection: 'row',
        height: 3,
        gap: 4,
        marginHorizontal: 10,
        marginTop: 10,
    },
    progressSegment: {
        height: '100%',
        borderRadius: 1.5,
    },
    floatingBtnContainer: {
        position: 'absolute',
        alignSelf: 'center',
        zIndex: 100,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 30,
        overflow: 'visible', // Must see shadow relative to this
    },
    glassBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 30,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
        backgroundColor: 'rgba(47, 47, 47, 0.5)', // Fallback / Blend
    },
    newStoriesText: {
        color: '#fff',
        fontSize: 14,
        fontFamily: 'Geist_500Medium',
    }
});
