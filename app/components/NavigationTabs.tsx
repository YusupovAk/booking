'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavigationTabs: React.FC = () => {
  const pathname = usePathname();

  const tabs = [
    { name: 'Жилье', icon: '🏠', path: '/', active: pathname === '/' },
    { name: 'Авиабилеты', icon: '✈️', path: '/flights', active: pathname === '/flights' },
    { name: 'Прокат авто', icon: '🚗', path: '/cars', active: pathname === '/cars' },
    { name: 'Достопримечательности', icon: '🎯', path: '/attractions', active: pathname === '/attractions' },
    { name: 'Трансфер из аэропорта', icon: '🚕', path: '/taxi', active: pathname === '/taxi' },
  ];

  return (
    <nav className="bg-white shadow-sm py-4 px-6 border-b border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="flex space-x-2 overflow-x-auto">
          {tabs.map((tab, index) => (
            <Link key={index} href={tab.path}>
              <button
                className={`flex items-center space-x-2 px-6 py-3 rounded-full border transition-all duration-200 whitespace-nowrap ${
                  tab.active
                    ? 'bg-[#003580] text-white border-[#003580] shadow-md'
                    : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100 hover:border-gray-300'
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                <span className="font-medium">{tab.name}</span>
              </button>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default NavigationTabs;