// components/KIQuizModal.tsx (erweitert)
import React, { useState } from 'react';
import Modal from './Modal';
import StructuredExplanationModal from './StructuredExplanationModal';

interface KIQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (score: number, total: number) => void;
  itemId: number;
  itemTitle: string;
  phase: 'initial' | 'final';
}

type Mode = 'quiz' | 'explanation' | null;

const KIQuizModal: React.FC<KIQuizModalProps> = ({
  isOpen,
  onClose,
  onComplete,
  itemId,
  itemTitle,
  phase,
}) => {
  const [mode, setMode] = useState<Mode>(null);
  const [showExplanationModal, setShowExplanationModal] = useState(false);
  const [_quizActive, setQuizActive] = useState<boolean>(false);
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  // Quiz-Fragen generieren (wie gehabt)
  const generateQuiz = async () => {
    setLoading(true);
    try {
      const questionPromises = [];
      for (let i = 0; i < 3; i++) {
        questionPromises.push(
          fetch('http://localhost:3001/api/quiz/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ itemId, targetStatus: phase === 'initial' ? 'initial' : 'final' }),
          }).then(res => res.json())
        );
      }
      const generatedQuestions = await Promise.all(questionPromises);
      setQuestions(generatedQuestions);
    } catch (error) {
      console.error('Fehler:', error);
    } finally {
      setLoading(false);
    }
  };

  const startQuiz = async () => {
    setMode('quiz');
    await generateQuiz();
    setQuizActive(true);
    setCurrentIndex(0);
    setAnswers([]);
    setShowResult(false);
  };

  const startExplanation = () => {
    setMode('explanation');
    setShowExplanationModal(true);
  };

  const handleAnswer = (selectedIndex: number) => {
    const newAnswers = [...answers, selectedIndex];
    setAnswers(newAnswers);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      const finalScore = newAnswers.reduce((acc, answer, idx) => {
        return acc + (answer === questions[idx].correct ? 1 : 0);
      }, 0);
      setScore(finalScore);
      setShowResult(true);
    }
  };

  const handleQuizComplete = () => {
    onComplete(score, questions.length);
    onClose();
    reset();
  };


  const reset = () => {
    setMode(null);
    setQuizActive(false);
    setShowExplanationModal(false);
    setQuestions([]);
    setAnswers([]);
    setShowResult(false);
    setCurrentIndex(0);
    setScore(0);
  };

  const handleCancel = () => {
    reset();
    onClose();
  };
  
  // Modus-Auswahl (zu Beginn)
  if (mode === null) {
    return (
      <Modal isOpen={isOpen} onClose={handleCancel} title="Wissenscheck" size="md">
        <div className="text-center space-y-6 py-4">
          <p className="text-gray-600">
            {phase === 'initial'
              ? 'Wie möchtest du das Thema erkunden?'
              : 'Wie möchtest du dein Wissen überprüfen?'}
          </p>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={startQuiz}
              className="p-4 bg-primary-50 border-2 border-primary-200 rounded-xl hover:bg-primary-100 transition-all"
            >
              <span className="text-3xl block mb-2">📝</span>
              <span className="font-medium">Quiz</span>
              <span className="text-xs text-gray-500 block mt-1">
                {phase === 'initial' ? 'Multiple-Choice-Fragen' : 'Teste dein Wissen'}
              </span>
            </button>
            <button
              onClick={startExplanation}
              className="p-4 bg-green-50 border-2 border-green-200 rounded-xl hover:bg-green-100 transition-all"
            >
              <span className="text-3xl block mb-2">🤖</span>
              <span className="font-medium">
                {phase === 'initial' ? 'Lernbegleitung' : 'Vertiefte Abfrage'}
              </span>
              <span className="text-xs text-gray-500 block mt-1">
                {phase === 'initial' ? 'Erklärung + Rückfragen' : 'Offene Fragen beantworten'}
              </span>
            </button>
          </div>
          <button onClick={handleCancel} className="text-gray-400 text-sm">
            Abbrechen
          </button>
        </div>
      </Modal>
    );
  }

  // Quiz-Modus
  if (mode === 'quiz') {
    return (
      <Modal isOpen={isOpen} onClose={handleCancel} title={`Quiz: ${itemTitle}`} size="md">
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin text-3xl mb-2">🤖</div>
            <p className="text-gray-600">Generiere Fragen...</p>
          </div>
        ) : showResult ? (
          <div className="text-center space-y-4">
            <div className="text-6xl">
              {score === questions.length ? '🎉' : score >= questions.length / 2 ? '👍' : '📚'}
            </div>
            <h3 className="text-xl font-bold">
              Du hast {score} von {questions.length} Fragen richtig.
            </h3>
            <button
              onClick={handleQuizComplete}
              className="w-full py-2 bg-primary-600 text-black rounded-lg hover:bg-primary-700"
            >
              Weiter zur Selbsteinschätzung
            </button>
          </div>
        ) : (
          questions.length > 0 && (
            <div className="space-y-4">
              <div className="flex justify-between text-sm text-gray-500">
                <span>Frage {currentIndex + 1} von {questions.length}</span>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-lg font-medium">{questions[currentIndex].question}</p>
              </div>
              <div className="space-y-2">
                {questions[currentIndex].options.map((opt: string, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(idx)}
                    className="w-full text-left p-3 border rounded-lg hover:bg-primary-50"
                  >
                    {String.fromCharCode(65 + idx)}. {opt}
                  </button>
                ))}
              </div>
            </div>
          )
        )}
      </Modal>
    );
  }

  // Erklärungs-Modus (wird separat gerendert)
  return (
     <StructuredExplanationModal
      isOpen={showExplanationModal}
      onClose={() => {
        setShowExplanationModal(false);
        setMode(null);
      }}
      onComplete={() => {
        onComplete(1, 1); // Bestanden
        onClose();
        reset();
      }}
      itemId={itemId}
      itemTitle={itemTitle}
    />
  );
};

export default KIQuizModal;