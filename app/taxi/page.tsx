'use client';

import React, { useState, useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import TaxiSearchForm from '../components/TaxiSearchForm';
import Footer from '../components/Footer';
import { getCurrentUser } from '../../lib/supabase';
import { getLatestBookedFlight, BookedFlight } from '../../lib/api';

const TaxiPage: React.FC = () => {
  const [latestFlight, setLatestFlight] = useState<BookedFlight | null>(null);

  useEffect(() => {
    const fetchLatestFlight = async () => {
      const user = await getCurrentUser();
      if (user) {
        // In a real app, you would use the actual user ID.
        // For this demo, we use a mock user ID.
        const flight = await getLatestBookedFlight('123');
        setLatestFlight(flight);
      }
    };

    fetchLatestFlight();
  }, []);

  return (
    <div>
      <HeroSection 
        title="Трансфер из аэропорта"
        subtitle="Закажите трансфер из аэропорта в любую точку города"
        showTrustIndicators={false}
      />
      <TaxiSearchForm latestFlight={latestFlight} />
      {/* Results section will be added here */}
      <Footer />
    </div>
  );
};

export default TaxiPage;
