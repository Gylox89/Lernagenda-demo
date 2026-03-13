import React, { useState } from 'react';
import Header from './Header';
import BlogSection from './BlogSection';
import FunctionGrid from './FunctionGrid';
import ReflectionModal from './components/ReflectionModal';
import GradesModal from './components/GradesModal';
import GoalsModal from './components/GoalsModal';
import KarmaModal from './components/KarmaModal';
import CompetenceModal from './components/CompetenceModal';
import LearningPathModal from './components/LearningPathModal';
import type { FunctionCard, BlogEntry } from './types';

function App() {
  const userName = "Max Mustermann";
  
  // Modal States
  const [reflectionModalOpen, setReflectionModalOpen] = useState(false);
  const [gradesModalOpen, setGradesModalOpen] = useState(false);
  const [goalsModalOpen, setGoalsModalOpen] = useState(false);
  const [karmaModalOpen, setKarmaModalOpen] = useState(false);
  const [competenceModalOpen, setCompetenceModalOpen] = useState(false);
  const [learningPathModalOpen, setLearningPathModalOpen] = useState(false);

  // Blog-Einträge
  const blogEntries: BlogEntry[] = [
    { id: 1, type: 'karma', content: '+10 Punkte für Hilfe für Mitschüler erhalten', date: 'Heute, 10:30', isNew: true },
    { id: 2, type: 'reflection', content: 'Mein Tag war heute wegen Mathe anstrengend', date: 'Heute, 09:15', isNew: true },
    { id: 3, type: 'goal', content: 'Pünklich zum Unterricht erschienen', date: 'Gestern, 16:45' },
    { id: 4, type: 'grade', content: 'Neue Note in Englisch: 2,0', date: 'Gestern, 14:20' },
    { id: 5, type: 'reminder', content: 'Praktikumsvertrag abgeben!', date: 'Gestern, 12:00' },
    { id: 6, type: 'achievement', content: 'Wöchentliches Lernziel erreicht!', date: '15.11.2023' },
    { id: 7, type: 'feedback', content: 'Lehrer-Feedback: Tolle Mitarbeit im Unterricht', date: '14.11.2023' },
    { id: 8, type: 'event', content: 'Nächster Elternsprechtag: 25. November', date: '13.11.2023' },
    { id: 9, type: 'karma', content: '+5 Punkte für pünktliche Abgabe', date: '12.11.2023' },
    { id: 10, type: 'grade', content: 'Verbesserung in Mathematik: von 3,0 auf 2,3', date: '11.11.2023' },
    { id: 11, type: 'goal', content: 'Neues Ziel gesetzt: Vokabeln lernen', date: '10.11.2023' },
    { id: 12, type: 'reflection', content: 'Reflexion abgeschlossen: Gute Lernwoche', date: '09.11.2023' },
    { id: 13, type: 'achievement', content: '100 Tage Lernstreak erreicht!', date: '08.11.2023' },
    { id: 14, type: 'feedback', content: 'Positives Feedback von Mitschülern', date: '07.11.2023' },
    { id: 15, type: 'event', content: 'Projektabgabe nächste Woche', date: '06.11.2023' },
    { id: 16, type: 'karma', content: 'Karma-Level aufgestiegen: Bronze → Silber', date: '05.11.2023' },
    { id: 17, type: 'grade', content: 'Erste Note in Physik: 2,7', date: '04.11.2023' },
    { id: 18, type: 'goal', content: 'Lernplan für die Woche erstellt', date: '03.11.2023' },
    { id: 19, type: 'reflection', content: 'Wochenreflexion: Gute Fortschritte', date: '02.11.2023' },
    { id: 20, type: 'achievement', content: 'Erfolgreich an Gruppenarbeit beteiligt', date: '01.11.2023' },
  ];

  const functions: FunctionCard[] = [
    {
      id: 1,
      title: 'Reflexion',
      icon: '💭',
      color: 'bg-purple-100 hover:bg-purple-200',
      description: 'Tägliche Reflexion',
    },
    {
      id: 2,
      title: 'Noten',
      icon: '📊',
      color: 'bg-blue-100 hover:bg-blue-200',
      description: 'Schnitt: 2,3',
    },
    {
      id: 3,
      title: 'Handlungskompetenz',
      icon: '🛠️',
      color: 'bg-green-100 hover:bg-green-200',
      description: 'Aktuell: Durchhaltefähigkeit',
    },
    {
      id: 4,
      title: 'Ziele',
      icon: '🎯',
      color: 'bg-red-100 hover:bg-red-200',
      description: 'Ziele setzen & verfolgen',
    },
    {
      id: 5,
      title: 'Lernwegelisten',
      icon: '📝',
      color: 'bg-yellow-100 hover:bg-yellow-200',
      description: 'Lernwege betrachten',
    },
    {
      id: 6,
      title: 'Karma',
      icon: '⭐',
      color: 'bg-indigo-100 hover:bg-indigo-200',
      description: 'Konto anschauen',
    },
  ];

  // Handler für Button-Klicks
  const handleFunctionClick = (functionId: number) => {
    switch (functionId) {
      case 1: // Reflexion
        setReflectionModalOpen(true);
        break;
      case 2: // Noten
        setGradesModalOpen(true);
        break;
      case 3: // Handlungskompetenz
        setCompetenceModalOpen(true);
        break;
      case 4: // Ziele
        setGoalsModalOpen(true);
        break;
      case 5: // Lernwegelisten
        setLearningPathModalOpen(true);
        break;
      case 6: // Karma
        setKarmaModalOpen(true);
        break;
      default:
        console.log(`Funktion ${functionId} geklickt`);
    }
  };

  // Handler für Reflexion speichern
  const handleSaveReflection = (question: string, answer: string) => {
    console.log('Reflexion gespeichert:', { question, answer });
    // In einer echten App würde hier die Reflexion gespeichert werden
    // und ein neuer Blog-Eintrag erstellt werden
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <Header userName={userName} isTeacher={false} />
        
        {/* Zwei-Spalten-Layout für Desktop/Tablet */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Linke Spalte: Blog (scrollable) - nimmt 2/3 des Platzes */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-4 h-[calc(100vh-280px)] lg:h-[calc(100vh-300px)]">
              <BlogSection entries={blogEntries} />
            </div>
          </div>
          
          {/* Rechte Spalte: Funktionen (fixed) - nimmt 1/3 des Platzes */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-4 h-[calc(100vh-280px)] lg:h-[calc(100vh-300px)] sticky top-6">
              <FunctionGrid 
                functions={functions} 
                onFunctionClick={handleFunctionClick}
              />
            </div>
          </div>
        </div>

        {/* Mobile Ansicht (vertikal gestapelt) */}
        <div className="mt-6 block lg:hidden">
          <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
            <BlogSection entries={blogEntries.slice(0, 5)} />
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4">
            <FunctionGrid 
              functions={functions} 
              onFunctionClick={handleFunctionClick}
            />
          </div>
        </div>

        {/* Modals */}
        <ReflectionModal
          isOpen={reflectionModalOpen}
          onClose={() => setReflectionModalOpen(false)}
          onSaveReflection={handleSaveReflection}
        />
        
        <GradesModal
          isOpen={gradesModalOpen}
          onClose={() => setGradesModalOpen(false)}
        />
        
        <GoalsModal
          isOpen={goalsModalOpen}
          onClose={() => setGoalsModalOpen(false)}
        />
        
        <KarmaModal
          isOpen={karmaModalOpen}
          onClose={() => setKarmaModalOpen(false)}
        />
        
        <CompetenceModal
          isOpen={competenceModalOpen}
          onClose={() => setCompetenceModalOpen(false)}
        />
        
        <LearningPathModal
          isOpen={learningPathModalOpen}
          onClose={() => setLearningPathModalOpen(false)}
        />
      </div>
    </div>
  );
}

export default App;