import type { NewsArticle } from '../data/newsData';

interface NewsCardProps {
  article: NewsArticle;
  onClick?: () => void;
  isActive?: boolean;
  compact?: boolean;
}

const TAG_COLORS: Record<string, string> = {
  Breaking: '#ff3c3c',
  'High Impact': '#ff8c00',
  Alert: '#ff3c3c',
  Update: '#4caf50',
  Exclusive: '#9c27b0',
  Trending: '#2196f3',
  Tech: '#00bcd4',
  Environment: '#4caf50',
  Finance: '#ff9800',
};

export default function NewsCard({ article, onClick, isActive = false, compact = false }: NewsCardProps) {
  const tagColor = TAG_COLORS[article.tag] || '#bbb';

  return (
    <div
      onClick={onClick}
      className={`flex rounded-xl overflow-hidden cursor-pointer transition-all duration-200 ${
        onClick ? 'hover:brightness-110' : ''
      } ${isActive ? 'ring-2 ring-red-500' : ''}`}
      style={{ backgroundColor: '#1f1f1f', marginBottom: compact ? '12px' : '25px' }}
    >
      <img
        src={`https://picsum.photos/seed/${article.imageId}/200/150`}
        alt={article.title}
        className="object-cover flex-shrink-0"
        style={{ width: compact ? '38%' : '33%', height: compact ? '90px' : '150px' }}
      />
      <div className="p-3 flex flex-col justify-center" style={{ width: compact ? '62%' : '67%' }}>
        <div
          className="text-xs font-bold uppercase mb-1"
          style={{ color: tagColor }}
        >
          {article.tag}
        </div>
        <h3
          className={`font-semibold m-0 mb-2 ${compact ? 'text-sm' : 'text-base'}`}
          style={{ color: '#ff3c3c' }}
        >
          {article.title}
        </h3>
        <p className={`m-0 ${compact ? 'text-xs' : 'text-sm'}`} style={{ color: '#bbb' }}>
          {article.desc}
        </p>
        {!compact && article.extra && (
          <div className="text-xs mt-1" style={{ color: '#888' }}>
            {article.extra}
          </div>
        )}
      </div>
    </div>
  );
}
