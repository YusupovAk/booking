import React from 'react';
import Header from '../components/Header';
import NavigationTabs from '../components/NavigationTabs';
import Footer from '../components/Footer';

const AttractionsPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <NavigationTabs />
      <main className="flex-grow max-w-7xl mx-auto px-6 py-8 w-full">
        <h1 className="text-4xl font-bold mb-4">Достопримечательности</h1>
        <p className="text-lg text-gray-600 mb-8">
          Эта функция находится в разработке.
        </p>
        <div className="bg-gray-100 p-8 rounded-lg text-center">
          <p className="text-2xl">🎯</p>
          <p className="mt-2 font-semibold">Скоро здесь появится поиск достопримечательностей и билетов!</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AttractionsPage;

