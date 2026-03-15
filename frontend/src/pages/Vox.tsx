import { useState, useRef, useCallback } from 'react';
import { voxHeadlines } from '../data/newsData';
import type { NewsArticle } from '../data/newsData';
import NewsCard from '../components/NewsCard';
import Waveform from '../components/Waveform';

export default function Vox() {
  const [activeArticle, setActiveArticle] = useState<NewsArticle>(voxHeadlines[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const getCardText = (article: NewsArticle) =>
    `${article.tag}. ${article.title}. ${article.desc}`;

  const stopSpeech = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
  }, []);

  const handlePlayPause = () => {
    if (isPlaying) {
      stopSpeech();
    } else {
      const text = getCardText(activeArticle);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 1;
      utterance.onend = () => setIsPlaying(false);
      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
    }
  };

  const handleSelectArticle = (article: NewsArticle) => {
    stopSpeech();
    setActiveArticle(article);
  };

  const visibleHeadlines = isExpanded ? voxHeadlines : voxHeadlines.slice(0, 3);

  return (
    <div
      className="min-h-screen pb-24"
      style={{ backgroundColor: '#0a0f1e', color: 'white' }}
    >
      {/* Header */}
      <header className="px-5 pt-5 pb-3 relative">
        <div
          className="text-2xl font-bold absolute top-4 left-5"
          style={{ color: 'red' }}
        >
          VOX
        </div>
        <div className="flex flex-col items-center pt-10">
          <div className="grow-line mb-2 w-full max-w-xs" style={{ color: 'red' }} />
          <div
            className="text-2xl text-white overflow-hidden whitespace-nowrap"
            style={{
              animation: 'typing 4s steps(30) forwards',
              width: 0,
              borderRight: '3px solid red',
            }}
          >
            Voice Of eXposure
          </div>
          <div
            className="grow-line mt-2 w-full max-w-xs"
            style={{ color: 'red', animationDelay: '4.5s' }}
          />
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex flex-col md:flex-row gap-4 px-4 pt-4">
        {/* Audio Section */}
        <div
          className="flex-1 rounded-2xl p-6 flex flex-col items-center relative overflow-hidden"
          style={{
            backgroundColor: 'rgba(0,0,0,0.75)',
            boxShadow: '0 0 25px rgba(0,200,255,0.4)',
            minHeight: '300px',
          }}
        >
          {/* Animated glow background */}
          <div
            className="absolute inset-0 glow-bg opacity-30 blur-xl rounded-2xl"
            style={{ zIndex: 0 }}
          />

          <div className="relative z-10 w-full flex flex-col items-center">
            <Waveform isPlaying={isPlaying} />

            <button
              onClick={handlePlayPause}
              className="px-6 py-3 rounded-full text-white font-bold text-lg cursor-pointer transition-all hover:brightness-90 mb-4"
              style={{ backgroundColor: 'red', border: 'none' }}
            >
              {isPlaying ? '⏸ Pause' : '▶ Play'}
            </button>

            {/* Now Playing Ticker */}
            {isPlaying && (
              <div
                className="w-full overflow-hidden mt-2"
                style={{ borderTop: '1px solid #333', paddingTop: '8px' }}
              >
                <p className="text-xs mb-1" style={{ color: '#888' }}>
                  Now Playing:
                </p>
                <div className="overflow-hidden">
                  <span
                    className="marquee-text text-sm font-bold"
                    style={{ color: 'yellow' }}
                  >
                    {getCardText(activeArticle)}
                  </span>
                </div>
              </div>
            )}

            {/* Currently Selected Info */}
            {!isPlaying && (
              <div className="mt-2 text-center">
                <p className="text-xs mb-1" style={{ color: '#888' }}>
                  Selected:
                </p>
                <p className="text-sm font-bold" style={{ color: '#ff3c3c' }}>
                  {activeArticle.title}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Headlines Section */}
        <div className="md:w-64 lg:w-72">
          <h3 className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: '#888' }}>
            Select Headline
          </h3>
          {visibleHeadlines.map((article) => (
            <NewsCard
              key={article.id}
              article={article}
              onClick={() => handleSelectArticle(article)}
              isActive={activeArticle.id === article.id}
              compact
            />
          ))}
          <button
            onClick={() => setIsExpanded((e) => !e)}
            className="w-full text-center py-2 font-bold text-2xl cursor-pointer bg-transparent border-none"
            style={{ color: 'red' }}
          >
            {isExpanded ? '▲' : '▼'}
          </button>
        </div>
      </div>
    </div>
  );
}
