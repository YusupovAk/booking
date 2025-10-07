'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Header from '../components/Header';
import NavigationTabs from '../components/NavigationTabs';
import Footer from '../components/Footer';
import FlightSearchForm from './FlightSearchForm';
import AviaBilet from './AviaBilet';
import { generateFlightTicketPDF, generateMultipleTicketsPDF } from '../../lib/pdfGenerator';
import BookingSuccessMessage from '../components/BookingSuccessMessage';

const Map = dynamic(() => import('../components/Map'), {
  ssr: false,
  loading: () => <p>Loading map...</p>
}) as React.ComponentType<{ positions: { lat: number; lng: number; popup?: string }[]; zoom?: number }>;

interface Flight {
  id: string;
  airline: string;
  flightNumber: string;
  departure: {
    city: string;
    airport: string;
    time: string;
    date: string;
  };
  arrival: {
    city: string;
    airport: string;
    time: string;
    date: string;
    lat: number;
    lng: number;
  };
  duration: string;
  price: number;
  currency: string;
  availableSeats: number;
  class: string;
}

const FlightsPage: React.FC = () => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [selectedFlights, setSelectedFlights] = useState<Flight[]>([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const searchFormRef = React.useRef<any>(null);

  // Mock flight data
  const mockFlights: Flight[] = [
    {
      id: '1',
      airline: 'Uzbekistan Airways',
      flightNumber: 'HY 501',
      departure: {
        city: 'Ташкент',
        airport: 'TAS',
        time: '08:00',
        date: '2025-01-15'
      },
      arrival: {
        city: 'Москва',
        airport: 'SVO',
        time: '10:30',
        date: '2025-01-15',
        lat: 55.7558,
        lng: 37.6173
      },
      duration: '4ч 30м',
      price: 250000,
      currency: 'UZS',
      availableSeats: 45,
      class: 'economy'
    },
    {
      id: '2',
      airline: 'Aeroflot',
      flightNumber: 'SU 1234',
      departure: {
        city: 'Ташкент',
        airport: 'TAS',
        time: '14:20',
        date: '2025-01-15'
      },
      arrival: {
        city: 'Москва',
        airport: 'SVO',
        time: '16:50',
        date: '2025-01-15',
        lat: 55.7558,
        lng: 37.6173
      },
      duration: '4ч 30м',
      price: 280000,
      currency: 'UZS',
      availableSeats: 23,
      class: 'economy'
    },
    {
      id: '3',
      airline: 'Turkish Airlines',
      flightNumber: 'TK 345',
      departure: {
        city: 'Ташкент',
        airport: 'TAS',
        time: '22:15',
        date: '2025-01-15'
      },
      arrival: {
        city: 'Стамбул',
        airport: 'IST',
        time: '01:45',
        date: '2025-01-16',
        lat: 41.0082,
        lng: 28.9784
      },
      duration: '5ч 30м',
      price: 320000,
      currency: 'UZS',
      availableSeats: 67,
      class: 'economy'
    }
  ];

  const handleSearch = (searchData: any) => {
    // In a real app, this would call an API
    // For now, filter mock data based on search criteria
    let filteredFlights = mockFlights;

    if (searchData.from) {
      filteredFlights = filteredFlights.filter(flight =>
        flight.departure.city.toLowerCase().includes(searchData.from.toLowerCase())
      );
    }

    if (searchData.to) {
      filteredFlights = filteredFlights.filter(flight =>
        flight.arrival.city.toLowerCase().includes(searchData.to.toLowerCase())
      );
    }

    setFlights(filteredFlights);
    setSearchPerformed(true);
  };

  const handleBook = (flight: Flight) => {
    const flightWithBookingDetails = {
      ...flight,
      seat: '18A',
      gate: 'B7'
    };

    // Generate PDF ticket with realistic passenger data
    generateFlightTicketPDF(flightWithBookingDetails, {
      name: 'АХМЕДОВ АХМЕД АХМЕДОВИЧ',
      surname: 'АХМЕДОВ',
      email: 'ahmed.ahmedov@gmail.com',
      phone: '+998 90 123-45-67',
      passport: 'AB1234567',
      nationality: 'УЗБЕКИСТАН'
    });

    setShowSuccessMessage(true);
  };

  const handleFlightSelect = (flight: Flight, isSelected: boolean) => {
    if (isSelected) {
      setSelectedFlights(prev => [...prev, flight]);
    } else {
      setSelectedFlights(prev => prev.filter(f => f.id !== flight.id));
    }
  };

  const handleCompareSelected = () => {
    if (selectedFlights.length < 2) {
      alert('Выберите минимум 2 рейса для сравнения');
      return;
    }
    alert(`Сравнение ${selectedFlights.length} рейсов: ${selectedFlights.map(f => f.flightNumber).join(', ')}`);
  };

  const handleBookSelected = () => {
    if (selectedFlights.length === 0) {
      alert('Выберите рейсы для бронирования');
      return;
    }

    // Generate PDF for multiple tickets
    generateMultipleTicketsPDF(selectedFlights, {
      name: 'АХМЕДОВ АХМЕД АХМЕДОВИЧ',
      surname: 'АХМЕДОВ',
      email: 'ahmed.ahmedov@gmail.com',
      phone: '+998 90 123-45-67',
      passport: 'AB1234567',
      nationality: 'УЗБЕКИСТАН'
    });

    setShowSuccessMessage(true);

    // Clear selection after booking
    clearSelection();
  };

  const clearSelection = () => {
    setSelectedFlights([]);
  };

  const handlePopularRouteClick = (from: string, to: string) => {
    if (searchFormRef.current) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const dateString = tomorrow.toISOString().split('T')[0];

      searchFormRef.current.setFormData({
        from: from,
        to: to,
        departureDate: dateString,
        passengers: 1,
        class: 'economy'
      });

      // Scroll to search form smoothly
      const searchFormElement = document.getElementById('flight-search-form');
      searchFormElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });

      // Auto-submit after a short delay
      setTimeout(() => {
        searchFormRef.current.submitForm();
      }, 500);
    }
  };

  const handleDestinationClick = (destination: string) => {
    if (searchFormRef.current) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const dateString = tomorrow.toISOString().split('T')[0];

      searchFormRef.current.setFormData({
        from: 'Ташкент',
        to: destination,
        departureDate: dateString,
        passengers: 1,
        class: 'economy'
      });

      // Scroll to search form smoothly
      const searchFormElement = document.getElementById('flight-search-form');
      searchFormElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });

      // Auto-submit after a short delay
      setTimeout(() => {
        searchFormRef.current.submitForm();
      }, 500);
    }
  };
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <NavigationTabs />

      {showSuccessMessage && <BookingSuccessMessage onClose={() => setShowSuccessMessage(false)} />}

      {/* Flight Hero Section */}
      <section className="relative bg-gradient-to-br from-[#003580] via-[#002050] to-[#001530] text-white py-24 px-6 text-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`
          }}
          role="img"
          aria-label="Modern airplane in flight"
        ></div>
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/5 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-blue-400/10 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/5 rounded-full blur-lg"></div>

        <div className="relative z-10 max-w-5xl mx-auto w-full">
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-4">
              ✈️ Лучшие авиабилеты по лучшим ценам
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight">
            Найдите и забронируйте
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">
              авиабилеты
            </span>
          </h1>
          <p className="text-xl md:text-2xl opacity-90 font-light leading-relaxed max-w-3xl mx-auto">
            Сравните предложения от сотен авиакомпаний и туристических агентств.
            <span className="block mt-2 text-lg opacity-75">
              Быстрый поиск • Лучшие цены • Мгновенное бронирование
            </span>
          </p>
        </div>
      </section>

      <main className="flex-grow max-w-7xl mx-auto px-6 py-20 w-full">
        {/* Popular Routes Section */}
        {!searchPerformed && (
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
                Популярные направления
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Откройте для себя самые востребованные маршруты из Ташкента
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { from: 'Ташкент', to: 'Москва', price: 'от 250 000 UZS', image: '🇷🇺', duration: '4ч 30м' },
                { from: 'Ташкент', to: 'Стамбул', price: 'от 320 000 UZS', image: '🇹🇷', duration: '5ч 30м' },
                { from: 'Ташкент', to: 'Дубай', price: 'от 450 000 UZS', image: '🇦🇪', duration: '6ч 15м' },
                { from: 'Ташкент', to: 'Алматы', price: 'от 180 000 UZS', image: '🇰🇿', duration: '2ч 45м' },
                { from: 'Ташкент', to: 'Бишкек', price: 'от 150 000 UZS', image: '🇰🇬', duration: '2ч 15м' },
                { from: 'Ташкент', to: 'Баку', price: 'от 280 000 UZS', image: '🇦🇿', duration: '3ч 45м' }
              ].map((route, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 cursor-pointer border border-gray-100 hover:border-blue-200 group">
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-5xl group-hover:scale-110 transition-transform duration-300">{route.image}</div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500 uppercase tracking-wide">из</div>
                      <div className="font-bold text-gray-900">{route.from}</div>
                    </div>
                  </div>
                  <div className="text-center mb-6">
                    <div className="text-3xl mb-3 group-hover:animate-bounce">✈️</div>
                    <div className="text-xl font-bold text-gray-900 mb-1">{route.to}</div>
                    <div className="text-sm text-gray-500">{route.duration}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600 mb-4">{route.price}</div>
                    <button
                      onClick={() => handlePopularRouteClick(route.from, route.to)}
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      Посмотреть рейсы
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Trending Destinations Section */}
        {!searchPerformed && (
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
                Популярные направления для путешествий
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Откройте для себя удивительные города и создайте незабываемые воспоминания
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  name: 'Стамбул',
                  country: 'Турция',
                  image: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=400&h=300&fit=crop',
                  description: 'Город на стыке Европы и Азии',
                  highlights: ['Босфор', 'Мечети', 'Базары']
                },
                {
                  name: 'Дубай',
                  country: 'ОАЭ',
                  image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=300&fit=crop',
                  description: 'Роскошные отели и современная архитектура',
                  highlights: ['Бурдж-Халифа', 'Пальма', 'Шоппинг']
                },
                {
                  name: 'Москва',
                  country: 'Россия',
                  image: 'https://images.unsplash.com/photo-1513326738677-b964603b136d?w=400&h=300&fit=crop',
                  description: 'Историческая столица и культурный центр',
                  highlights: ['Кремль', 'Красная площадь', 'Метро']
                },
                {
                  name: 'Алматы',
                  country: 'Казахстан',
                  image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
                  description: 'Горный город с богатой культурой',
                  highlights: ['Медеу', 'Шымбулак', 'Парки']
                }
              ].map((destination, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
                  <div className="relative overflow-hidden">
                    <div
                      className="h-56 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                      style={{ backgroundImage: `url(${destination.image})` }}
                    ></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2 text-gray-900">{destination.name}</h3>
                    <p className="text-blue-600 font-medium text-sm mb-3 uppercase tracking-wide">{destination.country}</p>
                    <p className="text-gray-700 text-sm mb-4 leading-relaxed">{destination.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {destination.highlights.map((highlight, idx) => (
                        <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                          {highlight}
                        </span>
                      ))}
                    </div>
                    <button
                      onClick={() => handleDestinationClick(destination.name)}
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      Найти рейсы
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Flight Deals Section */}
        {!searchPerformed && (
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
                Специальные предложения
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Экономьте на авиабилетах с нашими эксклюзивными предложениями
              </p>
            </div>
            <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-2xl p-12 text-white text-center overflow-hidden shadow-2xl">
              {/* Background decorative elements */}
              <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
                <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
                <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-white/10 rounded-full blur-lg"></div>
              </div>

              <div className="relative z-10">
                <div className="mb-6">
                  <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-4">
                    🔥 Горячее предложение
                  </span>
                </div>
                <h3 className="text-4xl md:text-5xl font-bold mb-6">Раннее бронирование</h3>
                <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed max-w-2xl mx-auto">
                  Забронируйте билеты за 60 дней и получите скидку до 30% на все направления
                </p>
                <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 mb-8">
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 min-w-32">
                    <div className="text-4xl font-bold mb-2">30%</div>
                    <div className="text-sm opacity-90">скидка</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 min-w-32">
                    <div className="text-4xl font-bold mb-2">60</div>
                    <div className="text-sm opacity-90">дней заранее</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 min-w-32">
                    <div className="text-4xl font-bold mb-2">100+</div>
                    <div className="text-sm opacity-90">направлений</div>
                  </div>
                </div>
                <button className="bg-white text-blue-600 font-bold py-4 px-8 rounded-xl text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  Узнать больше
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Flight Search Form - moved below recommendations */}
        <div id="flight-search-form" className="mb-16">
          <FlightSearchForm ref={searchFormRef} onSearch={handleSearch} />
        </div>

        {searchPerformed && (
          <>
            <AviaBilet
              flights={flights}
              onBook={handleBook}
              onSelect={handleFlightSelect}
              selectedFlights={selectedFlights}
            />

            {/* Selected Flights Section */}
            {selectedFlights.length > 0 && (
              <div className="mt-12 bg-blue-50 border-2 border-blue-200 rounded-2xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-blue-900">
                    Выбранные рейсы ({selectedFlights.length})
                  </h3>
                  <button
                    onClick={clearSelection}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Очистить выбор
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  {selectedFlights.map((flight) => (
                    <div key={flight.id} className="bg-white rounded-lg p-4 border border-blue-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-gray-900">{flight.airline}</div>
                          <div className="text-sm text-gray-600">{flight.flightNumber}</div>
                          <div className="text-lg font-bold text-green-600 mt-1">
                            {flight.price.toLocaleString()} {flight.currency}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-500">{flight.departure.time}</div>
                          <div className="text-sm font-medium">{flight.departure.city}</div>
                          <div className="text-sm text-gray-500">→</div>
                          <div className="text-sm font-medium">{flight.arrival.city}</div>
                          <div className="text-sm text-gray-500">{flight.arrival.time}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Map showing selected destinations */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-blue-900 mb-4">Карта выбранных направлений</h4>
                  <Map
                    positions={selectedFlights.map(flight => ({
                      lat: flight.arrival.lat,
                      lng: flight.arrival.lng,
                      popup: `${flight.arrival.city} (${flight.airline} ${flight.flightNumber})`
                    }))}
                    zoom={3}
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={handleCompareSelected}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    🔄 Сравнить рейсы
                  </button>
                  <button
                    onClick={handleBookSelected}
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    🎫 Забронировать выбранные
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default FlightsPage;