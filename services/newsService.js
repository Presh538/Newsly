import { XMLParser } from 'fast-xml-parser';

const RSS_BASE = "https://rss.nytimes.com/services/xml/rss/nyt";

export const fetchNews = async (category = 'top') => {
    try {
        // Map app categories to NYT RSS feeds
        const categoryMap = {
            'top': 'HomePage.xml',
            'business': 'Business.xml',
            'tech': 'Technology.xml',
            'politics': 'Politics.xml',
            'local': 'US.xml', // Fallback
            'science': 'Science.xml',
            'health': 'Health.xml',
            'entertainment': 'Arts.xml', // Mapping "Entertainment" to "Arts" as requested
            'sports': 'Sports.xml'
        };

        const feedFile = categoryMap[category] || 'HomePage.xml';
        const url = `${RSS_BASE}/${feedFile}`;

        const response = await fetch(url);
        const xmlText = await response.text();

        const parser = new XMLParser({
            ignoreAttributes: false,
            attributeNamePrefix: "@_"
        });
        const jsonObj = parser.parse(xmlText);

        // RSS structure: rss -> channel -> item[]
        const items = jsonObj.rss?.channel?.item || [];
        // Ensure items is an array and Sort by PubDate (Newest First)
        let articles = Array.isArray(items) ? items : [items];

        articles.sort((a, b) => {
            const dateA = new Date(a.pubDate);
            const dateB = new Date(b.pubDate);
            return dateB - dateA; // Descending
        });

        return articles.slice(0, 15).map((item, index) => {
            // Extract image from media:content or media:group
            // fast-xml-parser handles namespaced tags like "media:content" 
            // Check structure console.log if needed, usually it's item['media:content'] or item['media:group']

            let imageUrl = `https://picsum.photos/seed/${index + 100}/800/600`;

            // NYT RSS often puts image in media:content within media:group or directly
            // Key might be "media:content" or "media:group"
            const mediaContent = item['media:content'];
            const mediaGroup = item['media:group'];

            if (mediaContent) {
                // If it's an array, take the biggest/last one, or first
                const target = Array.isArray(mediaContent) ? mediaContent[mediaContent.length - 1] : mediaContent;
                imageUrl = target['@_url'] || imageUrl;
            } else if (mediaGroup && mediaGroup['media:content']) {
                const groupContent = mediaGroup['media:content'];
                const target = Array.isArray(groupContent) ? groupContent[groupContent.length - 1] : groupContent;
                imageUrl = target['@_url'] || imageUrl;
            }

            const cleanDescription = item.description ? stripHtml(item.description) : "";
            const title = item.title || "";
            const link = item.link || "";
            const pubDate = item.pubDate ? new Date(item.pubDate) : new Date();

            return {
                id: item.guid?.['#text'] || link || index.toString(),
                title: title,
                summary: cleanDescription,
                category: category === 'top' ? 'Top News' : category.charAt(0).toUpperCase() + category.slice(1),
                timestamp: timeSince(pubDate),
                image: imageUrl,
                readTime: calculateReadTime(title + " " + cleanDescription),
                details: {
                    whatHappened: title,
                    whyItMatters: cleanDescription, // RSS feeds usually just have description
                    source: "The New York Times"
                },
                url: link
            };
        });

    } catch (error) {
        console.error("Error fetching RSS news:", error);
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
