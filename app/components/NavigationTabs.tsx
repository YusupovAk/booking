'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavigationTabs: React.FC = () => {
  const pathname = usePathname();

  const tabs = [
    { name: 'Жилье', icon: '🏠', path: '/' },
    { name: 'Авиабилеты', icon: '✈️', path: '/flights' },
    { name: 'Прокат авто', icon: '🚗', path: '/car-rentals' },
    { name: 'Достопримечательности', icon: '🎯', path: '/attractions' },
    { name: 'Трансфер из аэропорта', icon: '🚕', path: '/taxi' },
  ];

  return (
    <nav className="bg-card shadow-sm py-4 px-6 border-b border-border">
      <div className="max-w-7xl mx-auto">
        <div className="flex space-x-2 overflow-x-auto">
          {tabs.map((tab, index) => {
            const isActive = (tab.path === '/' && (pathname === '/' || pathname.startsWith('/hotel'))) || (tab.path !== '/' && pathname.startsWith(tab.path));
            return (
              <Link
                key={index}
                href={tab.path}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full border transition-all duration-200 whitespace-nowrap ${
                  isActive
                    ? 'bg-primary text-primary-foreground border-primary shadow-md'
                    : 'bg-secondary text-secondary-foreground border-border hover:bg-accent hover:border-primary'
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                <span className="font-medium">{tab.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default NavigationTabs;