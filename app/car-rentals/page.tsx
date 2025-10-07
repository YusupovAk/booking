'use client';

import React from 'react';
import Link from 'next/link';
import CarRentalSearchForm from '../components/CarRentalSearchForm';
import HeroSection from '../components/HeroSection';

import { cars } from '../../lib/carData';

export default function CarRentalPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <HeroSection 
        title="Прокат автомобилей для вашей следующей поездки"
        subtitle="Бронируйте автомобили по лучшим ценам в более чем 60 000 точках по всему миру"
        showTrustIndicators={false}
      />
      <CarRentalSearchForm />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Популярные автомобили в аренду</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cars.map((car) => (
            <div key={car.id} className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
              <img src={car.image} alt={car.name} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{car.name}</h3>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-blue-600">{car.price}</span>
                  <Link href={`/car-rentals/${car.id}`} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300">
                    Забронировать
                  </Link>
                </div>
                <div className="flex flex-wrap gap-2">
                  {car.features.map((feature, i) => (
                    <span key={i} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium">{feature}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
