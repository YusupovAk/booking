import jsPDF from 'jspdf';

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
  };
  duration: string;
  price: number;
  currency: string;
  availableSeats: number;
  class: string;
  gate?: string;
  seat?: string;
}

interface Passenger {
  name?: string;
  surname?: string;
  email?: string;
  phone?: string;
  passport?: string;
  nationality?: string;
}


const generateTicketLayout = (doc: jsPDF, flight: Flight, passenger: Passenger, bookingReference: string) => {
    const primaryColor = '#003580';
    const secondaryColor = '#555555';

    const roundedRect = (x: number, y: number, w: number, h: number, r: number, style: string = 'F') => {
        doc.roundedRect(x, y, w, h, r, r, style);
    };

    doc.setFillColor(245, 245, 245);
    roundedRect(10, 10, 190, 120, 5);

    doc.setFillColor(primaryColor);
    roundedRect(10, 10, 190, 25, 5, 'FD');

    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.text(flight.airline, 15, 25);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.text('BOARDING PASS / ПОСАДОЧНЫЙ ТАЛОН', 100, 25);

    doc.setTextColor(secondaryColor);
    doc.setFontSize(10);

    const addDetail = (x: number, y: number, ru: string, en: string, value: string) => {
        doc.setFont('helvetica', 'bold');
        doc.text(ru, x, y);
        doc.setFont('helvetica', 'normal');
        doc.text(en, x, y + 4);
        doc.setTextColor(primaryColor);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(14);
        doc.text(value, x + 40, y + 2);
        doc.setTextColor(secondaryColor);
        doc.setFontSize(10);
    };

    addDetail(20, 50, 'Пассажир', 'Passenger', `${passenger.surname || ''} ${passenger.name || ''}`.trim());
    addDetail(20, 65, 'Откуда', 'From', flight.departure.city);
    addDetail(20, 80, 'Куда', 'To', flight.arrival.city);

    addDetail(110, 50, 'Рейс', 'Flight', flight.flightNumber);
    addDetail(110, 65, 'Дата', 'Date', flight.departure.date);
    addDetail(110, 80, 'Время', 'Time', flight.departure.time);

    doc.setLineDashPattern([1, 1], 0);
    doc.setDrawColor(secondaryColor);
    doc.line(10, 95, 200, 95);
    doc.setLineDashPattern([], 0);

    addDetail(20, 105, 'Класс', 'Class', flight.class.charAt(0).toUpperCase() + flight.class.slice(1));
    addDetail(80, 105, 'Место', 'Seat', flight.seat || 'N/A');
    addDetail(140, 105, 'Выход', 'Gate', flight.gate || 'N/A');

    doc.setFillColor(245, 245, 245);
    roundedRect(10, 140, 190, 40, 5);
    doc.fill();

    let x = 20;
    while (x < 190) {
        const width = Math.random() * 1.5 + 0.5;
        doc.setDrawColor(0);
        doc.setLineWidth(width);
        doc.line(x, 150, x, 170);
        x += width + Math.random() * 2;
    }

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(secondaryColor);
    doc.text('Please present this boarding pass and your travel documents at the gate.', 105, 185, { align: 'center' });
    doc.text('Пожалуйста, предъявите этот посадочный талон и документы на выходе.', 105, 190, { align: 'center' });

    doc.setFontSize(10);
    doc.text(`Booking Ref: ${bookingReference}`, 105, 198, { align: 'center' });
};

export const generateFlightTicketPDF = (
  flight: Flight,
  passenger: Passenger = {},
  bookingReference: string = ''
) => {
  const doc = new jsPDF();
  const finalBookingRef = bookingReference || `BK${Date.now().toString().slice(-8)}`;
  generateTicketLayout(doc, flight, passenger, finalBookingRef);
  doc.save(`BoardingPass-${flight.flightNumber}-${finalBookingRef}.pdf`);
  return finalBookingRef;
};

export const generateMultipleTicketsPDF = (
  flights: Flight[],
  passenger: Passenger = {}
) => {
  const doc = new jsPDF();
  const finalBookingRef = `BK-GROUP-${Date.now().toString().slice(-8)}`;

  flights.forEach((flight, index) => {
    if (index > 0) {
      doc.addPage();
    }
    generateTicketLayout(doc, flight, passenger, finalBookingRef);
  });

  doc.save(`BoardingPasses-Group-${finalBookingRef}.pdf`);
  return finalBookingRef;
};