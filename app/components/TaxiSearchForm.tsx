'use client';

import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { BookedFlight } from '../../lib/api';

interface TaxiSearchFormProps {
  latestFlight: BookedFlight | null;
}

const TaxiSearchForm: React.FC<TaxiSearchFormProps> = ({ latestFlight }) => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState<Date | null>(new Date());
  const [time, setTime] = useState('12:00');
  const [passengers, setPassengers] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [advice, setAdvice] = useState('');

  const getAirportAdvice = (airport: string): string => {
    if (airport.includes('Tashkent')) {
      return 'Аэропорт Ташкента предлагает удобные варианты трансфера. Рекомендуется использовать официальные такси или приложения для заказа транспорта. Время в пути до центра города около 30-45 минут в зависимости от трафика.';
    }
    // Add more airports as needed
    return 'Пожалуйста, проверьте официальные источники аэропорта для информации о трансфере.';
  };

  useEffect(() => {
    if (latestFlight) {
      setFrom(latestFlight.to);
      const arrivalDate = new Date(latestFlight.arrivalDate);
      setDate(arrivalDate);
      setTime(arrivalDate.toTimeString().slice(0, 5));
      setAdvice(getAirportAdvice(latestFlight.to));
    }
  }, [latestFlight]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Mock search
    setTimeout(() => {
      setIsLoading(false);
      alert(`Searching for a taxi from ${from} to ${to} on ${date?.toLocaleDateString()} at ${time} for ${passengers} passengers.`);
    }, 1000);
  };

  return (
    <div className="bg-card text-card-foreground border-2 border-primary rounded-lg p-6 mx-6 -mt-8 relative z-10 shadow-xl max-w-6xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* From */}
          <div className="md:col-span-2">
            <label htmlFor="from" className="text-sm font-medium text-muted-foreground">Откуда</label>
            <input
              id="from"
              type="text"
              placeholder="Аэропорт, город или адрес"
              className="w-full mt-1 p-3 border border-border rounded-lg bg-transparent"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              required
            />
          </div>

          {/* To */}
          <div className="md:col-span-2">
            <label htmlFor="to" className="text-sm font-medium text-muted-foreground">Куда</label>
            <input
              id="to"
              type="text"
              placeholder="Аэропорт, город или адрес"
              className="w-full mt-1 p-3 border border-border rounded-lg bg-transparent"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              required
            />
          </div>

          {/* Date */}
          <div>
            <label htmlFor="date" className="text-sm font-medium text-muted-foreground">Дата</label>
            <DatePicker
              id="date"
              selected={date}
              onChange={(d) => setDate(d)}
              className="w-full mt-1 p-3 border border-border rounded-lg bg-transparent"
              dateFormat="dd/MM/yyyy"
              minDate={new Date()}
            />
          </div>

          {/* Time */}
          <div>
            <label htmlFor="time" className="text-sm font-medium text-muted-foreground">Время</label>
            <input
              id="time"
              type="time"
              className="w-full mt-1 p-3 border border-border rounded-lg bg-transparent"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>

          {/* Passengers */}
          <div>
            <label htmlFor="passengers" className="text-sm font-medium text-muted-foreground">Пассажиры</label>
            <input
              id="passengers"
              type="number"
              min="1"
              className="w-full mt-1 p-3 border border-border rounded-lg bg-transparent"
              value={passengers}
              onChange={(e) => setPassengers(parseInt(e.target.value, 10))}
            />
          </div>

          {/* Search Button */}
          <div className="md:col-span-1 flex items-end">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-primary-foreground px-8 py-3 rounded-lg hover:bg-primary/90 transition-all duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            >
              {isLoading ? 'Поиск...' : 'Найти'}
            </button>
          </div>
        </div>
      </form>
      {advice && (
        <div className="mt-6 p-4 bg-muted rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Рекомендации по трансферу</h3>
          <p className="text-muted-foreground">{advice}</p>
        </div>
      )}
    </div>
  );
};

export default TaxiSearchForm;
