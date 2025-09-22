import axios from 'axios';

// Mock API for demonstration - replace with real API calls
export interface Hotel {
  id: string;
  name: string;
  location: string;
  price: number;
  rating: number;
  image: string;
  description: string;
  amenities: string[];
  reviews: Review[];
  photos: string[];
}

export interface Review {
  id: string;
  guestName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface SearchParams {
  destination: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  rooms: number;
}

// Mock data
const mockHotels: Hotel[] = [
  {
    id: '1',
    name: 'Hotel Novgorod',
    location: 'Tashkent, Uzbekistan',
    price: 120,
    rating: 8.5,
    image: 'https://via.placeholder.com/400x250?text=Hotel+Novgorod',
    description: 'Modern hotel in the heart of Tashkent with excellent amenities.',
    amenities: ['Free WiFi', 'Pool', 'Gym', 'Restaurant', 'Airport shuttle'],
    reviews: [
      {
        id: '1',
        guestName: 'John Doe',
        rating: 9,
        comment: 'Great location and friendly staff.',
        date: '2023-10-01'
      }
    ],
    photos: [
      'https://via.placeholder.com/600x400?text=Hotel+Exterior',
      'https://via.placeholder.com/600x400?text=Lobby',
      'https://via.placeholder.com/600x400?text=Room'
    ]
  },
  {
    id: '2',
    name: 'Grand Hotel',
    location: 'Samarkand, Uzbekistan',
    price: 150,
    rating: 9.0,
    image: 'https://via.placeholder.com/400x250?text=Grand+Hotel',
    description: 'Luxury hotel with historical charm.',
    amenities: ['Free WiFi', 'Spa', 'Business center', 'Bar'],
    reviews: [
      {
        id: '2',
        guestName: 'Jane Smith',
        rating: 8.5,
        comment: 'Beautiful hotel with amazing views.',
        date: '2023-09-15'
      }
    ],
    photos: [
      'https://via.placeholder.com/600x400?text=Grand+Hotel+Exterior',
      'https://via.placeholder.com/600x400?text=Spa',
      'https://via.placeholder.com/600x400?text=Suite'
    ]
  }
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const searchHotels = async (params: SearchParams): Promise<Hotel[]> => {
  await delay(1000); // Simulate network delay
  // In real implementation, make API call with params
  // For demo, return mock data
  return mockHotels;
};

export const getHotelById = async (id: string): Promise<Hotel | null> => {
  await delay(500);
  return mockHotels.find(hotel => hotel.id === id) || null;
};

// For real API integration, uncomment and configure:
// const API_KEY = process.env.NEXT_PUBLIC_RAPIDAPI_KEY;
// const API_HOST = 'hotels4.p.rapidapi.com';

// export const searchHotels = async (params: SearchParams): Promise<Hotel[]> => {
//   const response = await axios.get('https://hotels4.p.rapidapi.com/locations/search', {
//     params: { query: params.destination },
//     headers: {
//       'X-RapidAPI-Key': API_KEY,
//       'X-RapidAPI-Host': API_HOST
//     }
//   });
//   // Process response and return formatted hotels
//   return [];
// };