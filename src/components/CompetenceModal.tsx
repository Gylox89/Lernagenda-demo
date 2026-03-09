import React, { useState } from 'react';
import Modal from './Modal';
import DevelopmentModal from './DevelopmentModal';
import { type CompetenceAssessment } from '../types';

interface CompetenceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CompetenceModal: React.FC<CompetenceModalProps> = ({ isOpen, onClose }) => {
  const [showDevelopmentModal, setShowDevelopmentModal] = useState(false);
  const [selectedCompetence, setSelectedCompetence] = useState<string | null>(null);

  // Vorgegebene Kompetenzbewertungen (bereits gesetzt)
  const competences: CompetenceAssessment[] = [
    {
      id: 'self1',
      category: 'Selbstkompetenz',
      name: 'Durchhaltefähigkeit',
      color: 'bg-blue-100',
      currentLevel: 3,
      previousLevel: 2,
      history: [
        { date: '01.09.2023', level: 1, assessedBy: 'teacher' },
        { date: '15.10.2023', level: 2, assessedBy: 'teacher' },
        { date: '15.11.2023', level: 3, assessedBy: 'teacher' },
      ]
    },
    {
      id: 'self2',
      category: 'Selbstkompetenz',
      name: 'Selbstorganisation',
      color: 'bg-blue-100',
      currentLevel: 2,
      previousLevel: 1,
      history: [
        { date: '01.09.2023', level: 1, assessedBy: 'teacher' },
        { date: '15.11.2023', level: 2, assessedBy: 'teacher' },
      ]
    },
    {
      id: 'self3',
      category: 'Selbstkompetenz',
      name: 'Reflexionsfähigkeit',
      color: 'bg-blue-100',
      currentLevel: 4,
      previousLevel: 3,
      history: [
        { date: '01.09.2023', level: 2, assessedBy: 'teacher' },
        { date: '01.10.2023', level: 3, assessedBy: 'teacher' },
        { date: '15.11.2023', level: 4, assessedBy: 'teacher' },
      ]
    },
    {
      id: 'social1',
      category: 'Sozialkompetenz',
      name: 'Teamfähigkeit',
      color: 'bg-green-100',
      currentLevel: 3,
      previousLevel: 2,
      history: [
        { date: '01.09.2023', level: 2, assessedBy: 'teacher' },
        { date: '15.11.2023', level: 3, assessedBy: 'teacher' },
      ]
    },
    {
      id: 'social2',
      category: 'Sozialkompetenz',
      name: 'Kommunikation',
      color: 'bg-green-100',
      currentLevel: 2,
      previousLevel: 2,
      history: [
        { date: '01.09.2023', level: 2, assessedBy: 'teacher' },
        { date: '15.11.2023', level: 2, assessedBy: 'self' },
      ]
    },
    {
      id: 'social3',
      category: 'Sozialkompetenz',
      name: 'Konfliktfähigkeit',
      color: 'bg-green-100',
      currentLevel: 1,
      previousLevel: 1,
      history: [
        { date: '01.09.2023', level: 1, assessedBy: 'teacher' },
        { date: '15.11.2023', level: 1, assessedBy: 'teacher' },
      ]
    },
    {
      id: 'method1',
      category: 'Methodenkompetenz',
      name: 'Informationsbeschaffung',
      color: 'bg-purple-100',
      currentLevel: 3,
      previousLevel: 2,
      history: [
        { date: '01.09.2023', level: 2, assessedBy: 'teacher' },
        { date: '01.11.2023', level: 3, assessedBy: 'self' },
      ]
    },
    {
      id: 'method2',
      category: 'Methodenkompetenz',
      name: 'Präsentation',
      color: 'bg-purple-100',
      currentLevel: 2,
      previousLevel: 1,
      history: [
        { date: '01.09.2023', level: 1, assessedBy: 'teacher' },
        { date: '15.11.2023', level: 2, assessedBy: 'teacher' },
      ]
    },
    {
      id: 'method3',
      category: 'Methodenkompetenz',
      name: 'Problemlösen',
      color: 'bg-purple-100',
      currentLevel: 3,
      previousLevel: 2,
      history: [
        { date: '01.09.2023', level: 2, assessedBy: 'teacher' },
        { date: '15.10.2023', level: 3, assessedBy: 'teacher' },
      ]
    },
  ];

  const levels = [
    { level: 1, label: 'Anfänger', color: 'bg-red-100 text-red-800', icon: '🌱' },
    { level: 2, label: 'Fortgeschritten', color: 'bg-yellow-100 text-yellow-800', icon: '🌿' },
    { level: 3, label: 'Kompetent', color: 'bg-green-100 text-green-800', icon: '🌳' },
    { level: 4, label: 'Experte', color: 'bg-blue-100 text-blue-800', icon: '🏆' },
  ];

  const handleViewDevelopment = (competenceId: string) => {
    setSelectedCompetence(competenceId);
    setShowDevelopmentModal(true);
  };

  const getLevelColor = (level: number) => {
    return levels.find(l => l.level === level)?.color || 'bg-gray-100 text-gray-800';
  };

  const getLevelIcon = (level: number) => {
    return levels.find(l => l.level === level)?.icon || '○';
  };

  const getProgress = (comp: CompetenceAssessment) => {
    if (!comp.previousLevel) return 0;
    return ((comp.currentLevel - comp.previousLevel) / 3) * 100;
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Handlungskompetenzen - Aktueller Stand"
        size="xl"
      >
        <div className="space-y-6">
          {/* Übersichts-Karten */}
          

          {/* Legende */}
          

          {/* Kompetenz-Raster */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 text-left border border-gray-300">Kompetenz</th>
                  <th className="p-3 text-center border border-gray-300">Stufe 1</th>
                  <th className="p-3 text-center border border-gray-300">Stufe 2</th>
                  <th className="p-3 text-center border border-gray-300">Stufe 3</th>
                  <th className="p-3 text-center border border-gray-300">Stufe 4</th>
                  <th className="p-3 text-center border border-gray-300">Aktuelle Stufe</th>
                  <th className="p-3 text-center border border-gray-300">Entwicklung</th>
                </tr>
              </thead>
              <tbody>
                {competences.map((comp) => {
                  const progress = getProgress(comp);
                  const hasImproved = progress > 0;
                  const hasDeclined = progress < 0;
                  
                  return (
                    <tr key={comp.id} className="hover:bg-gray-50">
                      <td className="p-3 border border-gray-300">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${comp.color}`}></div>
                          <div>
                            <div className="font-medium">{comp.name}</div>
                            <div className="text-xs text-gray-500">{comp.category}</div>
                          </div>
                        </div>
                      </td>
                      
                      {/* Stufen mit Häkchen */}
                      {levels.map((lvl) => (
                        <td key={lvl.level} className="p-3 border border-gray-300 text-center">
                          <div className="flex justify-center">
                            {comp.currentLevel >= lvl.level ? (
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getLevelColor(lvl.level)}`}>
                                <span className="font-bold">✓</span>
                              </div>
                            ) : (
                              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                                {lvl.level}
                              </div>
                            )}
                          </div>
                        </td>
                      ))}
                      
                      {/* Aktuelle Stufe */}
                      <td className="p-3 border border-gray-300 text-center">
                        <div className={`px-3 py-1 rounded-full ${getLevelColor(comp.currentLevel)} font-medium`}>
                          Stufe {comp.currentLevel}
                        </div>
                      </td>
                      
                      {/* Entwicklung */}
                      <td className="p-3 border border-gray-300">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex justify-between text-xs text-gray-600 mb-1">
                              <span>Vorher: {comp.previousLevel || '-'}</span>
                              <span>Jetzt: {comp.currentLevel}</span>
                            </div>
                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className={`h-full rounded-full ${
                                  hasImproved ? 'bg-green-500' : 
                                  hasDeclined ? 'bg-red-500' : 'bg-gray-400'
                                }`}
                                style={{ width: `${Math.abs(progress)}%` }}
                              ></div>
                            </div>
                          </div>
                          <button
                            onClick={() => handleViewDevelopment(comp.id)}
                            className="ml-3 px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                          >
                            Details
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Zusammenfassung */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-800">Gesamtentwicklung</h4>
                <p className="text-sm text-gray-600">
                  {competences.filter(c => c.currentLevel > (c.previousLevel || 0)).length} von {competences.length} Kompetenzen verbessert
                </p>
              </div>
              <button
                onClick={() => {
                  setSelectedCompetence(null);
                  setShowDevelopmentModal(true);
                }}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                Alle Entwicklungen anzeigen
              </button>
            </div>
          </div>
        </div>
      </Modal>

      {/* Entwicklungs-Modal */}
      <DevelopmentModal
        isOpen={showDevelopmentModal}
        onClose={() => setShowDevelopmentModal(false)}
        competence={selectedCompetence ? competences.find(c => c.id === selectedCompetence) : null}
        allCompetences={selectedCompetence ? null : competences}
      />
    </>
  );
};

export default CompetenceModal;