import React, { useState } from 'react';
import Header from './Header';
import BlogSection from './components/BlogSection';
import FunctionGrid from './components/FunctionGrid';
import type { FunctionCard, BlogEntry2 } from './types';

function TeacherApp() {
  const userName = "Frau/Herr Lehmann";
  
  // Lehrer-spezifische Blog-Einträge (Schüleraktivitäten)
  const blogEntries: BlogEntry2[] = [
    { 
      id: 1, 
      type: 'help', 
      content: 'Max Mustermann benötigt Hilfe bei der Lernwegelistenaufgabe "Differentialrechnung"', 
      date: 'Heute, 14:30',
      student: 'Max Mustermann',
      subject: 'Mathematik'
    },
    { 
      id: 2, 
      type: 'goal', 
      content: 'Emma Dinkel hat sich ein neues Ziel gesetzt: "300 Englisch-Vokabeln lernen"', 
      date: 'Heute, 13:45',
      student: 'Emma Dinkel',
      subject: 'Englisch'
    },
    { 
      id: 3, 
      type: 'reflection', 
      content: 'Blogeintrag von Max Mustermann: "Ich habe heute endlich den Satz des Pythagoras verstanden!"', 
      date: 'Heute, 11:20',
      student: 'Max Mustermann',
      subject: 'Mathematik'
    },
    { 
      id: 4, 
      type: 'achievement', 
      content: 'Lena Schmidt hat alle Aufgaben in der Lernwegeliste "Business Communication" abgeschlossen', 
      date: 'Gestern, 16:15',
      student: 'Lena Schmidt',
      subject: 'Englisch'
    },
    { 
      id: 5, 
      type: 'karma', 
      content: 'Tom Bauer hat 10 Karma-Punkte für außergewöhnliche Teamarbeit erhalten', 
      date: 'Gestern, 14:30',
      student: 'Tom Bauer',
      subject: 'Sozialkompetenz'
    },
    { 
      id: 6, 
      type: 'feedback', 
      content: 'Sophie Meyer bittet um Feedback zu ihrer Reflexion "Wie war meine Woche?"', 
      date: 'Gestern, 12:10',
      student: 'Sophie Meyer',
      subject: 'Reflexion'
    },
    { 
      id: 7, 
      type: 'reminder', 
      content: 'Ben Müller hat seit 3 Tagen keine Reflexion mehr eingereicht', 
      date: '15.11.2023',
      student: 'Ben Müller',
      subject: 'Reflexion'
    },
    { 
      id: 8, 
      type: 'grade', 
      content: 'Neue Note für Lisa Wagner in Mathematik: 1,7 (Verbesserung um 0,6)', 
      date: '14.11.2023',
      student: 'Lisa Wagner',
      subject: 'Mathematik'
    },
    { 
      id: 9, 
      type: 'competence', 
      content: 'Jonas Klein hat in Selbstorganisation von Stufe 2 auf 3 verbessert', 
      date: '13.11.2023',
      student: 'Jonas Klein',
      subject: 'Handlungskompetenz'
    },
    { 
      id: 10, 
      type: 'question', 
      content: 'Frage von Mia Hoffmann: "Wie bereite ich mich am besten auf den BWL-Test vor?"', 
      date: '12.11.2023',
      student: 'Mia Hoffmann',
      subject: 'BWL'
    },
    { 
      id: 11, 
      type: 'help', 
      content: 'Paul Richter hat Schwierigkeiten mit der Textanalyse in Deutsch', 
      date: '11.11.2023',
      student: 'Paul Richter',
      subject: 'Deutsch'
    },
    { 
      id: 12, 
      type: 'goal', 
      content: 'Neues Ziel von Anna Schulz: "Präsentationstechniken verbessern"', 
      date: '10.11.2023',
      student: 'Anna Schulz',
      subject: 'Methodenkompetenz'
    },
    { 
      id: 13, 
      type: 'reflection', 
      content: 'Reflexion von Felix Weber: "Ich sollte mehr für Physik lernen"', 
      date: '09.11.2023',
      student: 'Felix Weber',
      subject: 'Physik'
    },
    { 
      id: 14, 
      type: 'achievement', 
      content: 'Laura Becker hat 100 Tage Lernstreak erreicht!', 
      date: '08.11.2023',
      student: 'Laura Becker',
      subject: 'Allgemein'
    },
    { 
      id: 15, 
      type: 'karma', 
      content: 'David Schmidt muss 5 Karma-Punkte abziehen für vergessene Hausaufgaben', 
      date: '07.11.2023',
      student: 'David Schmidt',
      subject: 'Mathematik'
    },
    { 
      id: 16, 
      type: 'feedback', 
      content: 'Sarah Köhler möchte Rückmeldung zu ihrem Business-Email', 
      date: '06.11.2023',
      student: 'Sarah Köhler',
      subject: 'Englisch'
    },
    { 
      id: 17, 
      type: 'reminder', 
      content: 'Moritz Fischer hat die Deadline für das Mathe-Projekt überschritten', 
      date: '05.11.2023',
      student: 'Moritz Fischer',
      subject: 'Mathematik'
    },
    { 
      id: 18, 
      type: 'grade', 
      content: 'Erste Note für Julia Wolf in Geschichte: 2,3', 
      date: '04.11.2023',
      student: 'Julia Wolf',
      subject: 'Geschichte'
    },
    { 
      id: 19, 
      type: 'competence', 
      content: 'Tim Bauer zeigt große Fortschritte in Teamfähigkeit', 
      date: '03.11.2023',
      student: 'Tim Bauer',
      subject: 'Sozialkompetenz'
    },
    { 
      id: 20, 
      type: 'question', 
      content: 'Frage von Hannah Müller: "Wie funktioniert die Kostenrechnung in BWL?"', 
      date: '02.11.2023',
      student: 'Hannah Müller',
      subject: 'BWL'
    },
  ];

  // Lehrer-spezifische Funktionen
  const functions: FunctionCard[] = [
    {
      id: 1,
      title: 'Reflexionsfrage stellen',
      icon: '❓',
      color: 'bg-purple-100 hover:bg-purple-200',
      description: 'Neue Fragen für Schüler',
    },
    {
      id: 2,
      title: 'Lernagenda aufrufen',
      icon: '📅',
      color: 'bg-blue-100 hover:bg-blue-200',
      description: 'Überblick über alle Schüler',
    },
    {
      id: 3,
      title: 'Noten überprüfen',
      icon: '📊',
      color: 'bg-green-100 hover:bg-green-200',
      description: 'Leistungen bewerten',
    },
    {
      id: 4,
      title: 'Vorsitzen',
      icon: '👨‍🏫',
      color: 'bg-red-100 hover:bg-red-200',
      description: 'Unterricht vorbereiten',
    },
    {
      id: 5,
      title: 'Handlungskompetenz eintragen',
      icon: '🛠️',
      color: 'bg-yellow-100 hover:bg-yellow-200',
      description: 'Kompetenzen bewerten',
    },
    {
      id: 6,
      title: 'Karma vergeben',
      icon: '⭐',
      color: 'bg-indigo-100 hover:bg-indigo-200',
      description: 'Punkte vergeben/abziehen',
    },
    {
      id: 7,
      title: 'Lernwegelisten anschauen',
      icon: '📝',
      color: 'bg-pink-100 hover:bg-pink-200',
      description: 'Fortschritte überwachen',
    },
    {
      id: 8,
      title: 'Verwaltung',
      icon: '⚙️',
      color: 'bg-gray-100 hover:bg-gray-200',
      description: 'Einstellungen & Verwaltung',
    },
  ];

  const handleFunctionClick = (functionId: number) => {
    console.log(`Lehrer-Funktion ${functionId} geklickt`);
    // Hier könnten später die Lehrer-Modals geöffnet werden
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <Header userName={userName} isTeacher={true} />
        
        {/* Zwei-Spalten-Layout für Desktop/Tablet */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Linke Spalte: Blog (scrollable) - nimmt 2/3 des Platzes */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-4 h-[calc(100vh-280px)] lg:h-[calc(100vh-300px)]">
              <BlogSection 
                entries={blogEntries} 
                isTeacherView={true}
              />
            </div>
          </div>
          
          {/* Rechte Spalte: Funktionen (fixed) - nimmt 1/3 des Platzes */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-4 h-[calc(100vh-280px)] lg:h-[calc(100vh-300px)] sticky top-6">
              <FunctionGrid 
                functions={functions} 
                onFunctionClick={handleFunctionClick}
                isTeacherView={true}
              />
            </div>
          </div>
        </div>

        {/* Mobile Ansicht (vertikal gestapelt) */}
        <div className="mt-6 block lg:hidden">
          <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
            <BlogSection 
              entries={blogEntries.slice(0, 5)} 
              isTeacherView={true}
            />
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4">
            <FunctionGrid 
              functions={functions} 
              onFunctionClick={handleFunctionClick}
              isTeacherView={true}
            />
          </div>
        </div>

        
      </div>
    </div>
  );
}

export default TeacherApp;