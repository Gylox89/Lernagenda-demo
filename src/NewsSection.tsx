import React from 'react';

interface NewsItem {
  id: number;
  type: 'karma' | 'reflection' | 'goal' | 'grade' | 'reminder';
  content: string;
}

interface NewsSectionProps {
  news: NewsItem[];
}

const NewsSection: React.FC<NewsSectionProps> = ({ news }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'karma': return '⭐';
      case 'reflection': return '💭';
      case 'goal': return '🎯';
      case 'grade': return '📊';
      case 'reminder': return '🔔';
      default: return '📢';
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case 'karma': return 'bg-yellow-50 border-l-4 border-yellow-400';
      case 'reflection': return 'bg-purple-50 border-l-4 border-purple-400';
      case 'goal': return 'bg-green-50 border-l-4 border-green-400';
      case 'grade': return 'bg-blue-50 border-l-4 border-blue-400';
      case 'reminder': return 'bg-red-50 border-l-4 border-red-400';
      default: return 'bg-gray-50 border-l-4 border-gray-400';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-3 mb-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold text-gray-800">Neuigkeiten</h2>
        <span className="text-xs text-gray-500">{news.length} neue</span>
      </div>
      
      <div className="space-y-2">
        {news.map((item) => (
          <div 
            key={item.id} 
            className={`${getColor(item.type)} p-2 rounded-r flex items-start space-x-2`}
          >
            <span className="text-lg mt-0.5">{getIcon(item.type)}</span>
            <p className="text-sm text-gray-700 flex-1">{item.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsSection;