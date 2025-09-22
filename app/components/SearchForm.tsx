'use client';

import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { searchHotels, SearchParams } from '../../lib/api';
import { useHotelStore } from '../../lib/store';

const SearchForm: React.FC = () => {
  const [destination, setDestination] = useState('');
  const [checkIn, setCheckIn] = useState<Date | null>(new Date());
  const [checkOut, setCheckOut] = useState<Date | null>(new Date(Date.now() + 86400000)); // +1 day
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);
  const [showGuests, setShowGuests] = useState(false);
  const [showDestinationDropdown, setShowDestinationDropdown] = useState(false);
  const [workTravel, setWorkTravel] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const { setSearchResults, setLoading, setError, setSearchParams, isLoading } = useHotelStore();

  // Popular destinations for autocomplete
  const popularDestinations = [
    'Ташкент, Узбекистан',
    'Самарканд, Узбекистан',
    'Бухара, Узбекистан',
    'Хива, Узбекистан',
    'Нукус, Узбекистан',
    'Термез, Узбекистан',
    'Москва, Россия',
    'Санкт-Петербург, Россия',
    'Алматы, Казахстан'
  ];

  // Recent searches (mock data)
  const recentSearches = [
    'Ташкент, Узбекистан',
    'Самарканд, Узбекистан'
  ];

  const filteredDestinations = popularDestinations.filter(dest =>
    dest.toLowerCase().includes(destination.toLowerCase())
  );

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!destination.trim()) {
      newErrors.destination = 'Пожалуйста, выберите направление';
    }

    if (!checkIn) {
      newErrors.checkIn = 'Выберите дату заезда';
    }

    if (!checkOut) {
      newErrors.checkOut = 'Выберите дату отъезда';
    }

    if (checkIn && checkOut && checkIn >= checkOut) {
      newErrors.checkOut = 'Дата отъезда должна быть позже даты заезда';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError(null);

    const params: SearchParams = {
      destination,
      checkIn: checkIn!.toISOString().split('T')[0],
      checkOut: checkOut!.toISOString().split('T')[0],
      adults,
      children,
      rooms,
    };

    try {
      const results = await searchHotels(params);
      setSearchResults(results);
      setSearchParams(params);
      // Scroll to results
      setTimeout(() => {
        document.getElementById('search-results')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err) {
      setError('Не удалось найти отели. Попробуйте еще раз.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border-2 border-[#FFB000] rounded-lg p-6 mx-6 -mt-8 relative z-10 shadow-xl max-w-6xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Work Travel Toggle */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="workTravel"
            checked={workTravel}
            onChange={(e) => setWorkTravel(e.target.checked)}
            className="rounded"
          />
          <label htmlFor="workTravel" className="text-sm text-gray-600">
            Я путешествую по работе
          </label>
        </div>

        {/* Main Search Fields */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Destination */}
          <div className="relative">
            <div className={`flex items-center space-x-2 border rounded px-4 py-3 h-14 ${errors.destination ? 'border-red-500' : 'border-gray-300'}`}>
              <span className="text-gray-400">🏨</span>
              <input
                type="text"
                placeholder="Куда вы хотите поехать?"
                className="flex-1 outline-none"
                value={destination}
                onChange={(e) => {
                  setDestination(e.target.value);
                  setShowDestinationDropdown(true);
                  if (errors.destination) {
                    setErrors({...errors, destination: ''});
                  }
                }}
                onFocus={() => setShowDestinationDropdown(true)}
                required
              />
            </div>
            {errors.destination && <p className="text-red-500 text-sm mt-1">{errors.destination}</p>}

            {/* Destination Dropdown */}
            {showDestinationDropdown && (destination || recentSearches.length > 0) && (
              <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-b-lg shadow-lg z-20 max-h-64 overflow-y-auto">
                {recentSearches.length > 0 && !destination && (
                  <div className="p-3 border-b border-gray-200">
                    <div className="text-sm font-medium text-gray-600 mb-2">Недавние поиски</div>
                    {recentSearches.map((search, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => {
                          setDestination(search);
                          setShowDestinationDropdown(false);
                        }}
                        className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded"
                      >
                        🕐 {search}
                      </button>
                    ))}
                  </div>
                )}
                {filteredDestinations.length > 0 && (
                  <div className="p-3">
                    <div className="text-sm font-medium text-gray-600 mb-2">Популярные направления</div>
                    {filteredDestinations.slice(0, 5).map((dest, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => {
                          setDestination(dest);
                          setShowDestinationDropdown(false);
                        }}
                        className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded"
                      >
                        📍 {dest}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Dates */}
          <div className="relative">
            <div className={`flex items-center space-x-2 border rounded px-4 py-3 h-14 ${errors.checkIn || errors.checkOut ? 'border-red-500' : 'border-gray-300'}`}>
              <span className="text-gray-400">📅</span>
              <div className="flex space-x-2 flex-1">
                <DatePicker
                  selected={checkIn}
                  onChange={(date) => {
                    setCheckIn(date);
                    if (errors.checkIn) setErrors({...errors, checkIn: ''});
                  }}
                  placeholderText="Заезд"
                  className="outline-none flex-1 text-center"
                  dateFormat="dd/MM"
                  minDate={new Date()}
                />
                <span className="text-gray-400">—</span>
                <DatePicker
                  selected={checkOut}
                  onChange={(date) => {
                    setCheckOut(date);
                    if (errors.checkOut) setErrors({...errors, checkOut: ''});
                  }}
                  placeholderText="Отъезд"
                  className="outline-none flex-1 text-center"
                  dateFormat="dd/MM"
                  minDate={checkIn || new Date()}
                />
              </div>
            </div>
            {(errors.checkIn || errors.checkOut) && (
              <p className="text-red-500 text-sm mt-1">{errors.checkIn || errors.checkOut}</p>
            )}
          </div>

          {/* Guests */}
          <div className="relative">
            <div className="flex items-center space-x-2 border border-gray-300 rounded px-4 py-3 h-14 cursor-pointer" onClick={() => setShowGuests(!showGuests)}>
              <span className="text-gray-400">👥</span>
              <span className="flex-1 text-gray-700">
                {adults} взрослых · {children} детей · {rooms} номер
              </span>
              <span className="text-gray-400">▼</span>
            </div>

            {showGuests && (
              <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg mt-1 p-4 z-20 shadow-lg">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Взрослые</span>
                    <div className="flex items-center space-x-3">
                      <button
                        type="button"
                        onClick={() => setAdults(Math.max(1, adults - 1))}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400"
                      >
                        −
                      </button>
                      <span className="w-8 text-center">{adults}</span>
                      <button
                        type="button"
                        onClick={() => setAdults(adults + 1)}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Дети</span>
                    <div className="flex items-center space-x-3">
                      <button
                        type="button"
                        onClick={() => setChildren(Math.max(0, children - 1))}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400"
                      >
                        −
                      </button>
                      <span className="w-8 text-center">{children}</span>
                      <button
                        type="button"
                        onClick={() => setChildren(children + 1)}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Номера</span>
                    <div className="flex items-center space-x-3">
                      <button
                        type="button"
                        onClick={() => setRooms(Math.max(1, rooms - 1))}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400"
                      >
                        −
                      </button>
                      <span className="w-8 text-center">{rooms}</span>
                      <button
                        type="button"
                        onClick={() => setRooms(rooms + 1)}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Search Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="bg-gradient-to-r from-[#0071C2] to-[#005aa3] text-white px-8 py-3 rounded-lg hover:from-[#005aa3] hover:to-[#004080] transition-all duration-200 font-semibold h-14 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
          >
            {isLoading ? 'Поиск...' : 'Найти'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;