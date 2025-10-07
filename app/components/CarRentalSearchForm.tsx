'use client';

import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CarRentalSearchForm: React.FC = () => {
  const [pickUpLocation, setPickUpLocation] = useState('');
  const [pickUpDate, setPickUpDate] = useState<Date | null>(new Date());
  const [dropOffDate, setDropOffDate] = useState<Date | null>(new Date(Date.now() + 86400000)); // +1 day
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!pickUpLocation.trim()) {
      newErrors.pickUpLocation = 'Пожалуйста, выберите место получения';
    }

    if (!pickUpDate) {
      newErrors.pickUpDate = 'Выберите дату получения';
    }

    if (!dropOffDate) {
      newErrors.dropOffDate = 'Выберите дату возврата';
    }

    if (pickUpDate && dropOffDate && pickUpDate >= dropOffDate) {
      newErrors.dropOffDate = 'Дата возврата должна быть позже даты получения';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // TODO: Implement search logic
    console.log({ pickUpLocation, pickUpDate, dropOffDate });
  };

  return (
    <div className="bg-white border-2 border-[#FFB000] rounded-lg p-6 mx-6 -mt-8 relative z-10 shadow-xl max-w-6xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Pick-up location */}
          <div className="relative">
            <div className={`flex items-center space-x-2 border rounded px-4 py-3 h-14 ${errors.pickUpLocation ? 'border-red-500' : 'border-gray-300'}`}>
              <span className="text-gray-400">🚗</span>
              <input
                type="text"
                placeholder="Место получения"
                className="flex-1 outline-none"
                value={pickUpLocation}
                onChange={(e) => {
                  setPickUpLocation(e.target.value);
                  if (errors.pickUpLocation) {
                    setErrors({...errors, pickUpLocation: ''});
                  }
                }}
                required
              />
            </div>
            {errors.pickUpLocation && <p className="text-red-500 text-sm mt-1">{errors.pickUpLocation}</p>}
          </div>

          {/* Dates */}
          <div className="relative">
            <div className={`flex items-center space-x-2 border rounded px-4 py-3 h-14 ${errors.pickUpDate || errors.dropOffDate ? 'border-red-500' : 'border-gray-300'}`}>
              <span className="text-gray-400">📅</span>
              <div className="flex space-x-2 flex-1">
                <DatePicker
                  selected={pickUpDate}
                  onChange={(date) => {
                    setPickUpDate(date);
                    if (errors.pickUpDate) setErrors({...errors, pickUpDate: ''});
                  }}
                  placeholderText="Получение"
                  className="outline-none flex-1 text-center"
                  dateFormat="dd/MM"
                  minDate={new Date()}
                />
                <span className="text-gray-400">—</span>
                <DatePicker
                  selected={dropOffDate}
                  onChange={(date) => {
                    setDropOffDate(date);
                    if (errors.dropOffDate) setErrors({...errors, dropOffDate: ''});
                  }}
                  placeholderText="Возврат"
                  className="outline-none flex-1 text-center"
                  dateFormat="dd/MM"
                  minDate={pickUpDate || new Date()}
                />
              </div>
            </div>
            {(errors.pickUpDate || errors.dropOffDate) && (
              <p className="text-red-500 text-sm mt-1">{errors.pickUpDate || errors.dropOffDate}</p>
            )}
          </div>

          {/* Search Button */}
          <button
            type="submit"
            className="bg-gradient-to-r from-[#0071C2] to-[#005aa3] text-white px-8 py-3 rounded-lg hover:from-[#005aa3] hover:to-[#004080] transition-all duration-200 font-semibold h-14 shadow-md"
          >
            Найти
          </button>
        </div>
      </form>
    </div>
  );
};

export default CarRentalSearchForm;
