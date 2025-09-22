import Header from './components/Header';
import NavigationTabs from './components/NavigationTabs';
import HeroSection from './components/HeroSection';
import SearchForm from './components/SearchForm';
import ContentSection from './components/ContentSection';
import PromotionalBannersSection from './components/PromotionalBannersSection';
import TrendingDestinationsSection from './components/TrendingDestinationsSection';
import PropertyTypeSection from './components/PropertyTypeSection';
import SpecialOffersSection from './components/SpecialOffersSection';
import RecentlyViewedSection from './components/RecentlyViewedSection';
import InspirationSection from './components/InspirationSection';
import Footer from './components/Footer';

export default function Home() {
  return (
    <div>
      <Header />
      <NavigationTabs />
      <HeroSection />
      <SearchForm />
      <ContentSection />
      <PromotionalBannersSection />
      <TrendingDestinationsSection />
      <PropertyTypeSection />
      <SpecialOffersSection />
      <RecentlyViewedSection />
      <InspirationSection />
      <Footer />
    </div>
  );
}
