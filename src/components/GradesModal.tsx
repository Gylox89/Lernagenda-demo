import React from 'react';
import Modal from './Modal';
import type { Subject } from '../types';

interface GradesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GradesModal: React.FC<GradesModalProps> = ({ isOpen, onClose }) => {
  const subjects: Subject[] = [
    { id: 1, name: 'Mathematik', grade: '2,3', teacher: 'Herr Schmidt', lastUpdate: '15.11.2023' },
    { id: 2, name: 'Deutsch', grade: '2,0', teacher: 'Frau Müller', lastUpdate: '14.11.2023' },
    { id: 3, name: 'Englisch', grade: '2,0', teacher: 'Frau Weber', lastUpdate: 'Heute' },
    { id: 4, name: 'Physik', grade: '2,7', teacher: 'Herr Bauer', lastUpdate: '12.11.2023' },
    { id: 5, name: 'Geschichte', grade: '1,7', teacher: 'Frau Schneider', lastUpdate: '10.11.2023' },
  ];

  const getGradeColor = (grade: string) => {
    const numericGrade = parseFloat(grade.replace(',', '.'));
    if (numericGrade <= 2.0) return 'text-green-600 bg-green-50';
    if (numericGrade <= 3.0) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Deine Notenübersicht"
      size="lg"
    >
      <div className="space-y-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-700">Durchschnittsnote</p>
              <p className="text-2xl font-bold text-blue-800">2,14</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-blue-700">Letzte Aktualisierung</p>
              <p className="font-medium text-blue-800">Heute</p>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Fächer im Detail:</h4>
          <div className="space-y-3">
            {subjects.map((subject) => (
              <button
                key={subject.id}
                onClick={() => console.log(`Öffne Details für ${subject.name}`)}
                className="w-full text-left p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-medium text-gray-900">{subject.name}</h5>
                    <p className="text-sm text-gray-500">Lehrer: {subject.teacher}</p>
                  </div>
                  <div className="text-right">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getGradeColor(subject.grade)}`}>
                      {subject.grade}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">Aktualisiert: {subject.lastUpdate}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="border-t pt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Notenverteilung:</h4>
          <div className="space-y-2">
            <div className="flex items-center">
              <span className="w-24 text-sm text-gray-600">Sehr gut (1,0-1,5)</span>
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full w-1/5 bg-green-500"></div>
              </div>
              <span className="w-10 text-sm text-gray-700 ml-2">20%</span>
            </div>
            <div className="flex items-center">
              <span className="w-24 text-sm text-gray-600">Gut (1,6-2,5)</span>
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full w-3/5 bg-blue-500"></div>
              </div>
              <span className="w-10 text-sm text-gray-700 ml-2">60%</span>
            </div>
            <div className="flex items-center">
              <span className="w-24 text-sm text-gray-600">Befriedigend (2,6-3,5)</span>
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full w-1/5 bg-yellow-500"></div>
              </div>
              <span className="w-10 text-sm text-gray-700 ml-2">20%</span>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default GradesModal;