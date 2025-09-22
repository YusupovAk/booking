import React, { useState } from 'react';
import { Hotel } from '../../lib/api';

interface HotelDescriptionProps {
  hotel: Hotel;
}

const HotelDescription: React.FC<HotelDescriptionProps> = ({ hotel }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">About this hotel</h2>
      <p className="text-gray-700 mb-4">
        {expanded ? hotel.description : `${hotel.description.substring(0, 200)}...`}
      </p>
      <button
        onClick={() => setExpanded(!expanded)}
        className="text-blue-600 hover:underline mb-6"
      >
        {expanded ? 'Show less' : 'Show more'}
      </button>

      <h3 className="text-xl font-bold mb-4">Amenities</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {hotel.amenities.map((amenity, index) => (
          <div key={index} className="flex items-center space-x-2">
            <span className="text-green-600">✓</span>
            <span>{amenity}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelDescription;