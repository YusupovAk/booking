'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getCurrentUser } from '../../../lib/supabase';
import Header from '../../components/Header';
import NavigationTabs from '../../components/NavigationTabs';
import ProtectedRoute from '../../components/ProtectedRoute';

interface Booking {
  id: string;
  hotelName: string;
  location: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  status: 'upcoming' | 'completed' | 'cancelled';
  bookingDate: string;
  image: string;
}

const AccountBookingsPage: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'completed' | 'cancelled'>('all');
  const router = useRouter();

  // Mock booking data
  const mockBookings: Booking[] = [
    {
      id: '1',
      hotelName: 'Hotel Novgorod',
      location: 'Tashkent, Uzbekistan',
      checkIn: '2024-12-25',
      checkOut: '2024-12-27',
      guests: 2,
      totalPrice: 240,
      status: 'upcoming',
      bookingDate: '2024-11-15',
      image: 'https://via.placeholder.com/200x150?text=Hotel+Novgorod'
    },
    {
      id: '2',
      hotelName: 'Grand Hotel',
      location: 'Samarkand, Uzbekistan',
      checkIn: '2024-10-10',
      checkOut: '2024-10-12',
      guests: 2,
      totalPrice: 300,
      status: 'completed',
      bookingDate: '2024-09-20',
      image: 'https://via.placeholder.com/200x150?text=Grand+Hotel'
    }
  ];

  useEffect(() => {
    const checkUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
          setBookings(mockBookings);
        } else {
          router.push('/signin');
        }
      } catch (error) {
        console.error('Error checking user:', error);
        router.push('/signin');
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, [router]);

  const filteredBookings = bookings.filter(booking => {
    if (filter === 'all') return true;
    return booking.status === filter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'upcoming': return 'Upcoming';
      case 'completed': return 'Completed';
      case 'cancelled': return 'Cancelled';
      default: return status;
    }
  };

  if (loading) {
    return (
      <div>
        <Header />
        <NavigationTabs />
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex justify-center items-center min-h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0071C2]"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <ProtectedRoute>
      <div>
        <Header />
        <NavigationTabs />

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link href="/account" className="text-[#0071C2] hover:underline">My Account</Link>
          <span className="mx-2 text-gray-500">{'>'}</span>
          <span className="text-gray-900">My Bookings</span>
        </nav>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Bookings</h1>
          <p className="text-gray-600">View and manage your hotel reservations</p>
        </div>

        {/* Filter Tabs */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
            {[
              { key: 'all', label: 'All Bookings' },
              { key: 'upcoming', label: 'Upcoming' },
              { key: 'completed', label: 'Completed' },
              { key: 'cancelled', label: 'Cancelled' }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key as any)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                  filter === tab.key
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Bookings List */}
        {filteredBookings.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🏨</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No bookings found</h3>
            <p className="text-gray-600 mb-6">
              {filter === 'all'
                ? "You haven't made any bookings yet."
                : `You don't have any ${filter} bookings.`
              }
            </p>
            <Link
              href="/"
              className="bg-[#0071C2] text-white py-3 px-6 rounded-lg hover:bg-[#005A9E] transition font-medium"
            >
              Start Exploring Hotels
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredBookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/4">
                    <img
                      src={booking.image}
                      alt={booking.hotelName}
                      className="w-full h-48 md:h-full object-cover"
                    />
                  </div>
                  <div className="md:w-3/4 p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-1">
                          {booking.hotelName}
                        </h3>
                        <p className="text-gray-600 mb-2">{booking.location}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>Check-in: {new Date(booking.checkIn).toLocaleDateString()}</span>
                          <span>Check-out: {new Date(booking.checkOut).toLocaleDateString()}</span>
                          <span>{booking.guests} guest{booking.guests > 1 ? 's' : ''}</span>
                        </div>
                      </div>
                      <div className="mt-4 md:mt-0 text-right">
                        <div className="text-2xl font-bold text-gray-900 mb-1">
                          ${booking.totalPrice}
                        </div>
                        <div className="text-sm text-gray-600 mb-2">Total paid</div>
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                          {getStatusText(booking.status)}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <button className="bg-[#0071C2] text-white py-2 px-4 rounded hover:bg-[#005A9E] transition">
                        View Details
                      </button>
                      {booking.status === 'upcoming' && (
                        <>
                          <button className="border border-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-50 transition">
                            Modify Booking
                          </button>
                          <button className="border border-red-300 text-red-600 py-2 px-4 rounded hover:bg-red-50 transition">
                            Cancel Booking
                          </button>
                        </>
                      )}
                      {booking.status === 'completed' && (
                        <button className="border border-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-50 transition">
                          Write Review
                        </button>
                      )}
                    </div>

                    <div className="mt-4 text-sm text-gray-500">
                      Booked on {new Date(booking.bookingDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Help Section */}
        <div className="mt-12 bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Need Help?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl mb-2">📞</div>
              <h4 className="font-medium text-gray-900">Customer Support</h4>
              <p className="text-sm text-gray-600">24/7 support for your bookings</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">💬</div>
              <h4 className="font-medium text-gray-900">Live Chat</h4>
              <p className="text-sm text-gray-600">Get instant help from our team</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">📧</div>
              <h4 className="font-medium text-gray-900">Email Support</h4>
              <p className="text-sm text-gray-600">Send us a detailed message</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </ProtectedRoute>
  );
};

export default AccountBookingsPage;