import React from 'react';

const TrendingDestinationsSection: React.FC = () => {
  const destinations = [
    {
      name: 'Самарканд',
      country: 'Узбекистан',
      properties: 1234,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      altText: 'Magnificent Registan Square in Samarkand with three madrasahs featuring intricate Islamic geometric patterns and stunning blue and gold tile work at golden hour'
    },
    {
      name: 'Бухара',
      country: 'Узбекистан',
      properties: 856,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      altText: 'Ancient Bukhara cityscape with traditional Islamic architecture, Kalyan Minaret rising above the old city with desert landscape in background'
    },
    {
      name: 'Ташкент',
      country: 'Узбекистан',
      properties: 2156,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      altText: 'Modern Tashkent city center blending contemporary skyscrapers with traditional architecture, wide boulevards and urban parks with mountain backdrop'
    },
    {
      name: 'Хива',
      country: 'Узбекистан',
      properties: 423,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      altText: 'Ichon-Qala fortress walls in Khiva with ancient mud-brick architecture, Kalta Minor minaret with blue tiles in desert sunset lighting'
    },
    {
      name: 'Нукус',
      country: 'Узбекистан',
      properties: 234,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      altText: 'Nukus city with Savitsky Museum and modern buildings, Karakalpakstan regional architecture under clear blue sky'
    },
    {
      name: 'Термез',
      country: 'Узбекистан',
      properties: 345,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      altText: 'Archaeological sites of ancient Termez with Buddhist stupas and Islamic monuments, Amu Darya river in background with desert landscape'
    }
  ];

  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Популярные направления</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((destination, index) => (
            <div
              key={index}
              className="relative rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer group focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-opacity-50"
              tabIndex={0}
              role="button"
              aria-label={`Explore ${destination.name}, ${destination.country} with ${destination.properties.toLocaleString()} properties available`}
            >
              <div className="aspect-[4/3] relative">
                <img
                  src={destination.image}
                  alt={destination.altText}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold mb-1">{destination.name}</h3>
                  <p className="text-sm opacity-90">{destination.country}</p>
                  <p className="text-sm opacity-75">{destination.properties.toLocaleString()} объектов</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingDestinationsSection;