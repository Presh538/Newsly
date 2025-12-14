const API_KEY = "e21f2c537dd44915a1267f8ec39fc4da"; // User: Replace with World News API Key
const BASE_URL = "https://api.worldnewsapi.com/search-news";

export const fetchNews = async (category = 'top') => {
    if (API_KEY === "YOUR_WORLD_NEWS_API_KEY") {
        console.warn("World News API Key is missing. Please add it to newsService.js");
        return [];
    }

    try {
        // Map app categories to World News API categories
        const categoryMap = {
            'top': '', // No category = mixed top news
            'business': 'business',
            'tech': 'technology',
            'politics': 'politics',
            'local': '', // World News API doesn't have local, falls back to general US news
            'science': 'science',
            'health': 'health',
            'entertainment': 'entertainment',
            'sports': 'sports'
        };

        const apiCategory = categoryMap[category] || '';

        // Build query parameters
        const params = new URLSearchParams({
            'source-countries': 'us',
            'language': 'en',
            'number': '15', // Limit
        });

        if (apiCategory) {
            params.append('categories', apiCategory);
        }

        const url = `${BASE_URL}?${params.toString()}`;

        const response = await fetch(url, {
            headers: {
                'x-api-key': API_KEY
            }
        });

        const data = await response.json();
        const articles = data.news || [];

        return articles.map((item, index) => {
            // World News API fields: id, title, text, summary, url, image, publish_date

            // Clean up text content
            const cleanDescription = item.summary ? stripHtml(item.summary) : "";
            const cleanContent = item.text ? stripHtml(item.text) : cleanDescription;
            const readTime = calculateReadTime((item.text || item.summary || "") + " " + item.title);

            return {
                id: item.id?.toString() || index.toString(),
                title: item.title,
                summary: cleanDescription.slice(0, 150) + (cleanDescription.length > 150 ? '...' : ''),
                category: category === 'top' ? 'Top News' : category.charAt(0).toUpperCase() + category.slice(1),
                timestamp: timeSince(new Date(item.publish_date)),
                image: item.image || `https://picsum.photos/seed/${index}/800/1200`,
                readTime: readTime,
                details: {
                    whatHappened: item.title,
                    whyItMatters: cleanDescription, // World News API doesn't separate this, reusing summary
                    source: item.author || "World News" // Sometimes fields are 'authors' array
                },
                url: item.url
            };
        });

    } catch (error) {
        console.error("Error fetching news:", error);
        return [];
    }
};

const stripHtml = (html) => {
    if (!html) return "";
    return html
        .replace(/<[^>]*>?/gm, '')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&apos;/g, "'")
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/\[\+\d+\schars\]/, '') // Remove " [+1234 chars]" suffix common in NewsAPI
        .trim();
};

const timeSince = (date) => {
    const seconds = Math.floor((new Date() - date) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + "y ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + "mo ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + "d ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + "h ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + "m ago";
    return Math.floor(seconds) + "s ago";
};

const calculateReadTime = (text) => {
    if (!text) return "1 MIN READ";
    const wordsPerMinute = 200;
    const words = text.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} MIN READ`;
};
