import { useState, useEffect } from 'react';
import { newsData } from '../data/newsData';
import NewsCard from '../components/NewsCard';
import ChatBot from '../components/ChatBot';
import AISummarizer from '../components/AISummarizer';

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return 'Good Morning!';
  if (hour >= 12 && hour < 17) return 'Good Afternoon!';
  if (hour >= 17 && hour < 21) return 'Good Evening!';
  return 'Hey, great to see you around!';
}

export default function Rise() {
  const [visibleCount, setVisibleCount] = useState(2);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSummarizer, setShowSummarizer] = useState(false);

  const filteredNews = newsData.filter(
    (article) =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tag.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const visibleNews = filteredNews.slice(0, visibleCount);
  const hasMore = visibleCount < filteredNews.length;

  const handleLoadMore = () => {
    setVisibleCount((c) => Math.min(c + 2, filteredNews.length));
  };

  useEffect(() => {
    setVisibleCount(2);
  }, [searchQuery]);

  return (
    <div className="min-h-screen pb-24" style={{ backgroundColor: '#121212' }}>
      {/* Header */}
      <div className="relative pt-12 px-4">
        <span
          className="absolute top-3 left-4 text-lg font-bold font-broadway"
          style={{ color: 'white', textShadow: '2px 2px 5px #000' }}
        >
          {getGreeting()}
        </span>
        <div
          className="typing-animation font-broadway text-2xl font-bold uppercase text-red-500 mb-4 mt-4"
          style={{ color: '#ff0000' }}
        >
          WELCOME TO NEWS FRONT,
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-4 mb-4">
        <div
          className="flex items-center rounded-full px-4 py-2"
          style={{ backgroundColor: '#1f1f1f', border: '1px solid #333' }}
        >
          <span className="mr-2 text-gray-400">🔍</span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search news..."
            className="flex-1 bg-transparent outline-none text-white text-sm"
            style={{ caretColor: '#ff3c3c' }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-gray-400 bg-transparent border-none cursor-pointer text-lg ml-2"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* AI Summarizer Toggle */}
      <div className="px-4 mb-4">
        <button
          onClick={() => setShowSummarizer((s) => !s)}
          className="text-sm px-3 py-1.5 rounded-lg font-semibold transition-all"
          style={{
            backgroundColor: showSummarizer ? '#ff3c3c' : '#2a2a2a',
            color: 'white',
            border: '1px solid #444',
          }}
        >
          🧠 {showSummarizer ? 'Hide' : 'Show'} AI Summarizer
        </button>
      </div>

      {showSummarizer && (
        <div className="px-4">
          <AISummarizer />
        </div>
      )}

      {/* News Cards */}
      <div className="px-4">
        {visibleNews.length === 0 ? (
          <div className="text-center py-12" style={{ color: '#888' }}>
            <p className="text-lg">No news found for "{searchQuery}"</p>
          </div>
        ) : (
          visibleNews.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))
        )}
      </div>

      {/* Load More */}
      {hasMore && (
        <div className="flex justify-center mb-6 px-4">
          <button
            onClick={handleLoadMore}
            className="px-5 py-3 rounded-lg text-white font-semibold text-base cursor-pointer transition-all hover:brightness-90"
            style={{ backgroundColor: '#ff3c3c', border: 'none' }}
          >
            ▼ Load More News
          </button>
        </div>
      )}

      {/* Chatbot */}
      <ChatBot />
    </div>
  );
}
