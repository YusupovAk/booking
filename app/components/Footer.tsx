import React from 'react';

const Footer: React.FC = () => {
  const footerSections = [
    {
      title: 'Поддержка и безопасность',
      links: [
        'Служба поддержки клиентов',
        'Центр ресурсов безопасности',
        'Условия использования',
        'Заявление о конфиденциальности и cookies'
      ]
    },
    {
      title: 'Откройте для себя',
      links: [
        'Сезонные направления',
        'Статьи о путешествиях',
        'Ежемесячные предложения',
        'Уникальные места для проживания'
      ]
    },
    {
      title: 'Сотрудничайте с нами',
      links: [
        'Разместите свой объект',
        'Станьте партнером',
        'Booking.com для бизнеса'
      ]
    },
    {
      title: 'О нас',
      links: [
        'О Booking.com',
        'Карьера',
        'Пресс-центр',
        'Инвесторам'
      ]
    }
  ];

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-primary transition text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-muted-foreground text-sm">
              © 2024 Booking.com™. Все права защищены.
            </div>

            {/* Social Media & App Links */}
            <div className="flex items-center space-x-6">
              {/* Social Icons */}
              <div className="flex space-x-4">
                <a href="#" className="text-muted-foreground hover:text-primary transition">
                  📘 Facebook
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition">
                  🐦 Twitter
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition">
                  📷 Instagram
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition">
                  💼 LinkedIn
                </a>
              </div>

              {/* App Store Badges */}
              <div className="flex space-x-2">
                <button className="bg-primary text-primary-foreground px-3 py-1 rounded text-xs hover:bg-primary/90 transition">
                  📱 App Store
                </button>
                <button className="bg-primary text-primary-foreground px-3 py-1 rounded text-xs hover:bg-primary/90 transition">
                  🤖 Google Play
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;