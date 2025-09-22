'use client';

import React from 'react';
import Link from 'next/link';

const RecentlyViewedSection: React.FC = () => {
  // Mock recently viewed hotels - in real app, this would come from localStorage or user data
  const recentlyViewed = [
    {
      id: '1',
      name: 'Hotel Novgorod',
      location: 'Tashkent, Uzbekistan',
      price: 120,
      rating: 8.5,
      image: 'https://via.placeholder.com/300x200?text=Hotel+Novgorod'
    },
    {
      id: '2',
      name: 'Grand Hotel',
      location: 'Samarkand, Uzbekistan',
      price: 150,
      rating: 9.0,
      image: 'https://via.placeholder.com/300x200?text=Grand+Hotel'
    }
  ];

  // Only show if there are recently viewed items
  if (recentlyViewed.length === 0) {
    return null;
  }

  return (
    <section className="py-16 px-6 bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">Недавно просмотренные</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recentlyViewed.map((hotel) => (
            <Link key={hotel.id} href={`/hotel/${hotel.id}`} className="block">
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-48 object-cover"
                    loading="lazy"
                  />
                  <button className="absolute top-2 right-2 bg-white rounded-full p-2 shadow hover:bg-gray-100">
                    ❤️
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-1">{hotel.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">{hotel.location}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-green-600 font-bold text-sm">
                        {hotel.rating >= 9 ? 'Отлично' : hotel.rating >= 8 ? 'Очень хорошо' : 'Хорошо'}
                      </span>
                      <span className="text-gray-500 ml-2 text-sm">{hotel.rating}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold">${hotel.price}</div>
                      <div className="text-sm text-gray-500">за ночь</div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentlyViewedSection;