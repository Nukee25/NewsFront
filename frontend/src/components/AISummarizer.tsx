import { useState } from 'react';

interface AISummarizerProps {
  defaultText?: string;
}

function mockSummarize(text: string): string {
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);
  if (sentences.length === 0) return 'No content to summarize.';
  const count = Math.max(1, Math.ceil(sentences.length * 0.4));
  return sentences.slice(0, count).join('. ') + '.';
}

export default function AISummarizer({ defaultText = '' }: AISummarizerProps) {
  const [text, setText] = useState(defaultText);
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSummarize = () => {
    if (!text.trim()) return;
    setLoading(true);
    setSummary('');
    // Simulate async AI call
    setTimeout(() => {
      setSummary(mockSummarize(text));
      setLoading(false);
    }, 800);
  };

  return (
    <div
      className="rounded-xl p-4 my-4"
      style={{ backgroundColor: '#1f1f1f', border: '1px solid #333' }}
    >
      <h3 className="text-base font-bold mb-3" style={{ color: '#ff3c3c' }}>
        🧠 AI Summarizer
      </h3>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste article text here to summarize..."
        rows={4}
        className="w-full p-3 rounded-lg text-sm resize-none outline-none"
        style={{ backgroundColor: '#2a2a2a', color: 'white', border: '1px solid #444' }}
      />
      <button
        onClick={handleSummarize}
        disabled={loading || !text.trim()}
        className="mt-2 px-4 py-2 rounded-lg text-white text-sm font-semibold cursor-pointer transition-all disabled:opacity-50"
        style={{ backgroundColor: '#ff3c3c', border: 'none' }}
      >
        {loading ? '⏳ Summarizing...' : '✨ Summarize'}
      </button>
      {summary && (
        <div
          className="mt-3 p-3 rounded-lg text-sm"
          style={{ backgroundColor: '#2a2a2a', color: '#ddd', border: '1px solid #444' }}
        >
          <strong style={{ color: '#ff3c3c' }}>Summary:</strong>
          <p className="mt-1 leading-relaxed">{summary}</p>
        </div>
      )}
    </div>
  );
}
