import React from 'react';
import { Hotel } from '../../lib/api';

interface HotelHeaderProps {
  hotel: Hotel;
}

const HotelHeader: React.FC<HotelHeaderProps> = ({ hotel }) => {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold mb-2">{hotel.name}</h1>
      <div className="flex items-center space-x-4 mb-4">
        <div className="flex items-center space-x-1">
          {[...Array(5)].map((_, i) => (
            <span key={i} className={i < Math.floor(hotel.rating / 2) ? 'text-yellow-400' : 'text-gray-300'}>★</span>
          ))}
        </div>
        <span className="text-gray-600">{hotel.location}</span>
        <button className="text-blue-600 hover:underline">Show on map</button>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <span className="text-green-600 font-bold">{hotel.rating}</span>
          </div>
          <div>
            <div className="font-semibold">
              {hotel.rating >= 9 ? 'Excellent' : hotel.rating >= 8 ? 'Very Good' : 'Good'}
            </div>
            <div className="text-sm text-gray-600">Based on {hotel.reviews.length} reviews</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelHeader;