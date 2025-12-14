export const categories = [
    { id: 'top', name: 'Top Stories' },
    { id: 'business', name: 'Business' },
    { id: 'tech', name: 'Tech' },
    { id: 'politics', name: 'Politics' },
    { id: 'local', name: 'Local' },
];

export const stories = [
    {
        id: '1',
        title: "Global Markets Rally Following New Trade Agreement",
        summary: "Major indices hit record highs today as the new international trade deal promises to reduce tariffs and boost cross-border commerce significantly.",
        category: "Business",
        timestamp: "2h ago",
        image: "https://images.unsplash.com/photo-1611974765270-ca1258634369?q=80&w=1000&auto=format&fit=crop",
        details: {
            whatHappened: "A landmark trade agreement was signed by 15 nations, eliminating tariffs on over 90% of goods.",
            whyItMatters: "This reduces costs for consumers and opens new markets for businesses, potentially adding trillions to the global economy.",
            source: "Bloomberg"
        },
        url: "https://www.bloomberg.com/news/articles/2024-01-01/global-markets-rally-on-trade-deal",
        readTime: "3 MIN READ"
    },
    {
        id: '2',
        title: "Breakthrough in Renewable Energy Storage",
        summary: "Scientists have unveiled a new battery technology that doubles energy density while halving production costs, a potential game-changer for EVs.",
        category: "Tech",
        timestamp: "4h ago",
        image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1000&auto=format&fit=crop",
        details: {
            whatHappened: "Researchers at MIT demonstrated a solid-state battery that charges in 5 minutes and lasts 20 years.",
            whyItMatters: "Cheaper, faster-charging batteries remove the biggest hurdle to electric vehicle adoption.",
            source: "TechCrunch"
        },
        url: "https://techcrunch.com/2024/01/02/new-battery-tech-breakthrough/",
        readTime: "5 MIN READ"
    },
    {
        id: '3',
        title: "City Council Approves New Downtown Park",
        summary: "After months of debate, the city council voted 7-2 to transform the old industrial district into a 50-acre green space.",
        category: "Local",
        timestamp: "6h ago",
        image: "https://images.unsplash.com/photo-1496664444929-8c75efb9546f?q=80&w=1000&auto=format&fit=crop",
        details: {
            whatHappened: "The 'Green Lung' project will replace parking lots with trees, lakes, and walking paths.",
            whyItMatters: "It addresses the city's lack of green space and is expected to boost mental health and property values.",
            source: "Local Gazette"
        },
        url: "https://www.localgazette.com/news/city-council-approves-park",
        readTime: "2 MIN READ"
    },
    {
        id: '4',
        title: "AI Regulation Bill Passes Senate",
        summary: "The comprehensive AI safety bill, requiring transparency and safety testing for large models, has passed with bipartisan support.",
        category: "Politics",
        timestamp: "1h ago",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000&auto=format&fit=crop",
        details: {
            whatHappened: "Legislators agreed on framework that demands watermarking of AI content and liability for harms.",
            whyItMatters: "This sets the first major legal standard for AI development in the western world.",
            source: "Reuters"
        },
        url: "https://www.reuters.com/technology/ai-bill-passes-senate",
        readTime: "6 MIN READ"
    },
    {
        id: '5',
        title: "New Space Telescope Sends First Images",
        summary: "The Sentinel-X telescope has returned breathtaking high-resolution images of the Andromeda galaxy, revealing previously unseen star clusters.",
        category: "Tech",
        timestamp: "30m ago",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop",
        details: {
            whatHappened: "NASA's latest observatory successfully deployed its mirrors and began transmitting data.",
            whyItMatters: "It could help key questions about the formation of the early universe.",
            source: "NASA/AP"
        },
        url: "https://www.nasa.gov/mission_pages/sentinel-x/first-images",
        readTime: "4 MIN READ"
    }
];
