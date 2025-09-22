import React from 'react';
import Image from 'next/image';

const TrendingDestinationsSection: React.FC = () => {
  const destinations = [
    {
      name: 'Москва',
      country: 'Россия',
      properties: 2847,
      image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      altText: 'Luxury hotel in Moscow city center with modern architecture and Red Square view, featuring elegant facade and premium accommodation'
    },
    {
      name: 'Санкт-Петербург',
      country: 'Россия',
      properties: 1923,
      image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      altText: 'Historic hotel in Saint Petersburg with neoclassical architecture, canals and bridges in background, luxury waterfront accommodation'
    },
    {
      name: 'Сочи',
      country: 'Россия',
      properties: 1456,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      altText: 'Beachfront hotel in Sochi with Black Sea views, Olympic Park in background, modern resort architecture with palm trees'
    },
    {
      name: 'Казань',
      country: 'Россия',
      properties: 987,
      image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      altText: 'Modern hotel in Kazan with blend of traditional Tatar architecture and contemporary design, Kremlin towers visible in background'
    },
    {
      name: 'Екатеринбург',
      country: 'Россия',
      properties: 756,
      image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      altText: 'Contemporary hotel in Yekaterinburg city center, modern glass facade with Ural mountains backdrop, business and leisure accommodation'
    },
    {
      name: 'Краснодар',
      country: 'Россия',
      properties: 623,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      altText: 'Riverside hotel in Krasnodar with Kuban River views, modern architecture with green spaces, comfortable urban accommodation'
    }
  ];

  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Популярные направления</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((destination, index) => (
            <a
              key={index}
              href={`/?destination=${encodeURIComponent(destination.name + ', ' + destination.country)}`}
              className="block group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-xl"
              aria-label={`Найти отели в ${destination.name}, ${destination.country} с ${destination.properties.toLocaleString()} доступными вариантами`}
            >
              <div className="relative rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 group-hover:scale-[1.02]">
                <div className="aspect-[4/3] relative">
                  <Image
                    src={destination.image}
                    alt={destination.altText}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={index < 3}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold mb-1 group-hover:text-blue-200 transition-colors">
                      {destination.name}
                    </h3>
                    <p className="text-sm opacity-90">{destination.country}</p>
                    <p className="text-sm opacity-75">{destination.properties.toLocaleString()} отелей</p>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                    <span className="text-sm font-medium text-gray-800">🏨 Отели</span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingDestinationsSection;