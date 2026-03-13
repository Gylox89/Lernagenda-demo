import React from 'react';

interface FunctionCard {
  id: number;
  title: string;
  icon: string;
  color: string;
  description: string;
}

interface FunctionGridProps {
  functions: FunctionCard[];
  onFunctionClick: (functionId: number) => void;
  isTeacherView?: boolean;
}

const FunctionGrid: React.FC<FunctionGridProps> = ({ functions, onFunctionClick, isTeacherView = false }) => {
  return (
    <div className="h-full flex flex-col">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          {isTeacherView ? '' : 'Deine Funktionen'}
        </h2>
        <p className="text-sm text-gray-600">
          {isTeacherView ? '' : 'Alle wichtigen Tools auf einen Blick'}
        </p>
      </div>
      
      <div className="grid grid-cols-2 gap-4 flex-1">
        {functions.map((func) => (
          <button
            key={func.id}
            className={`${func.color} rounded-xl shadow-md p-4 flex flex-col items-center justify-center hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5`}
            onClick={() => onFunctionClick(func.id)}
          >
            <span className="text-3xl mb-2">{func.icon}</span>
            <h3 className="font-semibold text-gray-800 text-center text-sm md:text-base">{func.title}</h3>
       
          </button>
        ))}
      </div>
      
      
    </div>
  );
};

export default FunctionGrid;