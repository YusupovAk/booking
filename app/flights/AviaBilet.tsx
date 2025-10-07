import React from 'react';

interface Flight {
  id: string;
  airline: string;
  flightNumber: string;
  departure: {
    city: string;
    airport: string;
    time: string;
    date: string;
  };
  arrival: {
    city: string;
    airport: string;
    time: string;
    date: string;
    lat: number;
    lng: number;
  };
  duration: string;
  price: number;
  currency: string;
  availableSeats: number;
  class: string;
}

interface AviaBiletProps {
  flights: Flight[];
  onBook: (flight: Flight) => void;
  onSelect?: (flight: Flight, isSelected: boolean) => void;
  selectedFlights?: Flight[];
}

const AviaBilet: React.FC<AviaBiletProps> = ({ flights, onBook, onSelect, selectedFlights = [] }) => {
  if (flights.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 text-lg">Рейсы не найдены. Попробуйте изменить параметры поиска.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Найденные рейсы</h2>
      {flights.map((flight) => {
        const isSelected = selectedFlights.some(f => f.id === flight.id);

        return (
          <div key={flight.id} className={`bg-white border-2 rounded-lg p-6 shadow-sm hover:shadow-md transition ${isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
            {/* Selection Checkbox */}
            {onSelect && (
              <div className="flex items-center justify-between mb-4">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={(e) => onSelect(flight, e.target.checked)}
                    className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <span className="ml-3 text-sm font-medium text-gray-700">
                    {isSelected ? 'Выбран' : 'Выбрать для сравнения'}
                  </span>
                </label>
                {isSelected && (
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    ✓ Выбран
                  </span>
                )}
              </div>
            )}

            <div className="flex flex-col md:flex-row md:items-center justify-between">
            {/* Flight Info */}
            <div className="flex-1">
              <div className="flex items-center mb-2">
                <span className="font-semibold text-lg">{flight.airline}</span>
                <span className="ml-2 text-gray-600">{flight.flightNumber}</span>
              </div>

              <div className="flex items-center justify-between mb-4">
                {/* Departure */}
                <div className="text-center">
                  <div className="text-2xl font-bold">{flight.departure.time}</div>
                  <div className="text-sm text-gray-600">{flight.departure.city}</div>
                  <div className="text-xs text-gray-500">{flight.departure.airport}</div>
                  <div className="text-xs text-gray-500">{flight.departure.date}</div>
                </div>

                {/* Duration */}
                <div className="flex-1 mx-4 text-center">
                  <div className="text-sm text-gray-500 mb-1">Длительность</div>
                  <div className="text-sm">{flight.duration}</div>
                  <div className="w-full bg-gray-200 rounded-full h-1 mt-2">
                    <div className="bg-blue-600 h-1 rounded-full w-full"></div>
                  </div>
                </div>

                {/* Arrival */}
                <div className="text-center">
                  <div className="text-2xl font-bold">{flight.arrival.time}</div>
                  <div className="text-sm text-gray-600">{flight.arrival.city}</div>
                  <div className="text-xs text-gray-500">{flight.arrival.airport}</div>
                  <div className="text-xs text-gray-500">{flight.arrival.date}</div>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Класс: {flight.class === 'economy' ? 'Эконом' : flight.class === 'business' ? 'Бизнес' : 'Первый класс'}</span>
                <span>Свободных мест: {flight.availableSeats}</span>
              </div>
            </div>

            {/* Price and Book Button */}
            <div className="md:ml-6 mt-4 md:mt-0 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {flight.price.toLocaleString()} {flight.currency}
              </div>
              <button
                onClick={() => onBook(flight)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition duration-200"
                disabled={flight.availableSeats === 0}
              >
                {flight.availableSeats === 0 ? 'Нет мест' : 'Забронировать'}
              </button>
            </div>
          </div>
        </div>
        );
      })}
    </div>
  );
};

export default AviaBilet;