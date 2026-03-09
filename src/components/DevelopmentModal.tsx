import React from 'react';
import Modal from './Modal';
import { type CompetenceAssessment } from '../types';

interface DevelopmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  competence: CompetenceAssessment | null;
  allCompetences: CompetenceAssessment[] | null;
}

const DevelopmentModal: React.FC<DevelopmentModalProps> = ({ 
  isOpen, 
  onClose, 
  competence,
  allCompetences 
}) => {
  const title = competence 
    ? `Entwicklung: ${competence.name}` 
    : 'Entwicklung aller Kompetenzen';

  const getLevelColor = (level: number) => {
    const colors = [
      'bg-red-100 text-red-800',
      'bg-yellow-100 text-yellow-800',
      'bg-green-100 text-green-800',
      'bg-blue-100 text-blue-800'
    ];
    return colors[level - 1] || 'bg-gray-100 text-gray-800';
  };

  const getLevelLabel = (level: number) => {
    const labels = ['Anfänger', 'Fortgeschritten', 'Kompetent', 'Experte'];
    return labels[level - 1] || `Stufe ${level}`;
  };

  const renderSingleCompetence = () => {
    if (!competence) return null;

    return (
      <div className="space-y-6">
        {/* Übersicht */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600">Aktuelle Stufe</div>
            <div className={`text-2xl font-bold mt-1 ${getLevelColor(competence.currentLevel)} px-3 py-2 rounded-lg inline-block`}>
              Stufe {competence.currentLevel}
            </div>
            <div className="text-sm text-gray-700 mt-1">{getLevelLabel(competence.currentLevel)}</div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600">Vorherige Stufe</div>
            <div className={`text-2xl font-bold mt-1 ${getLevelColor(competence.previousLevel || 1)} px-3 py-2 rounded-lg inline-block`}>
              Stufe {competence.previousLevel || '-'}
            </div>
            <div className="text-sm text-gray-700 mt-1">
              {competence.previousLevel ? getLevelLabel(competence.previousLevel) : 'Keine Vorstufe'}
            </div>
          </div>
        </div>

        {/* Entwicklungsverlauf */}
        <div>
          <h4 className="text-lg font-medium text-gray-800 mb-4">Entwicklungsverlauf</h4>
          <div className="space-y-4">
            {competence.history.map((entry, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getLevelColor(entry.level)}`}>
                    <span className="font-bold">{entry.level}</span>
                  </div>
                </div>
                <div className="flex-1 border-b border-gray-200 pb-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h5 className="font-medium text-gray-900">
                        {getLevelLabel(entry.level)} (Stufe {entry.level})
                      </h5>
                      <p className="text-sm text-gray-600">
                        Bewertet von: {entry.assessedBy === 'self' ? 'Selbsteinschätzung' : 'Lehrer'}
                      </p>
                    </div>
                    <span className="text-sm text-gray-500">{entry.date}</span>
                  </div>
                  {index < competence.history.length - 1 && (
                    <div className="mt-2 text-xs text-gray-500">
                      {entry.level < competence.history[index + 1].level ? '↗ Verbesserung' : 
                       entry.level > competence.history[index + 1].level ? '↘ Rückgang' : '→ Gleichbleibend'}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fortschritts-Diagramm */}
        <div>
          <h4 className="text-lg font-medium text-gray-800 mb-4">Fortschrittsverlauf</h4>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-end h-32 space-x-2">
              {competence.history.map((entry, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div 
                    className={`w-full ${getLevelColor(entry.level).split(' ')[0]} rounded-t-lg`}
                    style={{ height: `${entry.level * 25}%` }}
                  ></div>
                  <div className="text-xs text-gray-600 mt-2">{entry.date}</div>
                  <div className="text-sm font-medium mt-1">Stufe {entry.level}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderAllCompetences = () => {
    if (!allCompetences) return null;

    return (
      <div className="space-y-6">
        {/* Entwicklungsübersicht */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <div className="text-2xl font-bold text-green-700">
              {allCompetences.filter(c => c.currentLevel > (c.previousLevel || 0)).length}
            </div>
            <div className="text-sm text-green-600">Verbesserte Kompetenzen</div>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <div className="text-2xl font-bold text-yellow-700">
              {allCompetences.filter(c => c.currentLevel === (c.previousLevel || 0)).length}
            </div>
            <div className="text-sm text-yellow-600">Stabile Kompetenzen</div>
          </div>
          
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <div className="text-2xl font-bold text-red-700">
              {allCompetences.filter(c => c.currentLevel < (c.previousLevel || 0)).length}
            </div>
            <div className="text-sm text-red-600">Rückläufige Kompetenzen</div>
          </div>
        </div>

        {/* Detailtabelle */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 text-left border border-gray-300">Kompetenz</th>
                <th className="p-3 text-center border border-gray-300">Start</th>
                <th className="p-3 text-center border border-gray-300">Aktuell</th>
                <th className="p-3 text-center border border-gray-300">Veränderung</th>
                <th className="p-3 text-center border border-gray-300">Trend</th>
              </tr>
            </thead>
            <tbody>
              {allCompetences.map((comp) => {
                const change = comp.currentLevel - (comp.previousLevel || 0);
                const startLevel = comp.history[0]?.level || 1;
                
                return (
                  <tr key={comp.id} className="hover:bg-gray-50">
                    <td className="p-3 border border-gray-300">
                      <div className="font-medium">{comp.name}</div>
                      <div className="text-xs text-gray-500">{comp.category}</div>
                    </td>
                    
                    <td className="p-3 border border-gray-300 text-center">
                      <div className={`px-2 py-1 rounded-full ${getLevelColor(startLevel)} inline-block`}>
                        Stufe {startLevel}
                      </div>
                    </td>
                    
                    <td className="p-3 border border-gray-300 text-center">
                      <div className={`px-2 py-1 rounded-full ${getLevelColor(comp.currentLevel)} inline-block`}>
                        Stufe {comp.currentLevel}
                      </div>
                    </td>
                    
                    <td className="p-3 border border-gray-300 text-center">
                      <div className={`font-medium ${
                        change > 0 ? 'text-green-600' : 
                        change < 0 ? 'text-red-600' : 'text-gray-600'
                      }`}>
                        {change > 0 ? '+' : ''}{change} Stufen
                      </div>
                    </td>
                    
                    <td className="p-3 border border-gray-300 text-center">
                      <div className="flex items-center justify-center">
                        {change > 0 ? (
                          <span className="text-green-500 text-lg">↗</span>
                        ) : change < 0 ? (
                          <span className="text-red-500 text-lg">↘</span>
                        ) : (
                          <span className="text-gray-500 text-lg">→</span>
                        )}
                        <span className="ml-2 text-sm">
                          {change > 0 ? 'Steigend' : change < 0 ? 'Fallend' : 'Stabil'}
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Entwicklungsempfehlungen */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-800 mb-2">Entwicklungsempfehlungen</h4>
          <ul className="space-y-2 text-sm text-blue-700">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Fokussiere auf Kompetenzen mit Stufe 1 oder 2 für größte Verbesserung</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Stabile Kompetenzen können durch Übung weiter entwickelt werden</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Besprich deine Entwicklung regelmäßig mit deinem Lehrer</span>
            </li>
          </ul>
        </div>
      </div>
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="xl"
    >
      {competence ? renderSingleCompetence() : renderAllCompetences()}
    </Modal>
  );
};

export default DevelopmentModal;