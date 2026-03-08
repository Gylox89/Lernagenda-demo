import React from 'react';
import Modal from './Modal';
import type { Goal } from '../types';

interface GoalsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GoalsModal: React.FC<GoalsModalProps> = ({ isOpen, onClose }) => {
  const goals: Goal[] = [
    {
      id: 1,
      title: 'Mathe-Test bestehen',
      description: 'Den kommenden Mathe-Test mit mindestens Note 2,0 abschließen',
      priority: 'high',
      progress: 80,
      deadline: '30.11.2023',
      smartCriteria: {
        specific: true,
        measurable: true,
        achievable: true,
        relevant: true,
        timeBound: true
      }
    },
    {
      id: 2,
      title: 'Englisch-Vokabeln lernen',
      description: '300 neue Vokabeln für das nächste Halbjahr lernen',
      priority: 'medium',
      progress: 45,
      deadline: '15.12.2023',
      smartCriteria: {
        specific: true,
        measurable: true,
        achievable: true,
        relevant: true,
        timeBound: true
      }
    },
    {
      id: 3,
      title: 'Referat vorbereiten',
      description: 'Ein 10-minütiges Referat über Klimawandel vorbereiten',
      priority: 'low',
      progress: 20,
      deadline: '10.12.2023',
      smartCriteria: {
        specific: true,
        measurable: true,
        achievable: true,
        relevant: true,
        timeBound: true
      }
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'high': return 'Hohe Priorität';
      case 'medium': return 'Mittlere Priorität';
      case 'low': return 'Niedrige Priorität';
      default: return priority;
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Deine Ziele"
      size="xl"
    >
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-100 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="text-red-500">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-red-700">
                Ziele nach dem <strong>SMART-Prinzip</strong>: Spezifisch, Messbar, Erreichbar, Relevant, Zeitgebunden
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {goals.map((goal) => (
            <div key={goal.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <h4 className="font-medium text-gray-900">{goal.title}</h4>
                <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(goal.priority)}`}>
                  {getPriorityLabel(goal.priority)}
                </span>
              </div>
              
              <p className="text-sm text-gray-600 mb-4">{goal.description}</p>
              
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Fortschritt</span>
                  <span>{goal.progress}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${
                      goal.priority === 'high' ? 'bg-red-500' :
                      goal.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${goal.progress}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="text-sm text-gray-600 mb-4">
                <p><strong>Deadline:</strong> {goal.deadline}</p>
              </div>
              
              <div className="border-t pt-3">
                <p className="text-xs font-medium text-gray-700 mb-2">SMART-Kriterien:</p>
                <div className="grid grid-cols-5 gap-1">
                  {Object.entries(goal.smartCriteria).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <div className={`w-6 h-6 rounded-full mx-auto flex items-center justify-center ${
                        value ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                      }`}>
                        {value ? '✓' : '○'}
                      </div>
                      <p className="text-xs mt-1 text-gray-600">{key.charAt(0).toUpperCase()}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t pt-4">
          <button
            onClick={() => console.log('Neues Ziel erstellen')}
            className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:text-gray-700 hover:border-gray-400 transition-colors"
          >
            <div className="flex items-center justify-center space-x-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>Neues Ziel erstellen</span>
            </div>
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default GoalsModal;