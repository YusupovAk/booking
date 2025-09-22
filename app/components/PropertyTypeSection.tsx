import React from 'react';

const PropertyTypeSection: React.FC = () => {
  const propertyTypes = [
    {
      name: 'Отели',
      icon: '🏨',
      count: '1,200,000+',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      altText: 'Elegant luxury hotel exterior with modern glass facade, welcoming entrance with doorman, manicured landscaping'
    },
    {
      name: 'Апартаменты',
      icon: '🏢',
      count: '800,000+',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      altText: 'Modern apartment building with balconies and large windows, urban residential architecture with contemporary design'
    },
    {
      name: 'Курорты',
      icon: '🏖️',
      count: '150,000+',
      image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      altText: 'Tropical beach resort with infinity pool overlooking ocean, palm trees, beach chairs, luxury vacation destination'
    },
    {
      name: 'Виллы',
      icon: '🏠',
      count: '500,000+',
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      altText: 'Beautiful Mediterranean-style villa with terracotta roof, private garden, swimming pool, luxury vacation rental property'
    },
    {
      name: 'Хостелы',
      icon: '🏘️',
      count: '50,000+',
      image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      altText: 'Modern hostel common area with colorful furniture, young travelers socializing, contemporary budget accommodation'
    },
    {
      name: 'Гостевые дома',
      icon: '🏡',
      count: '300,000+',
      image: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      altText: 'Charming bed and breakfast exterior with flower garden, cozy cottage-style architecture, welcoming front porch'
    }
  ];

  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Просмотр по типу объекта</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {propertyTypes.map((type, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer group focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-opacity-50"
              tabIndex={0}
              role="button"
              aria-label={`Explore ${type.name} with ${type.count} available properties`}
            >
              <div className="relative mb-3 overflow-hidden rounded-lg">
                <img
                  src={type.image}
                  alt={type.altText}
                  className="w-full h-24 object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl group-hover:scale-110 transition-transform duration-300" role="img" aria-label={type.name}>
                    {type.icon}
                  </span>
                </div>
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">{type.name}</h3>
              <p className="text-sm text-gray-500">{type.count}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PropertyTypeSection;