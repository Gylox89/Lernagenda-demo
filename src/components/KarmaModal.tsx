import React from 'react';
import Modal from './Modal';
import type { KarmaEntry, Privilege, Sanction } from '../types';

interface KarmaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const KarmaModal: React.FC<KarmaModalProps> = ({ isOpen, onClose }) => {
  const karmaEntries: KarmaEntry[] = [
    { id: 1, points: 10, reason: 'Hausaufgaben pünktlich abgegeben', date: 'Heute, 10:30', type: 'positive' },
    { id: 2, points: 5, reason: 'Mitschülern geholfen', date: 'Gestern, 14:20', type: 'positive' },
    { id: 3, points: -5, reason: 'Unterrichtsmaterial vergessen', date: '15.11.2023', type: 'negative' },
    { id: 4, points: 15, reason: 'Besonders gute Mitarbeit', date: '14.11.2023', type: 'positive' },
    { id: 5, points: -10, reason: 'Zu spät zum Unterricht', date: '13.11.2023', type: 'negative' },
    { id: 6, points: 20, reason: 'Freiwillige Zusatzaufgabe', date: '12.11.2023', type: 'positive' },
    { id: 7, points: 5, reason: 'Klassenzimmer aufgeräumt', date: '11.11.2023', type: 'positive' },
  ];

  const privileges: Privilege[] = [
    { id: 1, name: '5 Minuten früher in die Pause', karmaThreshold: 50, description: 'Bei 50+ Punkten' },
    { id: 2, name: 'Hausaufgabenpass', karmaThreshold: 100, description: '1x Hausaufgaben aussetzen' },
    { id: 3, name: 'Sitzplatzwahl', karmaThreshold: 150, description: 'Sitzplatz für eine Woche wählen' },
    { id: 4, name: 'Klassenassistent', karmaThreshold: 200, description: 'Besondere Verantwortung' },
  ];

  const sanctions: Sanction[] = [
    { id: 1, name: 'Zusatzaufgabe', karmaThreshold: -20, description: 'Bei -20 Punkten' },
    { id: 2, name: 'Nachsitzen', karmaThreshold: -50, description: '30 Minuten nachsitzen' },
    { id: 3, name: 'Elterngespräch', karmaThreshold: -100, description: 'Bei -100 Punkten' },
  ];

  const totalKarma = karmaEntries.reduce((sum, entry) => sum + entry.points, 0);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Dein Karma-Konto"
      size="xl"
    >
      <div className="space-y-6">
        {/* Karma Übersicht */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-indigo-700">Aktueller Karma-Stand</p>
              <p className={`text-3xl font-bold ${totalKarma >= 0 ? 'text-indigo-800' : 'text-red-600'}`}>
                {totalKarma >= 0 ? '+' : ''}{totalKarma} Punkte
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-indigo-700">Nächstes Level</p>
              <p className="font-medium text-indigo-800">Silber (ab 150 Punkten)</p>
            </div>
          </div>
        </div>

        {/* Karma Verlauf */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Karma-Verlauf</h4>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {karmaEntries.map((entry) => (
              <div
                key={entry.id}
                className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    entry.type === 'positive' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                  }`}>
                    {entry.type === 'positive' ? '+' : ''}{entry.points}
                  </div>
                  <div>
                    <p className="text-sm text-gray-800">{entry.reason}</p>
                    <p className="text-xs text-gray-500">{entry.date}</p>
                  </div>
                </div>
                <span className={`text-sm font-medium ${
                  entry.type === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {entry.type === 'positive' ? '+' : ''}{entry.points}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Privilegien und Sanktionen */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Privilegien */}
          <div className="border border-green-200 rounded-lg p-4 bg-green-50">
            <h4 className="text-sm font-medium text-green-800 mb-3 flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Verfügbare Privilegien
            </h4>
            <div className="space-y-2">
              {privileges.map((privilege) => (
                <div
                  key={privilege.id}
                  className={`p-3 rounded-lg ${
                    totalKarma >= privilege.karmaThreshold
                      ? 'bg-white border border-green-300'
                      : 'bg-gray-100 border border-gray-200 opacity-60'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-800">{privilege.name}</p>
                      <p className="text-xs text-gray-600">{privilege.description}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      totalKarma >= privilege.karmaThreshold
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      ab {privilege.karmaThreshold} Punkten
                    </span>
                  </div>
                  {totalKarma >= privilege.karmaThreshold && (
                    <button className="mt-2 w-full text-sm bg-green-500 text-white py-1 rounded hover:bg-green-600 transition-colors">
                      Privileg einlösen
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Sanktionen */}
          <div className="border border-red-200 rounded-lg p-4 bg-red-50">
            <h4 className="text-sm font-medium text-red-800 mb-3 flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              Aktive Sanktionen
            </h4>
            <div className="space-y-2">
              {sanctions.map((sanction) => (
                <div
                  key={sanction.id}
                  className={`p-3 rounded-lg ${
                    totalKarma <= sanction.karmaThreshold
                      ? 'bg-white border border-red-300'
                      : 'bg-gray-100 border border-gray-200 opacity-60'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-800">{sanction.name}</p>
                      <p className="text-xs text-gray-600">{sanction.description}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      totalKarma <= sanction.karmaThreshold
                        ? 'bg-red-100 text-red-800'
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      ab {sanction.karmaThreshold} Punkten
                    </span>
                  </div>
                  {totalKarma <= sanction.karmaThreshold && (
                    <div className="mt-2 text-xs text-red-600 font-medium">
                      Diese Sanktion ist aktuell aktiv
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default KarmaModal;