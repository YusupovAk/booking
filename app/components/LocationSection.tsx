import React from 'react';

const LocationSection: React.FC = () => {
  const nearbyAttractions = [
    { name: 'Independence Square', distance: '0.5 km' },
    { name: 'Chorsu Bazaar', distance: '2.1 km' },
    { name: 'Tashkent International Airport', distance: '12 km' },
  ];

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-6">Location & Nearby</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Map Placeholder */}
        <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
          <span className="text-gray-600">Interactive Map</span>
        </div>

        {/* Nearby Attractions */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Nearby Attractions</h3>
          <ul className="space-y-2">
            {nearbyAttractions.map((attraction, index) => (
              <li key={index} className="flex justify-between">
                <span>{attraction.name}</span>
                <span className="text-gray-600">{attraction.distance}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <h4 className="font-semibold mb-2">Transport</h4>
            <p className="text-sm text-gray-600">
              Metro station: 5 min walk<br />
              Bus stop: 2 min walk<br />
              Airport shuttle available
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationSection;