import React, { useState } from 'react';
import Modal from './Modal';
import type { ReflectionQuestion } from '../types';

interface ReflectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveReflection: (question: string, answer: string) => void;
}

const ReflectionModal: React.FC<ReflectionModalProps> = ({ isOpen, onClose, onSaveReflection }) => {
  const [selectedQuestion, setSelectedQuestion] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');

  const reflectionQuestions: ReflectionQuestion[] = [
    {
      id: 1,
      question: 'Was habe ich heute gut gemacht?',
      category: 'Positives'
    },
    {
      id: 2,
      question: 'Wo könnte ich mich noch verbessern?',
      category: 'Verbesserung'
    },
    {
      id: 3,
      question: 'Wie habe ich mich im Unterricht gefühlt?',
      category: 'Emotionen'
    }
  ];

  const handleQuestionSelect = (question: string) => {
    setSelectedQuestion(question);
    setAnswer('');
  };

  const handleSave = () => {
    if (selectedQuestion && answer.trim()) {
      onSaveReflection(selectedQuestion, answer);
      setSelectedQuestion('');
      setAnswer('');
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Tägliche Reflexion"
      size="lg"
    >
      <div className="space-y-6">
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Wähle eine Reflexionsfrage:</h4>
          <div className="space-y-2">
            {reflectionQuestions.map((q) => (
              <button
                key={q.id}
                onClick={() => handleQuestionSelect(q.question)}
                className={`w-full text-left p-3 rounded-lg border transition-colors ${
                  selectedQuestion === q.question
                    ? 'bg-purple-50 border-purple-300'
                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-800">{q.question}</span>
                  <span className="text-xs px-2 py-1 bg-purple-100 text-purple-800 rounded-full">
                    {q.category}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {selectedQuestion && (
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">Deine Antwort:</h4>
            <div className="mb-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
              <p className="text-sm text-gray-700">{selectedQuestion}</p>
            </div>
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Schreibe hier deine Reflexion..."
              className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              rows={4}
            />
            <div className="mt-4 flex justify-end space-x-3">
              <button
                onClick={handleSave}
                disabled={!answer.trim()}
                className={`px-4 py-2 rounded-lg font-medium ${
                  answer.trim()
                    ? 'bg-purple-500 text-white hover:bg-purple-600'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
              >
                Reflexion speichern
              </button>
            </div>
          </div>
        )}

        {!selectedQuestion && (
          <div className="text-center py-8 text-gray-500">
            <p>Wähle eine Frage aus, um mit deiner Reflexion zu beginnen.</p>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ReflectionModal;