'use client';

import React from 'react';
import Link from 'next/link';
import { useHotelStore } from '../../lib/store';

const ContentSection: React.FC = () => {
  const { searchResults, isLoading, error } = useHotelStore();

  if (isLoading) {
    return (
      <section id="search-results" className="bg-gray-50 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Результаты поиска</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                <div className="w-full h-48 bg-gray-300"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="search-results" className="bg-gray-50 py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-8">Ошибка</h2>
          <p className="text-red-600">{error}</p>
        </div>
      </section>
    );
  }

  if (searchResults.length === 0) {
    return (
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Вам еще интересны эти варианты?</h2>
          <p className="text-center text-gray-600">Используйте форму поиска выше, чтобы найти отели.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="search-results" className="bg-gray-50 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-8">Результаты поиска ({searchResults.length})</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {searchResults.map((hotel) => (
            <Link key={hotel.id} href={`/hotel/${hotel.id}`} className="block">
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-48 object-cover"
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
        {/* Pagination placeholder */}
        {searchResults.length > 0 && (
          <div className="mt-8 flex justify-center">
            <div className="flex space-x-2">
              <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100">1</button>
              <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100">2</button>
              <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100">3</button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ContentSection;