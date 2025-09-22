import React from 'react';

const RoomTypes: React.FC = () => {
  const rooms = [
    {
      name: 'Standard Double Room',
      size: '25 m²',
      bed: '1 double bed',
      amenities: ['City view', 'Air conditioning', 'Free WiFi'],
      price: 120,
      image: 'https://via.placeholder.com/300x200?text=Standard+Room'
    },
    {
      name: 'Deluxe Suite',
      size: '45 m²',
      bed: '1 king bed',
      amenities: ['Balcony', 'Mini bar', 'Spa access'],
      price: 200,
      image: 'https://via.placeholder.com/300x200?text=Deluxe+Suite'
    }
  ];

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-6">Available Rooms</h2>
      <div className="space-y-6">
        {rooms.map((room, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-6">
            <div className="flex flex-col md:flex-row">
              <img
                src={room.image}
                alt={room.name}
                className="w-full md:w-48 h-32 object-cover rounded-lg mb-4 md:mb-0 md:mr-6"
              />
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">{room.name}</h3>
                <div className="text-sm text-gray-600 mb-2">
                  <span>{room.size} • {room.bed}</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {room.amenities.map((amenity, i) => (
                    <span key={i} className="bg-gray-100 px-2 py-1 rounded text-sm">
                      {amenity}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-2xl font-bold">${room.price}</div>
                    <div className="text-sm text-gray-600">per night</div>
                  </div>
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                    Reserve
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomTypes;