import React from 'react';

const PromotionalBannersSection: React.FC = () => {
  const banners = [
    {
      id: 'genius',
      title: 'Получайте награды за путешествия',
      subtitle: 'Разблокируйте скидки для участников – скидка 10% или больше',
      cta: 'Зарегистрироваться бесплатно',
      background: 'bg-gradient-to-r from-blue-500 to-blue-600',
      icon: '👑',
      altText: 'Elegant royal crown icon representing Genius loyalty program rewards'
    },
    {
      id: 'mobile',
      title: 'Забронировуйте быстрее в нашем приложении',
      subtitle: 'Специальные предложения только для мобильных устройств',
      cta: 'Скачать приложение',
      background: 'bg-gradient-to-r from-gray-800 to-gray-900',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      altText: 'Modern smartphone displaying Booking.com mobile app interface'
    },
    {
      id: 'safety',
      title: 'Путешествуйте с уверенностью',
      subtitle: 'Варианты с бесплатной отменой и усиленными мерами охраны здоровья',
      cta: 'Узнать больше',
      background: 'bg-gradient-to-r from-green-500 to-green-600',
      icon: '🛡️',
      altText: 'Shield icon representing safety and health protection measures'
    }
  ];

  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {banners.map((banner) => (
            <div
              key={banner.id}
              className={`${banner.background} rounded-xl p-8 text-white relative overflow-hidden`}
            >
              {banner.icon && (
                <div className="text-6xl mb-4 opacity-20 absolute top-4 right-4" role="img" aria-label={banner.altText}>
                  {banner.icon}
                </div>
              )}
              {banner.image && (
                <div className="absolute top-0 right-0 w-32 h-40 opacity-20">
                  <img
                    src={banner.image}
                    alt={banner.altText}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              )}
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-3">{banner.title}</h3>
                <p className="mb-6 opacity-90">{banner.subtitle}</p>
                <button className="bg-white text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50">
                  {banner.cta}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromotionalBannersSection;