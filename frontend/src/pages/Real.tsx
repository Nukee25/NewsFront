import { useState } from 'react';

interface SearchResult {
  query: string;
  summary: string;
  relatedTopics: string[];
}

function mockSearch(query: string): SearchResult {
  return {
    query,
    summary: `You searched for: "${query}". In a fully integrated system, this would fetch real-time news articles, AI-powered analysis, and deep insights from multiple sources. Results would include verified facts, background context, and related stories from diverse perspectives.`,
    relatedTopics: [
      `${query} latest updates`,
      `${query} background context`,
      `${query} expert opinions`,
      `${query} global impact`,
    ],
  };
}

export default function Real() {
  const [searchQuery, setSearchQuery] = useState('');
  const [result, setResult] = useState<SearchResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      setResult(mockSearch(searchQuery));
      setLoading(false);
    }, 700);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div
      className="gradient-bg min-h-screen pb-24"
      style={{ color: 'white' }}
    >
      {/* Header */}
      <header className="px-5 pt-5 pb-3">
        <h1
          className="text-5xl font-bold m-0 tracking-widest"
          style={{ color: '#00bfff', textShadow: '0 0 15px rgba(0,191,255,0.8)' }}
        >
          REAL
        </h1>
        <div className="mt-2">
          <div
            className="grow-line mb-2"
            style={{ color: '#00bfff', maxWidth: '340px' }}
          />
          <p
            className="text-xl overflow-hidden whitespace-nowrap"
            style={{
              textShadow: '0 0 8px rgba(0,191,255,0.7)',
              animation: 'typing 3s steps(35) forwards',
              width: 0,
              borderRight: '3px solid transparent',
            }}
          >
            Revealing Every Actual Layer
          </p>
          <div
            className="grow-line mt-2"
            style={{ color: '#00bfff', maxWidth: '340px', animationDelay: '3s' }}
          />
        </div>
      </header>

      {/* Search Section */}
      <div className="flex flex-col items-center px-4 pt-6">
        <h2 className="text-2xl font-semibold mb-6 text-center" style={{ textShadow: '0 0 12px rgba(255,255,255,0.4)' }}>
          Look for <strong>WHAT YOU SEEK</strong>
        </h2>

        <div
          className="w-full max-w-xl rounded-full px-6 py-4 flex items-center"
          style={{
            backgroundColor: 'rgba(30,30,30,0.9)',
            boxShadow: '0 0 20px rgba(0,191,255,0.5)',
          }}
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything..."
            className="flex-1 bg-transparent border-none outline-none text-white text-lg"
            style={{ caretColor: '#00bfff' }}
          />
          <button
            onClick={handleSearch}
            className="ml-3 px-4 py-2 rounded-full text-white font-semibold text-sm cursor-pointer transition-all hover:brightness-90"
            style={{ backgroundColor: '#00bfff', border: 'none', color: '#000' }}
          >
            Search
          </button>
        </div>

        {/* Results */}
        {loading && (
          <div className="mt-8 text-center" style={{ color: '#00bfff' }}>
            <p className="text-lg animate-pulse">🔍 Searching the layers...</p>
          </div>
        )}

        {result && !loading && (
          <div
            className="w-full max-w-xl mt-6 p-5 rounded-xl text-left"
            style={{
              backgroundColor: 'rgba(20,20,20,0.85)',
              boxShadow: '0 0 15px rgba(0,191,255,0.3)',
              color: '#ddd',
            }}
          >
            <h3 className="text-lg font-bold mb-3" style={{ color: '#00bfff' }}>
              🌐 Results for "{result.query}"
            </h3>
            <p className="text-sm leading-relaxed mb-4">{result.summary}</p>
            <div>
              <p className="text-xs font-bold mb-2 uppercase tracking-widest" style={{ color: '#00bfff' }}>
                Related Topics
              </p>
              <div className="flex flex-wrap gap-2">
                {result.relatedTopics.map((topic, i) => (
                  <button
                    key={i}
                    onClick={() => { setSearchQuery(topic); }}
                    className="text-xs px-3 py-1 rounded-full cursor-pointer transition-all hover:brightness-110"
                    style={{
                      backgroundColor: 'rgba(0,191,255,0.15)',
                      color: '#00bfff',
                      border: '1px solid rgba(0,191,255,0.4)',
                    }}
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
