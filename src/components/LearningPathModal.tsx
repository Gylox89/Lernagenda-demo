import React, { useState } from 'react';
import Modal from './Modal';
import { type LearningPath } from './../types';
import { learningPathsData } from './data/learningPaths';
import { quizQuestions, type QuizQuestion } from './data/quizQuestions';
import { competencyStatements, type Rating } from './data/competencyStatements';

interface LearningPathModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type QuizStep = 'quiz' | 'result';
type QuizType = 'initial' | 'final';

const LearningPathModal: React.FC<LearningPathModalProps> = ({ isOpen, onClose }) => {
  const [learningPaths, setLearningPaths] = useState<LearningPath[]>(learningPathsData);

  // States für Quiz
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [quizStep, setQuizStep] = useState<QuizStep>('quiz');
  const [currentQuizItem, setCurrentQuizItem] = useState<{
    pathId: number;
    itemId: number;
    itemTitle: string;
    questions: QuizQuestion[];
    targetStatus: 'in-progress' | 'completed';
  } | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [quizResult, setQuizResult] = useState<{ score: number; total: number } | null>(null);

  // States für Selbsteinschätzung
  const [showAssessmentModal, setShowAssessmentModal] = useState(false);
  const [assessmentItem, setAssessmentItem] = useState<{
    pathId: number;
    itemId: number;
    itemTitle: string;
    statements: string[];
    targetStatus: 'in-progress' | 'completed';
  } | null>(null);
  const [tempRatings, setTempRatings] = useState<Record<string, Rating>>({});
  const [assessmentsInitial, setAssessmentsInitial] = useState<Record<string, Record<string, Rating>>>({});
  const [assessmentsFinal, setAssessmentsFinal] = useState<Record<string, Record<string, Rating>>>({});

  // ------------------------------------------------------------
  // Quiz-Logik
  // ------------------------------------------------------------
  const startQuiz = (pathId: number, itemId: number, itemTitle: string, targetStatus: 'in-progress' | 'completed') => {
    const questions = quizQuestions[itemId];
    if (!questions || questions.length === 0) {
      openAssessment(pathId, itemId, itemTitle, targetStatus);
      return;
    }
    setCurrentQuizItem({ pathId, itemId, itemTitle, questions, targetStatus });
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setQuizResult(null);
    setQuizStep('quiz');
    setShowQuizModal(true);
  };

  const handleAnswer = (selectedIndex: number) => {
    const newAnswers = [...userAnswers, selectedIndex];
    setUserAnswers(newAnswers);

    if (currentQuizItem && currentQuestionIndex + 1 < currentQuizItem.questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const score = newAnswers.reduce((acc, answer, idx) => {
        return acc + (answer === currentQuizItem!.questions[idx].correct ? 1 : 0);
      }, 0);
      setQuizResult({ score, total: currentQuizItem!.questions.length });
      setQuizStep('result');
    }
  };

  const closeQuizAndContinue = () => {
    if (!currentQuizItem) return;
    setShowQuizModal(false);
    openAssessment(
      currentQuizItem.pathId,
      currentQuizItem.itemId,
      currentQuizItem.itemTitle,
      currentQuizItem.targetStatus
    );
    setCurrentQuizItem(null);
    setUserAnswers([]);
    setQuizResult(null);
    setQuizStep('quiz');
    setCurrentQuestionIndex(0);
  };

  // ------------------------------------------------------------
  // Selbsteinschätzung
  // ------------------------------------------------------------
  const openAssessment = (pathId: number, itemId: number, itemTitle: string, targetStatus: 'in-progress' | 'completed') => {
    const statements = competencyStatements[itemId] ?? [
      'Ich kann die grundlegenden Konzepte erklären.',
      'Ich kann typische Aufgaben lösen.',
      'Ich kann meine Vorgehensweise begründen.',
    ];
    setAssessmentItem({ pathId, itemId, itemTitle, statements, targetStatus });
    
    if (targetStatus === 'in-progress') {
      const savedRatings = assessmentsInitial[`${pathId}-${itemId}`] || {};
      setTempRatings(savedRatings);
    } else {
      const savedRatings = assessmentsFinal[`${pathId}-${itemId}`] || {};
      setTempRatings(savedRatings);
    }
    setShowAssessmentModal(true);
  };

  const saveAssessment = () => {
    if (!assessmentItem) return;
    const key = `${assessmentItem.pathId}-${assessmentItem.itemId}`;
    
    if (assessmentItem.targetStatus === 'in-progress') {
      setAssessmentsInitial(prev => ({ ...prev, [key]: tempRatings }));
      changeItemStatus(assessmentItem.pathId, assessmentItem.itemId, 'in-progress');
    } else {
      setAssessmentsFinal(prev => ({ ...prev, [key]: tempRatings }));
      changeItemStatus(assessmentItem.pathId, assessmentItem.itemId, 'completed');
    }
    
    setShowAssessmentModal(false);
    setAssessmentItem(null);
    setTempRatings({});
  };

  const cancelAssessment = () => {
    setShowAssessmentModal(false);
    setAssessmentItem(null);
    setTempRatings({});
  };

  const updateRating = (index: number, rating: Rating) => {
    setTempRatings(prev => ({ ...prev, [index]: rating }));
  };

  // ------------------------------------------------------------
  // Statusänderung
  // ------------------------------------------------------------
  const changeItemStatus = (pathId: number, itemId: number, newStatus: 'not-started' | 'in-progress' | 'completed') => {
    setLearningPaths(prev =>
      prev.map(path => {
        if (path.id !== pathId) return path;
        const updatedItems = path.items.map(item =>
          item.id === itemId ? { ...item, status: newStatus } : item
        );
        const completedItems = updatedItems.filter(item => item.status === 'completed').length;
        return {
          ...path,
          items: updatedItems,
          completedItems,
          totalItems: updatedItems.length,
        };
      })
    );
  };

  const handleStatusButtonClick = (pathId: number, itemId: number, currentStatus: string) => {
    const path = learningPaths.find(p => p.id === pathId);
    const item = path?.items.find(i => i.id === itemId);
    if (!item) return;

    if (currentStatus === 'completed') {
      startQuiz(pathId, itemId, item.title, 'completed');
      return;
    }

    if (currentStatus === 'not-started') {
      startQuiz(pathId, itemId, item.title, 'in-progress');
      return;
    }

    if (currentStatus === 'in-progress') {
      startQuiz(pathId, itemId, item.title, 'completed');
      return;
    }
  };

  // ------------------------------------------------------------
  // Fortschrittsberechnungen
  // ------------------------------------------------------------
  const calculateProgress = (path: LearningPath) => Math.round((path.completedItems / path.totalItems) * 100);
  const getOverallProgress = () => {
    const totalItems = learningPaths.reduce((s, p) => s + p.totalItems, 0);
    const completedItems = learningPaths.reduce((s, p) => s + p.completedItems, 0);
    return Math.round((completedItems / totalItems) * 100);
  };
  const getStatusIcon = (status: string) => status === 'not-started' ? '○' : status === 'in-progress' ? '⟳' : '✓';

  // ------------------------------------------------------------
  // JSX (wie gehabt – hier aus Platzgründen stark gekürzt)
  // ------------------------------------------------------------
  return (
  <>
    {/* Hauptmodal: Lernpfade */}
    <Modal isOpen={isOpen} onClose={onClose} title="Lernwegelisten - AVdual Lehrplan" size="full">
      <div className="space-y-6">
        {/* Gesamtfortschritt */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-800">Gesamtfortschritt aller Fächer</h4>
              <p className="text-sm text-gray-600">
                {learningPaths.reduce((sum, path) => sum + path.completedItems, 0)} von{' '}
                {learningPaths.reduce((sum, path) => sum + path.totalItems, 0)} Themen abgeschlossen
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-700">{getOverallProgress()}%</div>
              <div className="text-sm text-blue-600">Gesamtfortschritt</div>
            </div>
          </div>
          <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
              style={{ width: `${getOverallProgress()}%` }}
            />
          </div>
        </div>

        {/* Detailansicht für Lernberater mit horizontalem Scroll */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-gray-800">Detailansicht für Lernberater</h4>
            <span className="text-sm text-gray-500">
              Scroll nach rechts für weitere Fächer • Klicke auf Symbole zum Status ändern
            </span>
          </div>

          {/* Horizontale Scroll-Container */}
          <div className="relative">
            <div className="overflow-x-auto pb-4 -mx-2 px-2 scrollbar-hide">
              <div className="flex space-x-6 min-w-max">
                {learningPaths.map((path) => (
                  <div
                    key={path.id}
                    className="w-96 flex-shrink-0 border border-gray-200 rounded-lg overflow-hidden"
                  >
                    <div className={`${path.color} px-4 py-3 border-b border-gray-200`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-xl">{path.icon}</span>
                          <h5 className="font-semibold text-gray-900">{path.subject}</h5>
                        </div>
                        <span className="text-sm font-medium text-gray-700">
                          {calculateProgress(path)}% abgeschlossen
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">{path.description}</p>
                    </div>

                    <div className="p-4 h-96 overflow-y-auto">
                      <div className="space-y-3">
                        {path.items.map((item) => (
                          <div
                            key={item.id}
                            className={`
                              rounded-lg p-3 transition-all duration-200
                              ${item.status === 'completed'
                                ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-emerald-300 shadow-sm hover:shadow-md'
                                : item.status === 'in-progress'
                                ? 'bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-amber-300 shadow-sm hover:shadow-md'
                                : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
                              }
                            `}
                          >
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex-1">
                                <div className="flex items-center space-x-3">
                                  <button
                                    onClick={() => handleStatusButtonClick(path.id, item.id, item.status)}
                                    className={`
                                      w-10 h-10 rounded-full flex items-center justify-center 
                                      transition-all duration-200 hover:scale-110
                                      ${item.status === 'completed'
                                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md'
                                        : item.status === 'in-progress'
                                        ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-white shadow-md'
                                        : 'bg-gray-300 text-gray-600 hover:bg-gray-400'
                                      }
                                    `}
                                    title="Status ändern"
                                  >
                                    <span className="font-bold text-lg">{getStatusIcon(item.status)}</span>
                                  </button>
                                  <div>
                                    <h6 className={`
                                      font-medium text-lg
                                      ${item.status === 'completed' ? 'text-emerald-800' :
                                        item.status === 'in-progress' ? 'text-amber-800' : 'text-gray-900'}
                                    `}>
                                      {item.title}
                                    </h6>
                                    <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                                  </div>
                                </div>
                              </div>
                              <span className={`
                                text-sm font-medium px-3 py-1 rounded-full ml-2
                                ${item.status === 'completed' ? 'bg-emerald-100 text-emerald-800' :
                                  item.status === 'in-progress' ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-600'}
                              `}>
                                {item.estimatedHours}h
                              </span>
                            </div>

                            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                              <div className="flex items-center space-x-2">
                                <span className={`
                                  text-xs font-semibold px-3 py-1.5 rounded-full
                                  ${item.status === 'in-progress' ? 'bg-amber-500 text-white shadow-sm' : ''}
                                `}>
                                  {item.status === 'in-progress' ? 'IN BEARBEITUNG' : ''}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="lg:hidden mt-2 text-center">
            <p className="text-xs text-gray-500">↔ Ziehe zum Scrollen</p>
          </div>
        </div>
      </div>
    </Modal>

    {/* Quiz-Modal */}
    <Modal isOpen={showQuizModal} onClose={() => setShowQuizModal(false)} title="Wissenscheck" size="md">
      {currentQuizItem && quizStep === 'quiz' && (
        <div className="space-y-4">
          <div className="flex justify-between text-sm text-gray-500">
            <span>Frage {currentQuestionIndex + 1} von {currentQuizItem.questions.length}</span>
            <span>{currentQuizItem.itemTitle}</span>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-lg font-medium">{currentQuizItem.questions[currentQuestionIndex].text}</p>
          </div>
          <div className="space-y-2">
            {currentQuizItem.questions[currentQuestionIndex].options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                className="w-full text-left p-3 border rounded-lg hover:bg-primary-50 hover:border-primary-300 transition-all"
              >
                {String.fromCharCode(65 + idx)}. {opt}
              </button>
            ))}
          </div>
        </div>
      )}

      {quizStep === 'result' && quizResult && currentQuizItem && (
        <div className="space-y-4 text-center">
          <div className="text-6xl mb-4">
            {quizResult.score === quizResult.total ? '🎉' : quizResult.score >= quizResult.total / 2 ? '👍' : '📚'}
          </div>
          <h3 className="text-xl font-bold">Du hast {quizResult.score} von {quizResult.total} Fragen richtig.</h3>
          <button onClick={closeQuizAndContinue} className="mt-4 w-full py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
            Weiter zur Selbsteinschätzung
          </button>
        </div>
      )}
    </Modal>

    {/* Selbsteinschätzung (Smileys) */}
    <Modal
      isOpen={showAssessmentModal}
      onClose={cancelAssessment}
      title={assessmentItem?.targetStatus === 'in-progress' ? `Ersteinschätzung: ${assessmentItem?.itemTitle || ''}` : `Abschlusseinschätzung: ${assessmentItem?.itemTitle || ''}`}
      size="md"
    >
      {assessmentItem && (
        <div className="space-y-4">
          <p className="text-sm text-gray-600 mb-2">
            {assessmentItem.targetStatus === 'in-progress'
              ? 'Bitte beurteile, wie sicher du diese Kompetenzen bereits beherrschst:'
              : 'Bitte beurteile, wie sicher du diese Kompetenzen jetzt anwenden kannst (deine vorherige Einschätzung ist bereits ausgewählt):'}
          </p>
          <div className="space-y-4">
            {assessmentItem.statements.map((statement, idx) => (
              <div key={idx} className="border-b border-gray-100 pb-3">
                <p className="text-gray-800 mb-2">{statement}</p>
                <div className="flex space-x-4">
                  {(['good', 'medium', 'poor'] as Rating[]).map((rating) => (
                    <button
                      key={rating}
                      onClick={() => updateRating(idx, rating)}
                      className={`
                        flex flex-col items-center p-2 rounded-lg transition-all
                        ${tempRatings[idx] === rating
                          ? 'bg-primary-100 ring-2 ring-primary-500'
                          : 'bg-gray-50 hover:bg-gray-100'
                        }
                      `}
                    >
                      <span className="text-2xl">
                        {rating === 'good' && '😊'}
                        {rating === 'medium' && '😐'}
                        {rating === 'poor' && '😞'}
                      </span>
                      <span className="text-xs mt-1">
                        {rating === 'good' && 'Kann ich gut'}
                        {rating === 'medium' && 'Teilweise'}
                        {rating === 'poor' && 'Noch unsicher'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
            <button
              onClick={cancelAssessment}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Abbrechen
            </button>
            <button
              onClick={saveAssessment}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
            >
              {assessmentItem.targetStatus === 'in-progress' ? 'Als „in Bearbeitung“ speichern' : 'Als „erledigt“ speichern'}
            </button>
          </div>
        </div>
      )}
    </Modal>
  </>
);
};

export default LearningPathModal;