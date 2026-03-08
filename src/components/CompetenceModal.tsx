import React, { useState } from 'react';
import Modal from './Modal';

interface CompetenceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CompetenceModal: React.FC<CompetenceModalProps> = ({ isOpen, onClose }) => {
  const [assessments, setAssessments] = useState<{[key: string]: number}>({});

  const competences = [
    { id: 'self1', category: 'Selbst', name: 'Durchhaltefähigkeit', color: 'bg-blue-100' },
    { id: 'self2', category: 'Selbst', name: 'Selbstorganisation', color: 'bg-blue-100' },
    { id: 'self3', category: 'Selbst', name: 'Reflexionsfähigkeit', color: 'bg-blue-100' },
    { id: 'social1', category: 'Sozial', name: 'Teamfähigkeit', color: 'bg-green-100' },
    { id: 'social2', category: 'Sozial', name: 'Kommunikation', color: 'bg-green-100' },
    { id: 'social3', category: 'Sozial', name: 'Konfliktfähigkeit', color: 'bg-green-100' },
    { id: 'method1', category: 'Methoden', name: 'Informationsbeschaffung', color: 'bg-purple-100' },
    { id: 'method2', category: 'Methoden', name: 'Präsentation', color: 'bg-purple-100' },
    { id: 'method3', category: 'Methoden', name: 'Problemlösen', color: 'bg-purple-100' },
  ];

  const levels = [
    { level: 1, label: 'Anfänger', color: 'bg-red-100 text-red-800' },
    { level: 2, label: 'Fortgeschritten', color: 'bg-yellow-100 text-yellow-800' },
    { level: 3, label: 'Kompetent', color: 'bg-green-100 text-green-800' },
    { level: 4, label: 'Experte', color: 'bg-blue-100 text-blue-800' },
  ];

  const handleAssessment = (competenceId: string, level: number) => {
    setAssessments(prev => ({
      ...prev,
      [competenceId]: level
    }));
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Kompetenzraster - Selbsteinschätzung"
      size="xl"
    >
      <div className="space-y-6">
        {/* Legende */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Legende</h4>
          <div className="grid grid-cols-4 gap-2">
            {levels.map((lvl) => (
              <div key={lvl.level} className={`${lvl.color} p-2 rounded text-center`}>
                <div className="font-medium">Stufe {lvl.level}</div>
                <div className="text-xs">{lvl.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Kompetenz-Raster */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 text-left border">Kompetenz</th>
                <th className="p-3 text-center border">Stufe 1</th>
                <th className="p-3 text-center border">Stufe 2</th>
                <th className="p-3 text-center border">Stufe 3</th>
                <th className="p-3 text-center border">Stufe 4</th>
                <th className="p-3 text-center border">Deine Einschätzung</th>
              </tr>
            </thead>
            <tbody>
              {competences.map((comp) => {
                const currentLevel = assessments[comp.id] || 0;
                
                return (
                  <tr key={comp.id} className="hover:bg-gray-50">
                    <td className="p-3 border">
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${comp.color}`}></div>
                        <div>
                          <div className="font-medium">{comp.name}</div>
                          <div className="text-xs text-gray-500">{comp.category}kompetenz</div>
                        </div>
                      </div>
                    </td>
                    
                    {levels.map((lvl) => (
                      <td key={lvl.level} className="p-3 border text-center">
                        <button
                          onClick={() => handleAssessment(comp.id, lvl.level)}
                          className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto ${
                            currentLevel === lvl.level
                              ? `${lvl.color} ring-2 ring-offset-1 ring-current`
                              : 'bg-gray-100 hover:bg-gray-200'
                          }`}
                        >
                          {currentLevel === lvl.level ? '✓' : lvl.level}
                        </button>
                      </td>
                    ))}
                    
                    <td className="p-3 border text-center">
                      {currentLevel > 0 ? (
                        <span className={`px-3 py-1 rounded-full ${levels[currentLevel - 1].color}`}>
                          Stufe {currentLevel}
                        </span>
                      ) : (
                        <span className="text-gray-400">Noch nicht bewertet</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Zusammenfassung */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {Object.keys(assessments).length}
            </div>
            <div className="text-sm text-blue-700">bewertete Kompetenzen</div>
          </div>
          
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {Object.values(assessments).length > 0 
                ? (Object.values(assessments).reduce((a, b) => a + b, 0) / Object.values(assessments).length).toFixed(1)
                : '0.0'
              }
            </div>
            <div className="text-sm text-green-700">Durchschnittsstufe</div>
          </div>
          
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">
              {Math.max(...Object.values(assessments), 0)}
            </div>
            <div className="text-sm text-purple-700">Höchste Stufe</div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CompetenceModal;