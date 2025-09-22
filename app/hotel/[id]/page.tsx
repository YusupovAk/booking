'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getHotelById, Hotel } from '../../../lib/api';
import { useHotelStore } from '../../../lib/store';
import Header from '../../components/Header';
import NavigationTabs from '../../components/NavigationTabs';
import HotelGallery from '../../components/HotelGallery';
import HotelHeader from '../../components/HotelHeader';
import HotelDescription from '../../components/HotelDescription';
import RoomTypes from '../../components/RoomTypes';
import GuestReviews from '../../components/GuestReviews';
import LocationSection from '../../components/LocationSection';
import BookingWidget from '../../components/BookingWidget';

const HotelDetailPage: React.FC = () => {
  const params = useParams();
  const id = params.id as string;
  const { currentHotel, setCurrentHotel, setLoading, setError } = useHotelStore();
  const [loading, setLocalLoading] = useState(true);

  useEffect(() => {
    const fetchHotel = async () => {
      setLocalLoading(true);
      setLoading(true);
      try {
        const hotel = await getHotelById(id);
        if (hotel) {
          setCurrentHotel(hotel);
        } else {
          setError('Hotel not found');
        }
      } catch (err) {
        setError('Failed to load hotel details');
      } finally {
        setLocalLoading(false);
        setLoading(false);
      }
    };

    fetchHotel();
  }, [id, setCurrentHotel, setLoading, setError]);

  if (loading) {
    return (
      <div>
        <Header />
        <NavigationTabs />
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="animate-pulse">
            <div className="h-64 bg-gray-300 rounded-lg mb-6"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="h-8 bg-gray-300 rounded"></div>
                <div className="h-32 bg-gray-300 rounded"></div>
              </div>
              <div className="h-96 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!currentHotel) {
    return (
      <div>
        <Header />
        <NavigationTabs />
        <div className="max-w-7xl mx-auto px-6 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Hotel not found</h1>
          <p>Please check the URL and try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <NavigationTabs />

      {/* Breadcrumb */}
      <div className="bg-gray-100 py-2 px-6">
        <div className="max-w-7xl mx-auto">
          <nav className="text-sm">
            <a href="/" className="text-blue-600 hover:underline">Home</a> {' > '}
            <span className="text-gray-600">{currentHotel.location.split(',')[1]?.trim() || 'Uzbekistan'}</span> {' > '}
            <span className="text-gray-600">{currentHotel.location.split(',')[0]}</span> {' > '}
            <span className="text-gray-900">{currentHotel.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <HotelHeader hotel={currentHotel} />
            <HotelGallery photos={currentHotel.photos} />
            <HotelDescription hotel={currentHotel} />
            <RoomTypes />
            <GuestReviews reviews={currentHotel.reviews} />
            <LocationSection />
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <BookingWidget hotel={currentHotel} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetailPage;