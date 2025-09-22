import React from 'react';

const InspirationSection: React.FC = () => {
  const articles = [
      {
        id: 1,
        title: 'Скрытые жемчужины Узбекистана',
        description: 'Откройте для себя малоизвестные места, которые стоит посетить в этой древней стране.',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
        altText: 'Off-the-beaten-path mountain village with traditional architecture, secret destination concept, adventure travel aesthetic, pristine natural landscape',
        category: 'Путешествия',
        readTime: '5 мин'
      },
      {
        id: 2,
        title: 'Лучшие блюда узбекской кухни',
        description: 'Погрузитесь в богатые вкусы традиционной узбекской кухни и узнайте, где попробовать лучшие блюда.',
        image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
        altText: 'Traditional Uzbek plov (pilaf) in decorative ceramic bowl, authentic Central Asian cuisine, colorful spices and ingredients, cultural dining experience',
        category: 'Еда',
        readTime: '7 мин'
      },
      {
        id: 3,
        title: 'Весенние фестивали в Узбекистане',
        description: 'Планируйте поездку вокруг ярких фестивалей и культурных мероприятий весной.',
        image: 'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
        altText: 'Four seasons collage showing different travel experiences - spring blossoms, summer beaches, autumn forests, winter snow, seasonal travel variety',
        category: 'Культура',
        readTime: '4 мин'
      }
    ];

  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Вдохновение для следующей поездки</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <article
              key={article.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
            >
              <div className="aspect-[16/10] relative overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 text-gray-800 text-xs px-2 py-1 rounded-full font-medium">
                    {article.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-blue-600 transition">
                  {article.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {article.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-blue-600 font-medium hover:text-blue-800 transition">
                    Читать далее →
                  </span>
                  <span className="text-gray-500 text-sm">{article.readTime}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InspirationSection;