'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

  return (
    <header className="bg-gradient-to-r from-[#003580] to-[#002c6e] text-white py-4 px-6 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold font-['Helvetica']">Booking.com</div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Currency Selector */}
          <div className="relative">
            <button
              onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
              className="flex items-center space-x-1 hover:bg-white/10 px-3 py-2 rounded transition"
            >
              <span>UZS</span>
              <span>🇺🇿</span>
              <span className="text-xs">▼</span>
            </button>
            {showCurrencyDropdown && (
              <div className="absolute top-full right-0 mt-2 bg-white text-gray-800 rounded-lg shadow-lg py-2 min-w-32">
                <button className="w-full text-left px-4 py-2 hover:bg-gray-100">UZS 🇺🇿</button>
                <button className="w-full text-left px-4 py-2 hover:bg-gray-100">USD 🇺🇸</button>
                <button className="w-full text-left px-4 py-2 hover:bg-gray-100">EUR 🇪🇺</button>
              </div>
            )}
          </div>

          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
              className="flex items-center space-x-1 hover:bg-white/10 px-3 py-2 rounded transition"
            >
              <span>🇷🇺</span>
              <span className="text-xs">▼</span>
            </button>
            {showLanguageDropdown && (
              <div className="absolute top-full right-0 mt-2 bg-white text-gray-800 rounded-lg shadow-lg py-2 min-w-32">
                <button className="w-full text-left px-4 py-2 hover:bg-gray-100">🇷🇺 Русский</button>
                <button className="w-full text-left px-4 py-2 hover:bg-gray-100">🇺🇿 O'zbek</button>
                <button className="w-full text-left px-4 py-2 hover:bg-gray-100">🇺🇸 English</button>
              </div>
            )}
          </div>

          {/* Help Icon */}
          <button className="hover:bg-white/10 p-2 rounded transition" title="Help">
            ❓
          </button>

          {/* User Actions */}
          <button className="hover:bg-white/10 px-3 py-2 rounded transition">
            Зарегистрировать свой объект
          </button>
          <button className="border border-white text-white px-4 py-2 rounded hover:bg-white hover:text-[#003580] transition">
            Зарегистрироваться
          </button>
          <Link href="/signin">
            <button className="bg-[#0071C2] text-white px-4 py-2 rounded hover:bg-[#005aa3] transition">
              Войти в аккаунт
            </button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#003580] border-t border-white/20">
          <div className="px-6 py-4 space-y-4">
            <div className="flex justify-between items-center">
              <span>UZS 🇺🇿</span>
              <span>🇷🇺</span>
            </div>
            <button className="block w-full text-left py-2">Зарегистрировать свой объект</button>
            <button className="block w-full text-left py-2 border border-white rounded px-4">
              Зарегистрироваться
            </button>
            <button className="block w-full bg-[#0071C2] text-white py-2 rounded">
              Войти в аккаунт
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;