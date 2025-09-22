import React from 'react';

const SpecialOffersSection: React.FC = () => {
  const offers = [
    {
      id: 'flash-sale',
      title: '⚡ Молниеносные предложения',
      description: 'Ограниченное время - скидки до 30%',
      badge: 'Горячее',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      altText: 'Dynamic lightning bolt graphic with explosion effects, bright yellow and orange energy bursts representing limited time offers'
    },
    {
      id: 'last-minute',
      title: '🕐 Сделки в последнюю минуту',
      description: 'Бронируйте сейчас и экономьте до 50%',
      badge: 'Срочно',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      altText: 'Clock face showing urgency, time-sensitive travel concept, countdown timer visual, deadline pressure aesthetic'
    },
    {
      id: 'extended-stay',
      title: '📅 Скидки на длительное пребывание',
      description: 'Экономьте при бронировании на 7+ ночей',
      badge: 'Длительное',
      image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      altText: 'Calendar pages with highlighted dates showing extended periods, long-term travel concept, calendar graphic with blue accents'
    },
    {
      id: 'group-booking',
      title: '👥 Групповые скидки',
      description: 'Специальные предложения для групп от 5 человек',
      badge: 'Группы',
      image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      altText: 'Silhouettes of group of people with luggage, family and friends traveling together, group travel concept, unity and togetherness theme'
    }
  ];

  return (
    <section className="py-16 px-6" style={{ backgroundColor: '#f0f6ff' }}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Предложения</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow cursor-pointer group focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-opacity-50"
              tabIndex={0}
              role="button"
              aria-label={`${offer.title}: ${offer.description}`}
            >
              <div className="relative mb-4 overflow-hidden rounded-lg">
                <img
                  src={offer.image}
                  alt={offer.altText}
                  className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute top-2 right-2">
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                    {offer.badge}
                  </span>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition mb-2">
                {offer.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4">{offer.description}</p>
              <button className="text-blue-600 font-medium hover:text-blue-800 transition focus:outline-none focus:underline">
                Узнать больше →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialOffersSection;