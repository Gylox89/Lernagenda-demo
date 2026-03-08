import React from 'react';

interface HeaderProps {
  userName: string;
}

const Header: React.FC<HeaderProps> = ({ userName }) => {
  return (
    <header className="bg-gradient-to-r from-primary-500 to-primary-600 text-black p-4 rounded-b-2xl shadow-lg">
      <div className="container mx-auto">
        <h3 className="text-2xl font-bold">Willkommen zurück, {userName}! </h3>
      </div>
    </header>
  );
};

export default Header;