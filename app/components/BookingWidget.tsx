'use client';

import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Hotel } from '../../lib/api';

interface BookingWidgetProps {
  hotel: Hotel;
}

const BookingWidget: React.FC<BookingWidgetProps> = ({ hotel }) => {
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);

  const calculateTotal = () => {
    if (!checkIn || !checkOut) return 0;
    const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
    return nights * hotel.price * rooms;
  };

  const total = calculateTotal();

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-lg sticky top-4">
      <div className="mb-4">
        <div className="text-2xl font-bold">${hotel.price}</div>
        <div className="text-sm text-gray-600">per night</div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Check-in</label>
          <DatePicker
            selected={checkIn}
            onChange={setCheckIn}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholderText="Select date"
            minDate={new Date()}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Check-out</label>
          <DatePicker
            selected={checkOut}
            onChange={setCheckOut}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholderText="Select date"
            minDate={checkIn || new Date()}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Guests</label>
          <select
            value={`${adults} adults, ${children} children, ${rooms} room`}
            onChange={(e) => {
              // Simple parsing - in real app, use proper dropdown
              const parts = e.target.value.split(', ');
              setAdults(parseInt(parts[0]));
              setChildren(parseInt(parts[1]));
              setRooms(parseInt(parts[2]));
            }}
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option>2 adults, 0 children, 1 room</option>
            <option>1 adult, 0 children, 1 room</option>
            <option>2 adults, 1 child, 1 room</option>
          </select>
        </div>
      </div>

      {total > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex justify-between mb-2">
            <span>${hotel.price} × {Math.ceil((checkOut!.getTime() - checkIn!.getTime()) / (1000 * 60 * 60 * 24))} nights</span>
            <span>${total}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Taxes and fees</span>
            <span>${Math.round(total * 0.1)}</span>
          </div>
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>${total + Math.round(total * 0.1)}</span>
          </div>
        </div>
      )}

      <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 mt-4 font-semibold">
        Reserve Now
      </button>

      <div className="mt-4 text-center">
        <div className="flex items-center justify-center space-x-2 text-green-600 mb-2">
          <span>✓</span>
          <span className="text-sm">Free cancellation</span>
        </div>
        <div className="text-sm text-gray-600">No prepayment needed</div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <h4 className="font-semibold mb-2">Hotel Highlights</h4>
        <ul className="text-sm space-y-1">
          <li>✓ Free WiFi</li>
          <li>✓ Free parking</li>
          <li>✓ Airport shuttle</li>
        </ul>
        <div className="mt-2 text-sm text-gray-600">
          3 people booked this hotel in the last hour
        </div>
      </div>
    </div>
  );
};

export default BookingWidget;