import React, { useState } from 'react';
import Modal from './Modal';
import { type LearningPath } from './../types';

interface LearningPathModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Rating = 'good' | 'medium' | 'poor';
type QuizStep = 'quiz' | 'result';
type QuizType = 'initial' | 'final';

// --------------------------------------------------------------
// Quiz-Fragen (statisch für den Prototyp)
// --------------------------------------------------------------
interface QuizQuestion {
  id: number;
  text: string;
  options: string[];
  correct: number;
  explanation: string;
}

const quizQuestions: Record<number, QuizQuestion[]> = {
  1: [
    { id: 1, text: 'Berechne: 5 + 3 × 2', options: ['16', '11', '10', '13'], correct: 1, explanation: 'Punkt vor Strich: 3 × 2 = 6, dann 5 + 6 = 11' },
    { id: 2, text: 'Setze x = 3 in den Term 4x - 2 ein.', options: ['10', '14', '12', '9'], correct: 0, explanation: '4 × 3 = 12, 12 - 2 = 10' },
    { id: 3, text: 'Was ist der Wert von 2a + 3a, wenn a = 4?', options: ['20', '14', '24', '18'], correct: 0, explanation: '2a + 3a = 5a, 5 × 4 = 20' },
  ],
  2: [
    { id: 1, text: 'Ein Term für "das Dreifache einer Zahl, vermindert um 7" lautet:', options: ['3x - 7', '3(x - 7)', '7 - 3x', '3x + 7'], correct: 0, explanation: 'Dreifache = 3x, vermindert um 7 = -7' },
    { id: 2, text: 'Übersetze: "Der Umfang eines Quadrats mit Seitenlänge a"', options: ['a²', '4a', 'a + 4', '2a'], correct: 1, explanation: 'Umfang = 4 × Seitenlänge = 4a' },
  ],
  3: [
    { id: 1, text: 'Vereinfache: 7x + 3y - 2x + y', options: ['5x + 4y', '9x + 2y', '5x + 2y', '9x + 4y'], correct: 0, explanation: '7x - 2x = 5x, 3y + y = 4y → 5x + 4y' },
  ],
  4: [
    { id: 1, text: 'Vereinfache: 4x · 3x', options: ['12x', '12x²', '7x', '7x²'], correct: 1, explanation: '4·3 = 12, x·x = x² → 12x²' },
    { id: 2, text: 'Berechne: (6x) / (2x) für x ≠ 0', options: ['3x', '3', '4x', '4'], correct: 1, explanation: '6/2 = 3, x/x = 1 → 3' },
  ],
  5: [
    { id: 1, text: 'Multipliziere aus: 3(x + 4)', options: ['3x + 4', '3x + 12', 'x + 12', '3x + 7'], correct: 1, explanation: '3·x + 3·4 = 3x + 12' },
    { id: 2, text: 'Löse die Klammer auf: (x + 2)(x + 3)', options: ['x² + 5x + 6', 'x² + 6x + 5', 'x² + 5', 'x² + 6'], correct: 0, explanation: 'x·x + x·3 + 2·x + 2·3 = x² + 5x + 6' },
  ],
  6: [
    { id: 1, text: 'Löse die Klammer auf: 5 - (x + 2)', options: ['3 - x', '7 - x', '3 + x', '7 + x'], correct: 0, explanation: 'Minusklammer: Vorzeichenwechsel → 5 - x - 2 = 3 - x' },
    { id: 2, text: 'Vereinfache: 2x - (3x - 4)', options: ['-x + 4', '5x + 4', '-x - 4', '5x - 4'], correct: 0, explanation: '2x - 3x + 4 = -x + 4' },
  ],
};

// --------------------------------------------------------------
// Ich‑kann‑Aussagen für finale Einschätzung
// --------------------------------------------------------------
const competencyStatements: Record<number, string[]> = {
  1: ['Ich kann Zahlen in einfache Terme einsetzen.', 'Ich kann die Rechenreihenfolge (Punkt vor Strich) beachten.', 'Ich kann Ergebnisse korrekt berechnen.'],
  2: ['Ich kann aus einem Text eine mathematische Formel ableiten.', 'Ich kann Variable sinnvoll wählen.', 'Ich kann den Term so schreiben, dass er den Sachverhalt richtig abbildet.'],
  3: ['Ich kann gleichartige Glieder erkennen.', 'Ich kann Terme durch Zusammenfassen vereinfachen.', 'Ich kann Rechengesetze (Kommutativ‑, Assoziativgesetz) anwenden.'],
  4: ['Ich kann Terme mit Multiplikation und Division vereinfachen.', 'Ich kann Koeffizienten multiplizieren/dividieren.', 'Ich kann Variablen zusammenfassen (z.B. x * x = x²).'],
  5: ['Ich kann das Distributivgesetz anwenden.', 'Ich kann Produkte aus Summen bilden.', 'Ich kann mehrfache Klammern ausmultiplizieren.'],
  6: ['Ich kann Klammern mit Minuszeichen auflösen (Vorzeichenwechsel).', 'Ich kann verschachtelte Klammern schrittweise auflösen.', 'Ich kann den Term nach dem Auflösen vereinfachen.'],
  7: ['Ich kann verbale und nonverbale Kommunikation unterscheiden.', 'Ich kann aktives Zuhören anwenden.', 'Ich kann Ich‑Botschaften formulieren.'],
  8: ['Ich kann ein Telefonat situationsgerecht führen.', 'Ich kann ein Kundengespräch simulieren.', 'Ich kann mich in einem Vorstellungsgespräch angemessen präsentieren.'],
  9: ['Ich kann eine Präsentation gliedern.', 'Ich kann Folien oder ein Plakat gestalten.', 'Ich kann frei vortragen und auf Fragen eingehen.'],
  10: ['Ich kann einen Unfallbericht sachlich schreiben.', 'Ich kann einen Praktikumsbericht strukturieren.', 'Ich kann eine Vorgangsbeschreibung erstellen.'],
  11: ['Ich kann einen formellen Geschäftsbrief aufbauen.', 'Ich kann höfliche Formulierungen verwenden.', 'Ich kann eine E‑Mail mit Betreff und Anhang verfassen.'],
  12: ['Ich kann Argumente sammeln und gewichten.', 'Ich kann eine lineare Erörterung schreiben.', 'Ich kann eine dialektische Erörterung anwenden.'],
  13: ['I can structure a CV.', 'I can write a formal cover letter.', 'I can use appropriate phrases for job applications.'],
  14: ['I can answer typical interview questions.', 'I can ask polite questions about the job.', 'I can present my strengths clearly.'],
  15: ['I can make a business call.', 'I can take a message correctly.', 'I can handle inquiries in English.'],
  16: ['I can write a formal email.', 'I can write an informal email.', 'I can use a proper subject line and attachments.'],
  17: ['I can prepare a short presentation.', 'I can describe facts and figures.', 'I can use visual aids effectively.'],
  18: ['Ich kann die Bereiche Beschaffung, Produktion und Absatz erklären.', 'Ich kann die Zusammenarbeit der Bereiche darstellen.', 'Ich kann ein Beispielunternehmen zuordnen.'],
  19: ['Ich kann Angebote nach Preis und Lieferbedingungen vergleichen.', 'Ich kann Skonto berechnen.', 'Ich kann eine Bestellung auslösen.'],
  20: ['Ich kann Einzel‑ und Gemeinkosten unterscheiden.', 'Ich kann eine Kalkulation durchführen.', 'Ich kann den Verkaufspreis ermitteln.'],
  21: ['Ich kann die vier P (Product, Price, Place, Promotion) erklären.', 'Ich kann einen Marketing‑Mix für ein Produkt entwickeln.', 'Ich kann Werbemaßnahmen begründen.'],
  22: ['Ich kann einen Geschäftsprozess vom Auftrag bis zur Rechnung simulieren.', 'Ich kann Belege (Angebot, Auftrag, Lieferschein) zuordnen.', 'Ich kann das Ergebnis präsentieren.'],
};

// --------------------------------------------------------------
// Hauptkomponente
// --------------------------------------------------------------
const LearningPathModal: React.FC<LearningPathModalProps> = ({ isOpen, onClose }) => {
  const [learningPaths, setLearningPaths] = useState<LearningPath[]>([
    {
      id: 1,
      subject: 'Mathematik',
      color: 'bg-blue-100',
      icon: '∫',
      description: 'Unterrichtseinheit: Terme',
      totalItems: 6,
      completedItems: 0,
      items: [
        { id: 1, title: 'Einsetzen von Zahlen', description: 'Werte in Terme einsetzen und berechnen.', status: 'not-started', estimatedHours: 2, resources: ['Buch S. 45-48', 'Übungsblatt 1'] },
        { id: 2, title: 'Aufstellen von Termen', description: 'Aus Textaufgaben eigene Terme entwickeln.', status: 'not-started', estimatedHours: 3, prerequisites: [1], resources: ['Buch S. 49-52', 'Arbeitsblatt 2'] },
        { id: 3, title: 'Vereinfachen – Addition & Subtraktion', description: 'Gleichartige Glieder zusammenfassen.', status: 'not-started', estimatedHours: 3, prerequisites: [1, 2], resources: ['Buch S. 53-58', 'Übungsblatt 3'] },
        { id: 4, title: 'Vereinfachen – Multiplikation & Division', description: 'Punktrechnung in Termen.', status: 'not-started', estimatedHours: 3, prerequisites: [3], resources: ['Buch S. 59-64', 'Arbeitsblatt 4'] },
        { id: 5, title: 'Klammern ausmultiplizieren', description: 'Distributivgesetz anwenden.', status: 'not-started', estimatedHours: 4, prerequisites: [3, 4], resources: ['Buch S. 65-70', 'Übungsblatt 5'] },
        { id: 6, title: 'Klammern auflösen', description: 'Minusklammern und verschachtelte Klammern.', status: 'not-started', estimatedHours: 4, prerequisites: [5], resources: ['Buch S. 71-76', 'Abschlussaufgaben'] },
      ],
    },
    {
      id: 2,
      subject: 'Deutsch',
      color: 'bg-red-100',
      icon: '📚',
      description: 'Kommunikation im Berufsleben',
      totalItems: 6,
      completedItems: 0,
      items: [
        { id: 7, title: 'Gesprächsregeln und Kommunikationsmodelle', description: 'Verbal/nonverbale Kommunikation, aktives Zuhören.', status: 'not-started', estimatedHours: 3, resources: [] },
        { id: 8, title: 'Berufliche Gespräche führen', description: 'Telefonieren, Kundengespräch, Vorstellungsgespräch.', status: 'not-started', estimatedHours: 4, prerequisites: [7], resources: [] },
        { id: 9, title: 'Präsentationstechniken anwenden', description: 'Präsentation planen, visualisieren und vortragen.', status: 'not-started', estimatedHours: 5, prerequisites: [7], resources: [] },
        { id: 10, title: 'Berichte verfassen', description: 'Unfallbericht, Praktikumsbericht, Vorgangsbeschreibung.', status: 'not-started', estimatedHours: 4, resources: [] },
        { id: 11, title: 'Geschäftsbrief und E‑Mail', description: 'Formelle Schreiben verfassen.', status: 'not-started', estimatedHours: 3, prerequisites: [10], resources: [] },
        { id: 12, title: 'Stellungnahme und Erörterung', description: 'Argumente sammeln, gewichten, Stellung beziehen.', status: 'not-started', estimatedHours: 6, prerequisites: [11], resources: [] },
      ],
    },
    {
      id: 3,
      subject: 'Englisch',
      color: 'bg-green-100',
      icon: '🇬🇧',
      description: 'Job applications and workplace communication',
      totalItems: 5,
      completedItems: 0,
      items: [
        { id: 13, title: 'Writing a CV and cover letter', description: 'Structure of a CV, formal letter.', status: 'not-started', estimatedHours: 4, resources: [] },
        { id: 14, title: 'Job interview – preparation and role play', description: 'Answer questions about skills.', status: 'not-started', estimatedHours: 4, prerequisites: [13], resources: [] },
        { id: 15, title: 'Telephone English and messages', description: 'Make and take calls, leave a message.', status: 'not-started', estimatedHours: 3, resources: [] },
        { id: 16, title: 'Business emails and memos', description: 'Formal and informal emails.', status: 'not-started', estimatedHours: 3, prerequisites: [13], resources: [] },
        { id: 17, title: 'Presenting a company or product', description: 'Give a short presentation using visuals.', status: 'not-started', estimatedHours: 5, prerequisites: [14, 16], resources: [] },
      ],
    },
    {
      id: 4,
      subject: 'BWL',
      color: 'bg-yellow-100',
      icon: '💼',
      description: 'Geschäftsprozesse – Beschaffung, Produktion, Absatz',
      totalItems: 5,
      completedItems: 0,
      items: [
        { id: 18, title: 'Betriebliche Funktionen und Prozesse', description: 'Unternehmensbereiche und deren Zusammenwirken.', status: 'not-started', estimatedHours: 3, resources: [] },
        { id: 19, title: 'Beschaffung – Angebote vergleichen', description: 'Angebotsvergleich, Skonto berechnen.', status: 'not-started', estimatedHours: 4, prerequisites: [18], resources: [] },
        { id: 20, title: 'Produktion – Kostenrechnung', description: 'Einzelkosten, Gemeinkosten, Kalkulation.', status: 'not-started', estimatedHours: 5, prerequisites: [18, 19], resources: [] },
        { id: 21, title: 'Absatz – Marketinginstrumente (4P)', description: 'Marketing‑Mix für ein Produkt entwickeln.', status: 'not-started', estimatedHours: 5, prerequisites: [18], resources: [] },
        { id: 22, title: 'Projekt: Geschäftsprozess simulieren', description: 'Von der Bestellung bis zur Auslieferung.', status: 'not-started', estimatedHours: 6, prerequisites: [19, 20, 21], resources: [] },
      ],
    },
  ]);

  // States für Quiz
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [quizStep, setQuizStep] = useState<QuizStep>('quiz');
  const [quizType, setQuizType] = useState<QuizType>('initial');
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

  // States für finale Einschätzung
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
      // Keine Quizfragen → direkt zur Selbsteinschätzung
      openAssessment(pathId, itemId, itemTitle, targetStatus);
      return;
    }
    setCurrentQuizItem({ pathId, itemId, itemTitle, questions, targetStatus });
    setQuizType(targetStatus === 'in-progress' ? 'initial' : 'final');
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
    // Nach dem Quiz → Selbsteinschätzung öffnen
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
  // Selbsteinschätzung (Smileys)
  // ------------------------------------------------------------
  const openAssessment = (pathId: number, itemId: number, itemTitle: string, targetStatus: 'in-progress' | 'completed') => {
    const statements = competencyStatements[itemId] ?? [
      'Ich kann die grundlegenden Konzepte erklären.',
      'Ich kann typische Aufgaben lösen.',
      'Ich kann meine Vorgehensweise begründen.',
    ];
    setAssessmentItem({ pathId, itemId, itemTitle, statements, targetStatus });
    
    // Vorhandene Bewertungen laden
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
      // Ersteinschätzung speichern und Status auf "in-progress" setzen
      setAssessmentsInitial(prev => ({ ...prev, [key]: tempRatings }));
      changeItemStatus(assessmentItem.pathId, assessmentItem.itemId, 'in-progress');
    } else {
      // Finale Einschätzung speichern und Status auf "completed" setzen
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

  // Hauptfunktion für Klick auf den Status-Button
  const handleStatusButtonClick = (pathId: number, itemId: number, currentStatus: string) => {
    const path = learningPaths.find(p => p.id === pathId);
    const item = path?.items.find(i => i.id === itemId);
    if (!item) return;

    // Bereits abgeschlossen → Quiz + finale Einschätzung (nachjustieren)
    if (currentStatus === 'completed') {
      startQuiz(pathId, itemId, item.title, 'completed');
      return;
    }

    // Nicht begonnen → Quiz + Ersteinschätzung, dann auf "in-progress"
    if (currentStatus === 'not-started') {
      startQuiz(pathId, itemId, item.title, 'in-progress');
      return;
    }

    // In Bearbeitung → Quiz + finale Einschätzung, dann auf "completed"
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
  // JSX
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
              <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" style={{ width: `${getOverallProgress()}%` }} />
            </div>
          </div>

          {/* Horizontale Scroll-Liste */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-gray-800">Detailansicht für Lernberater</h4>
              <span className="text-sm text-gray-500">Scroll nach rechts • Klicke auf Symbole zum Status ändern</span>
            </div>
            <div className="overflow-x-auto pb-4">
              <div className="flex space-x-6 min-w-max">
                {learningPaths.map((path) => (
                  <div key={path.id} className="w-96 flex-shrink-0 border border-gray-200 rounded-lg overflow-hidden">
                    <div className={`${path.color} px-4 py-3 border-b border-gray-200`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-xl">{path.icon}</span>
                          <h5 className="font-semibold text-gray-900">{path.subject}</h5>
                        </div>
                        <span className="text-sm font-medium text-gray-700">{calculateProgress(path)}%</span>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">{path.description}</p>
                    </div>
                    <div className="p-4 h-96 overflow-y-auto">
                      <div className="space-y-3">
                        {path.items.map((item) => (
                          <div
                            key={item.id}
                            className={`rounded-lg p-3 transition-all duration-200 ${
                              item.status === 'completed'
                                ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-emerald-300'
                                : item.status === 'in-progress'
                                ? 'bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-amber-300'
                                : 'bg-gray-50 border border-gray-200'
                            }`}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center space-x-3">
                                  <button
                                    onClick={() => handleStatusButtonClick(path.id, item.id, item.status)}
                                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110 ${
                                      item.status === 'completed'
                                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-black'
                                        : item.status === 'in-progress'
                                        ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-black'
                                        : 'bg-gray-300 text-gray-600 hover:bg-gray-400'
                                    }`}
                                    title="Status ändern"
                                  >
                                    <span className="font-bold text-lg">{getStatusIcon(item.status)}</span>
                                  </button>
                                  <div>
                                    <h6 className="font-medium text-gray-900">{item.title}</h6>
                                    <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                                  </div>
                                </div>
                              </div>
                              <span className="text-sm font-medium px-2 py-1 rounded-full bg-white/50">{item.estimatedHours}h</span>
                            </div>
                            {item.status === 'in-progress' && (
                              <div className="mt-2 text-xs text-amber-600 font-medium">IN BEARBEITUNG</div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
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
            <button onClick={closeQuizAndContinue} className="mt-4 w-full py-2 bg-primary-600 text-black rounded-lg hover:bg-primary-700">
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
            <p className="text-sm text-gray-600">
              {assessmentItem.targetStatus === 'in-progress'
                ? 'Bitte beurteile, wie sicher du diese Kompetenzen bereits beherrschst:'
                : 'Bitte beurteile, wie sicher du diese Kompetenzen jetzt anwenden kannst:'}
            </p>
            {assessmentItem.statements.map((statement, idx) => (
              <div key={idx} className="border-b pb-3">
                <p className="text-gray-800 mb-2">{statement}</p>
                <div className="flex space-x-4">
                  {(['good', 'medium', 'poor'] as Rating[]).map((rating) => (
                    <button
                      key={rating}
                      onClick={() => updateRating(idx, rating)}
                      className={`flex flex-col items-center p-2 rounded-lg ${
                        tempRatings[idx] === rating ? 'bg-primary-100 ring-2 ring-primary-500' : 'bg-gray-50'
                      }`}
                    >
                      <span className="text-2xl">{rating === 'good' ? '😊' : rating === 'medium' ? '😐' : '😞'}</span>
                      <span className="text-xs">{rating === 'good' ? 'Kann ich gut' : rating === 'medium' ? 'Teilweise' : 'Noch unsicher'}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
            <div className="flex justify-end space-x-3 pt-4">
              <button onClick={cancelAssessment} className="px-4 py-2 border rounded-lg">Abbrechen</button>
              <button onClick={saveAssessment} className="px-4 py-2 bg-primary-600 text-black rounded-lg">
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