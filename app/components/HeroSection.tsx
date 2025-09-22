import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#003580] to-[#002050] text-white py-20 px-6 text-center min-h-[70vh] flex items-center">
      {/* Hero Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`
        }}
        role="img"
        aria-label="Stunning tropical beach resort at sunset with overwater bungalows"
      ></div>

      {/* Background pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 border border-white rounded-full"></div>
        <div className="absolute top-20 right-20 w-24 h-24 border border-white rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 border border-white rounded-full"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto w-full">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
          Найдите следующее место для отдыха
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl mb-8 opacity-90 leading-relaxed">
          Ищите отели, дома для отпуска, апартаменты и не только...
        </p>

        {/* Trust indicators */}
        <div className="flex justify-center items-center space-x-8 mt-12 opacity-75">
          <div className="text-center">
            <div className="text-2xl font-bold">30M+</div>
            <div className="text-sm">отелей по всему миру</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">1.5B+</div>
            <div className="text-sm">отзывов гостей</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">120+</div>
            <div className="text-sm">стран</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;