import React, { useState } from 'react';
import Modal from './Modal';
import { type LearningPath } from './../types';

interface LearningPathModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LearningPathModal: React.FC<LearningPathModalProps> = ({ isOpen, onClose }) => {
  const [learningPaths, setLearningPaths] = useState<LearningPath[]>([
    {
      id: 1,
      subject: 'Mathematik',
      color: 'bg-blue-100',
      icon: '∫',
      description: 'AVdual - Mathematik: Grundlagen der Analysis',
      totalItems: 8,
      completedItems: 3,
      items: [
        {
          id: 1,
          title: 'Funktionsbegriff und -eigenschaften',
          description: 'Definition von Funktionen, Definitions- und Wertebereich',
          status: 'completed',
          estimatedHours: 4,
          resources: ['Buch S. 45-60', 'Übungsblatt 1']
        },
        {
          id: 2,
          title: 'Lineare Funktionen',
          description: 'Geradengleichungen, Steigung, Nullstellen',
          status: 'completed',
          estimatedHours: 6,
          prerequisites: [1],
          resources: ['Buch S. 61-80', 'Online-Quiz']
        },
        {
          id: 3,
          title: 'Quadratische Funktionen',
          description: 'Parabeln, Scheitelpunktform, pq-Formel',
          status: 'completed',
          estimatedHours: 8,
          prerequisites: [1, 2],
          resources: ['Buch S. 81-100', 'Arbeitsblatt 3']
        },
        {
          id: 4,
          title: 'Potenz- und Wurzelfunktionen',
          description: 'Exponentialfunktionen, Logarithmus',
          status: 'in-progress',
          estimatedHours: 10,
          prerequisites: [1, 2, 3],
          resources: ['Buch S. 101-120', 'E-Learning Modul']
        },
        {
          id: 5,
          title: 'Differentialrechnung - Einführung',
          description: 'Ableitungsbegriff, h-Methode',
          status: 'not-started',
          estimatedHours: 12,
          prerequisites: [1, 2, 3, 4],
          resources: ['Buch S. 121-140']
        },
        {
          id: 6,
          title: 'Ableitungsregeln',
          description: 'Summen-, Produkt-, Quotienten-, Kettenregel',
          status: 'not-started',
          estimatedHours: 10,
          prerequisites: [5],
          resources: ['Buch S. 141-160']
        },
        {
          id: 7,
          title: 'Kurvendiskussion',
          description: 'Extremstellen, Wendepunkte, Monotonie',
          status: 'not-started',
          estimatedHours: 14,
          prerequisites: [5, 6],
          resources: ['Buch S. 161-180', 'Übungsaufgaben']
        },
        {
          id: 8,
          title: 'Anwendungen der Differentialrechnung',
          description: 'Optimierungsaufgaben, Wachstumsprozesse',
          status: 'not-started',
          estimatedHours: 12,
          prerequisites: [5, 6, 7],
          resources: ['Buch S. 181-200', 'Projektaufgabe']
        }
      ]
    },
    {
      id: 2,
      subject: 'Deutsch',
      color: 'bg-red-100',
      icon: '📚',
      description: 'AVdual - Deutsch: Kommunikation und Textanalyse',
      totalItems: 7,
      completedItems: 2,
      items: [
        {
          id: 1,
          title: 'Kommunikationsmodelle',
          description: 'Sender-Empfänger-Modell, 4-Seiten-Modell',
          status: 'completed',
          estimatedHours: 6,
          resources: ['Buch S. 25-40']
        },
        {
          id: 2,
          title: 'Textsorten erkennen',
          description: 'Bericht, Kommentar, Reportage, Glosse',
          status: 'completed',
          estimatedHours: 8,
          prerequisites: [1],
          resources: ['Buch S. 41-60', 'Textsammlung']
        },
        {
          id: 3,
          title: 'Textanalyse - Aufbau',
          description: 'Einleitung, Hauptteil, Schluss',
          status: 'in-progress',
          estimatedHours: 10,
          prerequisites: [1, 2],
          resources: ['Buch S. 61-80', 'Musteranalysen']
        },
        {
          id: 4,
          title: 'Sprachliche Mittel',
          description: 'Metaphern, Vergleiche, rhetorische Figuren',
          status: 'in-progress',
          estimatedHours: 8,
          prerequisites: [3],
          resources: ['Buch S. 81-100']
        },
        {
          id: 5,
          title: 'Argumentationstechniken',
          description: 'These-Argument-Beispiel, Toulmin-Schema',
          status: 'not-started',
          estimatedHours: 12,
          prerequisites: [1, 2, 3],
          resources: ['Buch S. 101-120']
        },
        {
          id: 6,
          title: 'Berichte schreiben',
          description: 'Unfallbericht, Protokoll, Geschäftsbericht',
          status: 'not-started',
          estimatedHours: 10,
          prerequisites: [2, 5],
          resources: ['Buch S. 121-140']
        },
        {
          id: 7,
          title: 'Präsentationstechniken',
          description: 'Vortrag halten, Visualisierungen, Körpersprache',
          status: 'not-started',
          estimatedHours: 14,
          prerequisites: [1, 5],
          resources: ['Buch S. 141-160', 'Präsentationssoftware']
        }
      ]
    },
    {
      id: 3,
      subject: 'Englisch',
      color: 'bg-green-100',
      icon: '🇬🇧',
      description: 'AVdual - Englisch: Business Communication',
      totalItems: 6,
      completedItems: 4,
      items: [
        {
          id: 1,
          title: 'Business Vocabulary',
          description: 'Wortschatz für Geschäftskommunikation',
          status: 'completed',
          estimatedHours: 8,
          resources: ['Vokabelliste 1-100', 'Flashcards']
        },
        {
          id: 2,
          title: 'Telephone English',
          description: 'Telefongespräche führen, Termine vereinbaren',
          status: 'completed',
          estimatedHours: 10,
          prerequisites: [1],
          resources: ['Hörübungen', 'Dialoge']
        },
        {
          id: 3,
          title: 'Business Emails',
          description: 'Formelle E-Mails schreiben, Struktur und Style',
          status: 'completed',
          estimatedHours: 12,
          prerequisites: [1],
          resources: ['Email-Vorlagen', 'Übungsaufgaben']
        },
        {
          id: 4,
          title: 'Meetings & Presentations',
          description: 'Meeting-Vokabular, Präsentationen halten',
          status: 'completed',
          estimatedHours: 14,
          prerequisites: [1, 2],
          resources: ['Meeting-Phrasen', 'Präsentationsübungen']
        },
        {
          id: 5,
          title: 'Negotiation Skills',
          description: 'Verhandlungen führen auf Englisch',
          status: 'in-progress',
          estimatedHours: 16,
          prerequisites: [1, 2, 4],
          resources: ['Rollenspiele', 'Case Studies']
        },
        {
          id: 6,
          title: 'Cross-cultural Communication',
          description: 'Interkulturelle Unterschiede in der Geschäftswelt',
          status: 'not-started',
          estimatedHours: 12,
          prerequisites: [1, 4, 5],
          resources: ['Kulturvergleiche', 'Länderspezifika']
        }
      ]
    },
    {
      id: 4,
      subject: 'BWL',
      color: 'bg-yellow-100',
      icon: '💼',
      description: 'AVdual - BWL: Grundlagen der Betriebswirtschaft',
      totalItems: 9,
      completedItems: 1,
      items: [
        {
          id: 1,
          title: 'Unternehmensformen',
          description: 'Einzelunternehmen, GmbH, AG, Genossenschaft',
          status: 'completed',
          estimatedHours: 6,
          resources: ['Buch S. 30-45']
        },
        {
          id: 2,
          title: 'Unternehmensziele',
          description: 'Gewinnmaximierung, Marktanteil, Nachhaltigkeit',
          status: 'in-progress',
          estimatedHours: 8,
          prerequisites: [1],
          resources: ['Buch S. 46-60', 'Fallbeispiele']
        },
        {
          id: 3,
          title: 'Marketing-Grundlagen',
          description: '4Ps, Marktforschung, Zielgruppenanalyse',
          status: 'not-started',
          estimatedHours: 12,
          prerequisites: [1, 2],
          resources: ['Buch S. 61-80']
        },
        {
          id: 4,
          title: 'Beschaffung & Logistik',
          description: 'Einkauf, Lagerhaltung, Supply Chain',
          status: 'not-started',
          estimatedHours: 10,
          prerequisites: [1],
          resources: ['Buch S. 81-100']
        },
        {
          id: 5,
          title: 'Produktion & Fertigung',
          description: 'Produktionsverfahren, Qualitätsmanagement',
          status: 'not-started',
          estimatedHours: 12,
          prerequisites: [4],
          resources: ['Buch S. 101-120']
        },
        {
          id: 6,
          title: 'Personalwesen',
          description: 'Personalplanung, -beschaffung, -entwicklung',
          status: 'not-started',
          estimatedHours: 10,
          prerequisites: [1],
          resources: ['Buch S. 121-140']
        },
        {
          id: 7,
          title: 'Rechnungswesen Einführung',
          description: 'Buchführung, Bilanz, GuV',
          status: 'not-started',
          estimatedHours: 14,
          prerequisites: [1],
          resources: ['Buch S. 141-160']
        },
        {
          id: 8,
          title: 'Kostenrechnung',
          description: 'Kostenarten, -stellen, -träger',
          status: 'not-started',
          estimatedHours: 16,
          prerequisites: [7],
          resources: ['Buch S. 161-180']
        },
        {
          id: 9,
          title: 'Investition & Finanzierung',
          description: 'Kapitalbedarf, Finanzierungsquellen, Rendite',
          status: 'not-started',
          estimatedHours: 14,
          prerequisites: [7, 8],
          resources: ['Buch S. 181-200']
        }
      ]
    }
  ]);

  const handleStatusChange = (pathId: number, itemId: number, newStatus: 'not-started' | 'in-progress' | 'completed') => {
    setLearningPaths(prev => prev.map(path => {
      if (path.id === pathId) {
        const updatedItems = path.items.map(item => {
          if (item.id === itemId) {
            return { ...item, status: newStatus };
          }
          return item;
        });
        
        const completedItems = updatedItems.filter(item => item.status === 'completed').length;
        
        return {
          ...path,
          items: updatedItems,
          completedItems,
          totalItems: updatedItems.length
        };
      }
      return path;
    }));
  };

const getStatusColor = (status: string) => {
  switch (status) {
    case 'not-started': return 'bg-gray-100 text-gray-800 border border-gray-300';
    case 'in-progress': return 'bg-gradient-to-r from-yellow-50 to-amber-50 text-amber-800 border border-amber-300 shadow-sm';
    case 'completed': return 'bg-gradient-to-r from-green-50 to-emerald-50 text-emerald-800 border border-emerald-300 shadow-sm';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'not-started': return '○';
    case 'in-progress': return '⟳';
    case 'completed': return '✓';
    default: return '○';
  }
};

  const calculateProgress = (path: LearningPath) => {
    return Math.round((path.completedItems / path.totalItems) * 100);
  };

  const getOverallProgress = () => {
    const totalItems = learningPaths.reduce((sum, path) => sum + path.totalItems, 0);
    const completedItems = learningPaths.reduce((sum, path) => sum + path.completedItems, 0);
    return Math.round((completedItems / totalItems) * 100);
  };

return (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    title="Lernwegelisten - AVdual Lehrplan"
    size="xl" // Ändere zu "full" oder "screen" für breiteres Modal
  >
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
          ></div>
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
          

          {/* Horizontale Scroll-Liste */}
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
                  
                  <div 
  className="p-4 h-96 overflow-y-auto"
  style={{
    msOverflowStyle: 'none',  /* IE and Edge */
    scrollbarWidth: 'none',   /* Firefox */
  }}
>
  <div 
    className="space-y-3"
    style={{
      /* Für Chrome, Safari und Opera */
      scrollbarWidth: 'none',
    }}
  >
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
            onClick={() => {
              const currentStatus = item.status;
              const nextStatus = 
                currentStatus === 'not-started' ? 'in-progress' :
                currentStatus === 'in-progress' ? 'completed' : 'not-started';
              handleStatusChange(path.id, item.id, nextStatus);
            }}
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
    
    {/* Status-Badge mit verbesserter Darstellung */}
    <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
      <div className="flex items-center space-x-2">
        <span className={`
          text-xs font-semibold px-3 py-1.5 rounded-full
          ${
             item.status === 'in-progress' 
            ? 'bg-amber-500 text-white shadow-sm' 
            : ''
          }
        `}>
          {
           item.status === 'in-progress' ? 'IN BEARBEITUNG' : ''}
        </span>
        
       
        
        {/* Erfolgs-Icon für "completed" */}
        
      </div>
      
      {/* Prüfungs-Icon für abgeschlossene Themen */}
      
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

        {/* Scroll-Hinweis für Mobile */}
        <div className="lg:hidden mt-2 text-center">
          <p className="text-xs text-gray-500">↔ Ziehe zum Scrollen</p>
        </div>
      </div>

      
    </div>
  </Modal>
);
};

export default LearningPathModal;