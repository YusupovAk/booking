import React from 'react';

const NavigationTabs: React.FC = () => {
  const tabs = [
    { name: 'Жилье', icon: '🏠', active: true },
    { name: 'Авиабилеты', icon: '✈️', active: false },
    { name: 'Прокат авто', icon: '🚗', active: false },
    { name: 'Достопримечательности', icon: '🎯', active: false },
    { name: 'Трансфер из аэропорта', icon: '🚕', active: false },
  ];

  return (
    <nav className="bg-white shadow-sm py-4 px-6 border-b border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="flex space-x-2 overflow-x-auto">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full border transition-all duration-200 whitespace-nowrap ${
                tab.active
                  ? 'bg-[#003580] text-white border-[#003580] shadow-md'
                  : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100 hover:border-gray-300'
              }`}
            >
              <span className="text-lg">{tab.icon}</span>
              <span className="font-medium">{tab.name}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default NavigationTabs;