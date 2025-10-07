'use client';

import React from 'react';
import Link from 'next/link';

interface BookingSuccessMessageProps {
  onClose: () => void;
}

const BookingSuccessMessage: React.FC<BookingSuccessMessageProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-card text-card-foreground rounded-lg shadow-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-primary mb-4">Билет успешно забронирован!</h2>
        <p className="text-muted-foreground mb-6">Не забудьте заказать трансфер из аэропорта для комфортного путешествия.</p>
        <div className="flex justify-end space-x-4">
          <button 
            onClick={onClose}
            className="bg-secondary text-secondary-foreground px-6 py-2 rounded-lg hover:bg-secondary/90 transition"
          >
            Закрыть
          </button>
          <Link href="/taxi">
            <button className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition">
              Заказать трансфер
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccessMessage;
