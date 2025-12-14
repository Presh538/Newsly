import AsyncStorage from '@react-native-async-storage/async-storage';
import { BlurView } from 'expo-blur';
import { ArrowUp, Bell, ChevronsUpDown } from 'lucide-react-native';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Dimensions, FlatList, Image, Share, StatusBar, Text, TouchableOpacity, View, ViewToken } from 'react-native';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { categories, stories as initialStories } from '@/assets/data/mockData';
import CategoryDropdown from '@/components/CategoryDropdown';
import { StoryDetailsModal } from '@/components/Modals';
import NewsCard from '@/components/NewsCard';
import ProfileModal from '@/components/ProfileModal';
import { DEFAULT_AVATAR } from '@/constants/Images';
import { fetchNews } from '@/services/newsService';
import { styles } from './index.styles';

const { height } = Dimensions.get('window');

interface Story {
  id: string;
  title: string;
  summary: string;
  image: string;
  category: string;
  timestamp: string;
  details: {
    whatHappened: string;
    whyItMatters: string;
    source: string;
  };
  url: string;
  readTime: string;
}

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const chromeHeight = insets.top + 80;
  const cardHeight = height - chromeHeight;

  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const [stories, setStories] = useState<Story[]>(initialStories);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const flatListRef = useRef<FlatList<Story>>(null);

  // UI State
  const [selectedCategory, setSelectedCategory] = useState('top');
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [profileModalVisible, setProfileModalVisible] = useState(false);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [showNewIndicator, setShowNewIndicator] = useState(false);

  // Data State
  const [loading, setLoading] = useState(true);
  const [pendingStories, setPendingStories] = useState<Story[]>([]);

  // Timeline State
  const [activeIndex, setActiveIndex] = useState(0);

  const onViewableItemsChanged = useCallback(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0 && viewableItems[0].index !== null) {
      setActiveIndex(viewableItems[0].index);
    }
  }, []);

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50
  };

  // Show indicator when reaching the end
  useEffect(() => {
    if (stories.length > 0 && activeIndex === stories.length - 1) {
      setShowNewIndicator(true);
    }
  }, [activeIndex, stories.length]);

  // Load bookmarks
  useEffect(() => {
    AsyncStorage.getItem('newsly_bookmarks').then(saved => {
      if (saved) setBookmarks(JSON.parse(saved));
    });
  }, []);

  // Fetch News
  const loadNews = async () => {
    setLoading(true);
    if (selectedCategory === 'saved') {
      // Saved logic handled elsewhere
    } else {
      const news = await fetchNews(selectedCategory);
      setStories(news);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadNews();
  }, [selectedCategory]);

  // Poll for New Stories (Every 10 seconds)
  useEffect(() => {
    if (loading || stories.length === 0) return;

    const checkForUpdates = async () => {
      try {
        const latestNews = await fetchNews(selectedCategory);
        if (latestNews.length > 0 && latestNews[0].id !== stories[0].id) {
          setPendingStories(latestNews);
          setShowNewIndicator(true);
        }
      } catch (error) {
        console.log("Error checking for updates:", error);
      }
    };

    const interval = setInterval(checkForUpdates, 10000); // 10 seconds

    return () => clearInterval(interval);
  }, [stories, selectedCategory, loading]);

  const handleRefresh = async () => {
    setShowNewIndicator(false);

    if (pendingStories.length > 0) {
      setStories(pendingStories);
      setPendingStories([]);
    } else {
      await loadNews();
    }

    if (stories.length > 0) {
      flatListRef.current?.scrollToIndex({ index: 0, animated: true });
    }
  };

  const handleShare = async (story: Story) => {
    try {
      await Share.share({
        message: `${story.title}\n\n${story.summary}`,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const toggleBookmark = async (id: string) => {
    const newBookmarks = bookmarks.includes(id)
      ? bookmarks.filter(b => b !== id)
      : [...bookmarks, id];

    setBookmarks(newBookmarks);
    await AsyncStorage.setItem('newsly_bookmarks', JSON.stringify(newBookmarks));
  };

  const renderItem = useCallback(({ item, index }: { item: Story, index: number }) => (
    <NewsCard
      story={item}
      height={cardHeight}
      onDetailsPress={() => setSelectedStory(item)}
      onSharePress={() => handleShare(item)}
      onBookmarkPress={() => toggleBookmark(item.id)}
      isBookmarked={bookmarks.includes(item.id)}
      index={index}
      scrollY={scrollY}
    />
  ), [bookmarks, cardHeight, scrollY]);

  const allCategories = [...categories, { id: 'saved', name: 'Saved Stories' }];
  const currentCategoryName = allCategories.find(c => c.id === selectedCategory)?.name || 'Top News';

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Top Chrome Section */}
      <View style={{ height: chromeHeight, paddingTop: insets.top, backgroundColor: '#000', zIndex: 20 }}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconBtn} onPress={() => setProfileModalVisible(true)}>
            <Image
              source={{ uri: DEFAULT_AVATAR }}
              style={styles.userAvatar}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.categorySelector}
            onPress={() => setCategoryModalVisible(true)}
          >
            <Text style={styles.headerTitle}>
              {selectedCategory === 'top' ? 'Top News' : currentCategoryName}
            </Text>
            <ChevronsUpDown size={14} color="#ccc" style={{ marginLeft: 4, marginTop: 2 }} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.notificationBtn}>
            <Bell size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Timeline */}
        <View style={styles.progressContainer}>
          {stories.map((_, index) => (
            <View
              key={index}
              style={[
                styles.progressSegment,
                {
                  backgroundColor: index <= activeIndex ? '#fff' : 'rgba(255, 255, 255, 0.2)',
                  flex: 1
                }
              ]}
            />
          ))}
        </View>
      </View>

      {/* New Stories Indicator (Floating Glass) */}
      {showNewIndicator && (
        <TouchableOpacity
          style={[styles.floatingBtnContainer, { top: chromeHeight + 16 }]}
          onPress={handleRefresh}
          activeOpacity={0.8}
        >
          <BlurView intensity={20} tint="systemThinMaterialDark" style={styles.glassBtn}>
            <ArrowUp size={14} color="#fff" style={{ marginRight: 6 }} />
            <Text style={styles.newStoriesText}>See latest news</Text>
          </BlurView>
        </TouchableOpacity>
      )}

      {/* Feed Section */}
      {stories.length > 0 ? (
        <Animated.FlatList
          ref={flatListRef}
          data={stories}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          pagingEnabled
          snapToAlignment="start"
          decelerationRate="fast"
          showsVerticalScrollIndicator={false}
          snapToInterval={cardHeight}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          getItemLayout={(data, index) => (
            { length: cardHeight, offset: cardHeight * index, index }
          )}
        />
      ) : (
        <View style={styles.center}>
          <Text style={styles.emptyText}>No stories found.</Text>
        </View>
      )}

      <CategoryDropdown
        visible={categoryModalVisible}
        onClose={() => setCategoryModalVisible(false)}
        categories={allCategories}
        selectedCategory={selectedCategory}
        onSelect={(id: string) => {
          setSelectedCategory(id);
          setCategoryModalVisible(false);
          // Scroll to top when changing category
          flatListRef.current?.scrollToOffset({ offset: 0, animated: false });
        }}
        top={insets.top + 60}
      />

      <StoryDetailsModal
        visible={!!selectedStory}
        story={selectedStory}
        onClose={() => setSelectedStory(null)}
      />

      <ProfileModal
        visible={profileModalVisible}
        onClose={() => setProfileModalVisible(false)}
      />
    </View>
  );
}

