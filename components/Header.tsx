
import React from 'react';
import { BackArrowIcon } from './icons';

export const Header: React.FC = () => {
  return (
    <header className="bg-gray-50 text-black flex items-center justify-between p-4 flex-shrink-0 z-50 border-b">
      <button className="p-2" aria-label="Go back">
        <BackArrowIcon className="w-6 h-6" />
      </button>
      <h1 className="text-lg font-semibold">Wallet</h1>
      <div className="w-8 h-8" />
    </header>
  );
};
