import React from 'react';
import { type BlogEntry2 } from '../types';

interface BlogSectionProps {
  entries: BlogEntry2[];
  isTeacherView?: boolean;
}

const BlogSection: React.FC<BlogSectionProps> = ({ entries, isTeacherView = false }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'help': return '🆘';
      case 'goal': return '🎯';
      case 'reflection': return '💭';
      case 'achievement': return '🏆';
      case 'karma': return '⭐';
      case 'feedback': return '💬';
      case 'reminder': return '🔔';
      case 'grade': return '📊';
      case 'competence': return '🛠️';
      case 'question': return '❓';
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
      case 'help': return 'Hilfe benötigt';
      case 'goal': return 'Neues Ziel';
      case 'reflection': return 'Schülerreflexion';
      case 'achievement': return 'Erfolg';
      case 'karma': return 'Karma';
      case 'feedback': return 'Feedback';
      case 'reminder': return 'Erinnerung';
      case 'grade': return 'Note';
      case 'competence': return 'Kompetenz';
      case 'question': return 'Frage';
      default: return 'Info';
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case 'help': return 'bg-red-50 border-red-200';
      case 'goal': return 'bg-green-50 border-green-200';
      case 'reflection': return 'bg-purple-50 border-purple-200';
      case 'achievement': return 'bg-amber-50 border-amber-200';
      case 'karma': return 'bg-yellow-50 border-yellow-200';
      case 'feedback': return 'bg-cyan-50 border-cyan-200';
      case 'reminder': return 'bg-orange-50 border-orange-200';
      case 'grade': return 'bg-blue-50 border-blue-200';
      case 'competence': return 'bg-indigo-50 border-indigo-200';
      case 'question': return 'bg-pink-50 border-pink-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="mb-4 pb-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800">
          {isTeacherView ? 'Schüleraktivitäten' : 'Schüler-Blog'}
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          {isTeacherView 
            ? 'Alle Aktivitäten und Anfragen Ihrer Schüler' 
            : 'Alle Aktivitäten und Neuigkeiten'}
        </p>
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
                  {isTeacherView && 'student' in entry && (
                    <span className="text-xs bg-primary-100 text-primary-800 px-2 py-0.5 rounded-full">
                      {(entry as any).student}
                    </span>
                  )}
                  {isTeacherView && 'subject' in entry && (
                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">
                      {(entry as any).subject}
                    </span>
                  )}
                </div>
                <span className="text-xs text-gray-500">{entry.date}</span>
              </div>
              <p className="text-sm text-gray-700 mt-2">{entry.content}</p>
              
              {isTeacherView && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <div className="flex space-x-2">
                    <button className="text-xs px-3 py-1 bg-primary-500 text-gray-700  rounded hover:bg-primary-600 transition-colors">
                      Feedback geben
                    </button>
                    <button className="text-xs px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors">
                      Als erledigt markieren
                    </button>
                    <button className="text-xs px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors">
                      Schülerprofil öffnen
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div className="pt-4 border-t border-gray-200 mt-4">
        <p className="text-xs text-gray-500 text-center">
          {entries.length} Einträge insgesamt
          {isTeacherView && ' • ' + entries.filter(e => e.type === 'help').length + ' Hilfe-Anfragen'}
        </p>
      </div>
    </div>
  );
};

export default BlogSection;