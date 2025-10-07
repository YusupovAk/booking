'use client';

import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';

interface FlightSearchFormProps {
  onSearch: (searchData: any) => void;
  ref?: React.Ref<any>;
}

interface City {
  name: string;
  country: string;
  code: string;
  flag: string;
}

const popularCities: City[] = [
  { name: 'Ташкент', country: 'Узбекистан', code: 'TAS', flag: '🇺🇿' },
  { name: 'Москва', country: 'Россия', code: 'SVO', flag: '🇷🇺' },
  { name: 'Санкт-Петербург', country: 'Россия', code: 'LED', flag: '🇷🇺' },
  { name: 'Стамбул', country: 'Турция', code: 'IST', flag: '🇹🇷' },
  { name: 'Анкара', country: 'Турция', code: 'ESB', flag: '🇹🇷' },
  { name: 'Дубай', country: 'ОАЭ', code: 'DXB', flag: '🇦🇪' },
  { name: 'Абу-Даби', country: 'ОАЭ', code: 'AUH', flag: '🇦🇪' },
  { name: 'Алматы', country: 'Казахстан', code: 'ALA', flag: '🇰🇿' },
  { name: 'Астана', country: 'Казахстан', code: 'NQZ', flag: '🇰🇿' },
  { name: 'Бишкек', country: 'Кыргызстан', code: 'FRU', flag: '🇰🇬' },
  { name: 'Баку', country: 'Азербайджан', code: 'GYD', flag: '🇦🇿' },
  { name: 'Киев', country: 'Украина', code: 'KBP', flag: '🇺🇦' },
  { name: 'Минск', country: 'Беларусь', code: 'MSQ', flag: '🇧🇾' },
  { name: 'Тбилиси', country: 'Грузия', code: 'TBS', flag: '🇬🇪' },
  { name: 'Ереван', country: 'Армения', code: 'EVN', flag: '🇦🇲' }
];

const FlightSearchForm = forwardRef<any, FlightSearchFormProps>(({ onSearch }, ref) => {
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    departureDate: '',
    returnDate: '',
    passengers: 1,
    class: 'economy'
  });

  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);
  const [filteredFromCities, setFilteredFromCities] = useState<City[]>(popularCities);
  const [filteredToCities, setFilteredToCities] = useState<City[]>(popularCities);

  const fromInputRef = useRef<HTMLInputElement>(null);
  const toInputRef = useRef<HTMLInputElement>(null);
  const fromDropdownRef = useRef<HTMLDivElement>(null);
  const toDropdownRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFromInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, from: value }));

    // Filter cities based on input
    const filtered = popularCities.filter(city =>
      city.name.toLowerCase().includes(value.toLowerCase()) ||
      city.country.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredFromCities(filtered);
  };

  const handleToInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, to: value }));

    // Filter cities based on input
    const filtered = popularCities.filter(city =>
      city.name.toLowerCase().includes(value.toLowerCase()) ||
      city.country.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredToCities(filtered);
  };

  const selectFromCity = (city: City) => {
    setFormData(prev => ({ ...prev, from: city.name }));
    setFilteredFromCities(popularCities); // Reset filter
    setShowFromDropdown(false);
  };

  const selectToCity = (city: City) => {
    setFormData(prev => ({ ...prev, to: city.name }));
    setFilteredToCities(popularCities); // Reset filter
    setShowToDropdown(false);
  };

  const handleFromFocus = () => {
    setShowFromDropdown(true);
    setFilteredFromCities(popularCities);
  };

  const handleToFocus = () => {
    setShowToDropdown(true);
    setFilteredToCities(popularCities);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (fromInputRef.current && fromDropdownRef.current &&
          !fromInputRef.current.contains(event.target as Node) &&
          !fromDropdownRef.current.contains(event.target as Node)) {
        setShowFromDropdown(false);
      }
      if (toInputRef.current && toDropdownRef.current &&
          !toInputRef.current.contains(event.target as Node) &&
          !toDropdownRef.current.contains(event.target as Node)) {
        setShowToDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Expose methods to parent component
  useImperativeHandle(ref, () => ({
    setFormData: (data: Partial<typeof formData>) => {
      setFormData(prev => ({ ...prev, ...data }));
    },
    submitForm: () => {
      handleSubmit({ preventDefault: () => {} } as any);
    }
  }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(formData);
  };

  const swapCities = () => {
    setFormData(prev => ({
      ...prev,
      from: prev.to,
      to: prev.from
    }));
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 mb-12 border border-gray-100">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* From */}
          <div className="relative">
            <label className="block text-lg font-semibold text-gray-900 mb-3">
              Откуда
            </label>
            <div className="relative">
              <input
                ref={fromInputRef}
                type="text"
                name="from"
                value={formData.from}
                onChange={handleFromInputChange}
                onFocus={handleFromFocus}
                placeholder="Выберите город отправления"
                className="w-full px-4 py-4 pr-10 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg transition-all duration-200"
                required
              />
              {formData.from && (
                <button
                  type="button"
                  onClick={() => {
                    setFormData(prev => ({ ...prev, from: '' }));
                    setFilteredFromCities(popularCities);
                  }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  ✕
                </button>
              )}
            </div>
            {showFromDropdown && (
              <div ref={fromDropdownRef} className="absolute z-10 w-full mt-2 bg-white border-2 border-gray-200 rounded-xl shadow-2xl max-h-64 overflow-y-auto">
                {filteredFromCities.length > 0 ? (
                  filteredFromCities.map((city, index) => (
                    <div
                      key={index}
                      className="px-4 py-3 hover:bg-blue-50 cursor-pointer flex items-center transition-colors duration-150 border-b border-gray-100 last:border-b-0"
                      onClick={() => selectFromCity(city)}
                    >
                      <span className="text-2xl mr-3">{city.flag}</span>
                      <div>
                        <div className="font-semibold text-gray-900">{city.name}</div>
                        <div className="text-sm text-gray-600">{city.country} ({city.code})</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-3 text-gray-500 text-center">
                    Город не найден
                  </div>
                )}
              </div>
            )}
          </div>

          {/* To */}
          <div className="relative">
            <label className="block text-lg font-semibold text-gray-900 mb-3">
              Куда
            </label>
            <div className="relative">
              <input
                ref={toInputRef}
                type="text"
                name="to"
                value={formData.to}
                onChange={handleToInputChange}
                onFocus={handleToFocus}
                placeholder="Выберите город прибытия"
                className="w-full px-4 py-4 pr-10 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg transition-all duration-200"
                required
              />
              {formData.to && (
                <button
                  type="button"
                  onClick={() => {
                    setFormData(prev => ({ ...prev, to: '' }));
                    setFilteredToCities(popularCities);
                  }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  ✕
                </button>
              )}
            </div>
            {showToDropdown && (
              <div ref={toDropdownRef} className="absolute z-10 w-full mt-2 bg-white border-2 border-gray-200 rounded-xl shadow-2xl max-h-64 overflow-y-auto">
                {filteredToCities.length > 0 ? (
                  filteredToCities.map((city, index) => (
                    <div
                      key={index}
                      className="px-4 py-3 hover:bg-blue-50 cursor-pointer flex items-center transition-colors duration-150 border-b border-gray-100 last:border-b-0"
                      onClick={() => selectToCity(city)}
                    >
                      <span className="text-2xl mr-3">{city.flag}</span>
                      <div>
                        <div className="font-semibold text-gray-900">{city.name}</div>
                        <div className="text-sm text-gray-600">{city.country} ({city.code})</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-3 text-gray-500 text-center">
                    Город не найден
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Swap button */}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={swapCities}
            className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition"
          >
            ⇅
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Departure Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Дата вылета
            </label>
            <input
              type="date"
              name="departureDate"
              value={formData.departureDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Return Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Дата возвращения (опционально)
            </label>
            <input
              type="date"
              name="returnDate"
              value={formData.returnDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Passengers */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Пассажиры
            </label>
            <select
              name="passengers"
              value={formData.passengers}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                <option key={num} value={num}>{num} пассажир{num > 1 ? 'ов' : ''}</option>
              ))}
            </select>
          </div>

          {/* Class */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Класс
            </label>
            <select
              name="class"
              value={formData.class}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="economy">Эконом</option>
              <option value="business">Бизнес</option>
              <option value="first">Первый класс</option>
            </select>
          </div>
        </div>

        {/* Search Button */}
        <div className="flex justify-center pt-4">
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold text-xl py-4 px-12 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1"
          >
            🔍 Найти рейсы
          </button>
        </div>
      </form>
    </div>
  );
});

FlightSearchForm.displayName = 'FlightSearchForm';

export default FlightSearchForm;