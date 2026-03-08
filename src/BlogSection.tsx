import React from 'react';
import type { BlogEntry } from './types';

interface BlogSectionProps {
  entries: BlogEntry[];
}

const BlogSection: React.FC<BlogSectionProps> = ({ entries }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'karma': return '⭐';
      case 'reflection': return '💭';
      case 'goal': return '🎯';
      case 'grade': return '📊';
      case 'reminder': return '🔔';
      case 'achievement': return '🏆';
      case 'feedback': return '💬';
      case 'event': return '📅';
      default: return '📢';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'karma': return 'Karma';
      case 'reflection': return 'Reflexion';
      case 'goal': return 'Ziel';
      case 'grade': return 'Note';
      case 'reminder': return 'Erinnerung';
      case 'achievement': return 'Erfolg';
      case 'feedback': return 'Feedback';
      case 'event': return 'Event';
      default: return 'Info';
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case 'karma': return 'bg-yellow-50 border-yellow-200';
      case 'reflection': return 'bg-purple-50 border-purple-200';
      case 'goal': return 'bg-green-50 border-green-200';
      case 'grade': return 'bg-blue-50 border-blue-200';
      case 'reminder': return 'bg-red-50 border-red-200';
      case 'achievement': return 'bg-amber-50 border-amber-200';
      case 'feedback': return 'bg-cyan-50 border-cyan-200';
      case 'event': return 'bg-indigo-50 border-indigo-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="mb-4 pb-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800">Blog</h2>
        <p className="text-sm text-gray-600 mt-1">Alle Aktivitäten und Neuigkeiten</p>
      </div>
      
      <div className="flex-1 overflow-y-auto pr-2 -mr-2 scrollbar-thin">
        <div className="space-y-3 pb-4">
          {entries.map((entry) => (
            <div 
              key={entry.id}
              className={`${getColor(entry.type)} border rounded-lg p-3 transition-all hover:shadow-sm`}
            >
              <div className="flex items-start justify-between mb-1">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{getIcon(entry.type)}</span>
                  <span className="text-xs font-medium text-gray-600 px-2 py-0.5 rounded-full bg-white">
                    {getTypeLabel(entry.type)}
                  </span>
                  {entry.isNew && (
                    <span className="text-xs bg-primary-500 text-white px-2 py-0.5 rounded-full">
                      Neu
                    </span>
                  )}
                </div>
                <span className="text-xs text-gray-500">{entry.date}</span>
              </div>
              <p className="text-sm text-gray-700 mt-2">{entry.content}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default BlogSection;