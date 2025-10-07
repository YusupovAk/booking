'use client';

import React from 'react';
import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';
import { cars } from '../../../lib/carData';

const Map = dynamic(() => import('@/app/components/Map'), {
  ssr: false,
  loading: () => <p>Loading map...</p>
}) as React.ComponentType<{ lat: number; lng: number }>;

export default function CarDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = React.use(params);
  const car = cars.find(c => c.id === parseInt(resolvedParams.id));

  if (!car) {
    notFound();
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Car Gallery and Details */}
          <div className="lg:col-span-2">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">{car.name}</h1>
            <div className="mb-8">
              <img src={car.gallery[0]} alt={car.name} className="w-full h-auto rounded-lg shadow-lg" />
              <div className="grid grid-cols-3 gap-4 mt-4">
                <img src={car.gallery[1]} alt={`${car.name} 2`} className="w-full h-auto rounded-lg shadow-md" />
                <img src={car.gallery[2]} alt={`${car.name} 3`} className="w-full h-auto rounded-lg shadow-md" />
                <div className="relative flex items-center justify-center bg-gray-200 rounded-lg shadow-md cursor-pointer hover:bg-gray-300">
                  <span className="text-lg font-semibold">+ See all photos</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">About this car</h2>
              <p className="text-gray-600 mb-6">{car.description}</p>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Features</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {car.features.map((feature, i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <span className="text-blue-500">✓</span>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Pick-up Location</h2>
              <Map lat={car.lat} lng={car.lng} />
            </div>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-lg sticky top-24">
              <div className="flex items-baseline justify-between mb-6">
                <span className="text-3xl font-bold text-gray-800">{car.price}</span>
                <span className="text-gray-500">per day</span>
              </div>
              <form>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="pickup-date" className="block text-sm font-medium text-gray-700">Pick-up date</label>
                    <input type="date" id="pickup-date" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                  </div>
                  <div>
                    <label htmlFor="dropoff-date" className="block text-sm font-medium text-gray-700">Drop-off date</label>
                    <input type="date" id="dropoff-date" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                  </div>
                  <div>
                    <label htmlFor="pickup-location" className="block text-sm font-medium text-gray-700">Pick-up location</label>
                    <select id="pickup-location" className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                      <option>Tashkent Airport</option>
                      <option>Samarkand City Center</option>
                      <option>Bukhara Train Station</option>
                    </select>
                  </div>
                </div>
                <button type="submit" className="mt-8 w-full bg-blue-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 text-lg">Book Now</button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
