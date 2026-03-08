import React from 'react';

interface CurrentStatusProps {
  data: {
    currentGrade: string;
    currentKarma: number;
    currentGoal: string;
  };
}

const CurrentStatus: React.FC<CurrentStatusProps> = ({ data }) => {
  const statusItems = [
    {
      title: 'Aktuelle Mathe-Note',
      value: data.currentGrade,
      icon: '📊',
      color: 'bg-blue-100 text-blue-800',
    },
    {
      title: 'Dein Karma',
      value: `${data.currentKarma} Punkte`,
      icon: '⭐',
      color: 'bg-yellow-100 text-yellow-800',
    },
    {
      title: 'Aktuelles Ziel',
      value: data.currentGoal,
      icon: '🎯',
      color: 'bg-green-100 text-green-800',
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-4 mb-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">Dein aktueller Stand</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {statusItems.map((item, index) => (
          <div
            key={index}
            className={`${item.color} rounded-lg p-3 flex items-center space-x-3`}
          >
            <span className="text-2xl">{item.icon}</span>
            <div>
              <p className="font-medium">{item.title}</p>
              <p className="text-sm opacity-90">{item.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurrentStatus;