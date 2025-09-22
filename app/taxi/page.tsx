'use client';

import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Header from '../components/Header';
import NavigationTabs from '../components/NavigationTabs';
import Footer from '../components/Footer';

const TaxiPage: React.FC = () => {
  const [tripType, setTripType] = useState<'one-way' | 'return' | 'hourly'>('one-way');
  const [pickupLocation, setPickupLocation] = useState('');
  const [destination, setDestination] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date(Date.now() + 86400000)); // Tomorrow
  const [selectedTime, setSelectedTime] = useState('09:00');
  const [passengers, setPassengers] = useState(1);
  const [luggage, setLuggage] = useState(1);
  const [flightNumber, setFlightNumber] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [showSpecialRequests, setShowSpecialRequests] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // In real app, this would navigate to results or show vehicle options
      alert('Searching for available transfers...');
    }, 2000);
  };

  const vehicleOptions = [
    {
      id: 'economy',
      name: 'Эконом',
      description: 'До 3 пассажиров, 2 чемодана',
      price: 45000,
      image: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      features: ['Встреча с табличкой', 'Бесплатное ожидание 60 мин', 'Все включено в цену']
    },
    {
      id: 'comfort',
      name: 'Комфорт',
      description: 'До 3 пассажиров, 3 чемодана',
      price: 65000,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      features: ['WiFi в автомобиле', 'Детские кресла по запросу', 'Встреча с табличкой'],
      popular: true
    },
    {
      id: 'van',
      name: 'Минивэн',
      description: 'До 7 пассажиров, 7 чемоданов',
      price: 95000,
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      features: ['Идеально для групп', 'Дополнительное пространство', 'Все включено в цену']
    }
  ];

  const popularRoutes = [
    { from: 'Аэропорт Ташкента', to: 'Центр города', price: 45000 },
    { from: 'Аэропорт Ташкента', to: 'Ташкент-Сити', price: 55000 },
    { from: 'Центр города', to: 'Чирчик', price: 75000 },
    { from: 'Аэропорт Ташкента', to: 'Самарканд', price: 450000 },
    { from: 'Железнодорожный вокзал', to: 'Аэропорт', price: 40000 },
    { from: 'Отель', to: 'Аэропорт', price: 50000 }
  ];

  const faqs = [
    {
      question: 'Как оплатить поездку?',
      answer: 'Оплата производится наличными водителю по завершении поездки. Мы не принимаем предоплату.'
    },
    {
      question: 'Что делать, если рейс задерживается?',
      answer: 'Мы отслеживаем ваш рейс в реальном времени. Водитель будет ждать вас до 2 часов после фактического прибытия.'
    },
    {
      question: 'Можно ли отменить бронирование?',
      answer: 'Бесплатная отмена возможна за 24 часа до поездки. После этого применяется штраф в размере 50% от стоимости.'
    },
    {
      question: 'Включены ли детские кресла?',
      answer: 'Детские кресла предоставляются по запросу и включены в стоимость поездки.'
    },
    {
      question: 'Как найти водителя в аэропорту?',
      answer: 'Водитель встретит вас у выхода с табличкой с вашим именем. Также вы получите SMS с номером автомобиля.'
    }
  ];

  const reviews = [
    {
      name: 'Анна М.',
      rating: 5,
      date: '2 дня назад',
      text: 'Отличный сервис! Водитель встретил вовремя, машина чистая и комфортная.',
      route: 'Аэропорт Ташкента → Отель'
    },
    {
      name: 'Михаил К.',
      rating: 5,
      date: '1 неделя назад',
      text: 'Рекомендую! Пунктуальный водитель, приятная поездка.',
      route: 'Центр → Аэропорт'
    },
    {
      name: 'Елена С.',
      rating: 5,
      date: '3 дня назад',
      text: 'Все прошло идеально. Водитель помог с багажом.',
      route: 'Аэропорт → Самарканд'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <NavigationTabs />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#003580] to-[#002050] text-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Надежный трансфер из аэропорта
              </h1>
              <div className="space-y-4 text-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-green-400 text-2xl">✓</span>
                  <span>Забронируйте заранее – платите водителю</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-green-400 text-2xl">✓</span>
                  <span>Мы будем следить за вашим рейсом</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-green-400 text-2xl">✓</span>
                  <span>Без очередей, без ожидания</span>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Airport Transfer Service"
                className="w-full h-80 object-cover rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-lg p-4">
                <div className="text-[#003580] font-bold">4.8 ★★★★☆</div>
                <div className="text-sm text-gray-600">12,000+ reviews</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-12 px-6 -mt-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSearch} className="bg-white border-2 border-[#FFB000] rounded-xl p-8 shadow-xl">
            {/* Trip Type */}
            <div className="mb-6">
              <div className="flex space-x-6">
                {[
                  { value: 'one-way', label: 'В одну сторону' },
                  { value: 'return', label: 'Туда и обратно' },
                  { value: 'hourly', label: 'Почасовая аренда' }
                ].map((option) => (
                  <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="tripType"
                      value={option.value}
                      checked={tripType === option.value}
                      onChange={(e) => setTripType(e.target.value as any)}
                      className="text-[#0071C2] focus:ring-[#0071C2]"
                    />
                    <span className="text-gray-700">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Location Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Откуда?</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">📍</span>
                  <input
                    type="text"
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    placeholder="Аэропорт Ташкента, гостиница..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0071C2] focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Куда?</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🎯</span>
                  <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="Центр города, отель..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0071C2] focus:border-transparent"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Дата поездки</label>
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0071C2] focus:border-transparent"
                  dateFormat="dd/MM/yyyy"
                  minDate={new Date()}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Время</label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0071C2] focus:border-transparent"
                >
                  {Array.from({ length: 24 }, (_, i) => {
                    const hour = i.toString().padStart(2, '0');
                    return (
                      <option key={`${hour}:00`} value={`${hour}:00`}>{`${hour}:00`}</option>
                    );
                  })}
                </select>
              </div>
            </div>

            {/* Flight Number (if airport selected) */}
            {(pickupLocation.toLowerCase().includes('аэропорт') || destination.toLowerCase().includes('аэропорт')) && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Номер рейса (опционально)</label>
                <input
                  type="text"
                  value={flightNumber}
                  onChange={(e) => setFlightNumber(e.target.value)}
                  placeholder="Например: HY 123"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0071C2] focus:border-transparent"
                />
                <div className="flex items-center mt-2 text-sm text-green-600">
                  <span className="mr-2">✓</span>
                  Мы отслеживаем ваш рейс
                </div>
              </div>
            )}

            {/* Passengers & Luggage */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Количество пассажиров</label>
                <select
                  value={passengers}
                  onChange={(e) => setPassengers(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0071C2] focus:border-transparent"
                >
                  {Array.from({ length: 8 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1} пассажир{i + 1 > 1 ? 'ов' : ''}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Количество багажа</label>
                <select
                  value={luggage}
                  onChange={(e) => setLuggage(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0071C2] focus:border-transparent"
                >
                  {Array.from({ length: 8 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1} мест{i + 1 > 1 ? '' : 'о'}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Special Requests */}
            <div className="mb-6">
              <button
                type="button"
                onClick={() => setShowSpecialRequests(!showSpecialRequests)}
                className="text-[#0071C2] hover:text-[#005A9E] font-medium"
              >
                {showSpecialRequests ? '−' : '+'} Особые пожелания
              </button>
              {showSpecialRequests && (
                <div className="mt-3">
                  <textarea
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    placeholder="Детские кресла, доступность для инвалидов, предпочтения автомобиля..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0071C2] focus:border-transparent"
                    rows={3}
                  />
                </div>
              )}
            </div>

            {/* Search Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#0071C2] to-[#005aa3] text-white py-4 px-6 rounded-lg hover:from-[#005aa3] hover:to-[#004080] transition font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Поиск трансфера...' : 'Найти трансфер'}
            </button>
          </form>
        </div>
      </section>

      {/* Vehicle Options */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Доступные варианты трансфера</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vehicleOptions.map((vehicle) => (
              <div key={vehicle.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
                <div className="relative">
                  <img src={vehicle.image} alt={vehicle.name} className="w-full h-48 object-cover" />
                  {vehicle.popular && (
                    <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Популярный выбор
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{vehicle.name}</h3>
                  <p className="text-gray-600 mb-4">{vehicle.description}</p>
                  <ul className="space-y-2 mb-6">
                    {vehicle.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <span className="text-green-500 mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-2xl font-bold text-gray-900">от {vehicle.price.toLocaleString()} UZS</div>
                    </div>
                    <button className="bg-[#0071C2] text-white px-6 py-2 rounded-lg hover:bg-[#005A9E] transition font-medium">
                      Забронировать
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Safety */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-6xl mb-4">🛡️</div>
              <h3 className="text-xl font-bold mb-3">Безопасность превыше всего</h3>
              <p className="text-gray-600">Лицензированные водители, застрахованные автомобили</p>
            </div>
            <div className="text-center">
              <div className="text-6xl mb-4">💰</div>
              <h3 className="text-xl font-bold mb-3">Фиксированные цены</h3>
              <p className="text-gray-600">Никаких скрытых доплат, оплата наличными водителю</p>
            </div>
            <div className="text-center">
              <div className="text-6xl mb-4">✈️</div>
              <h3 className="text-xl font-bold mb-3">Отслеживание рейсов</h3>
              <p className="text-gray-600">Мы следим за вашим рейсом и корректируем время встречи</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-6 bg-blue-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Как это работает</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#0071C2] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-xl font-bold mb-3">Забронируйте</h3>
              <p className="text-gray-600">Выберите маршрут и время</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#0071C2] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-xl font-bold mb-3">Получите подтверждение</h3>
              <p className="text-gray-600">Мгновенное подтверждение на email</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#0071C2] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-xl font-bold mb-3">Отслеживайте водителя</h3>
              <p className="text-gray-600">Получите данные водителя за 24 часа</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#0071C2] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">4</div>
              <h3 className="text-xl font-bold mb-3">Встречайтесь</h3>
              <p className="text-gray-600">Водитель встретит вас с табличкой</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Routes */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Популярные маршруты в Ташкенте</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularRoutes.map((route, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="font-medium text-gray-900">{route.from}</div>
                    <div className="text-gray-500 text-sm">→</div>
                    <div className="font-medium text-gray-900">{route.to}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-[#0071C2]">от {route.price.toLocaleString()} UZS</div>
                  </div>
                </div>
                <button className="w-full bg-gray-100 text-gray-800 py-2 px-4 rounded hover:bg-gray-200 transition">
                  Выбрать маршрут
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Часто задаваемые вопросы</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details key={index} className="bg-white rounded-lg shadow-sm">
                <summary className="cursor-pointer p-6 font-medium text-gray-900 hover:text-[#0071C2] transition">
                  {faq.question}
                </summary>
                <div className="px-6 pb-6 text-gray-600">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Отзывы клиентов</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="font-medium text-gray-900">{review.name}</div>
                  <div className="flex">
                    {[...Array(review.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400">★</span>
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 mb-3">{review.text}</p>
                <div className="text-sm text-gray-500">
                  <div>{review.route}</div>
                  <div>{review.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TaxiPage;