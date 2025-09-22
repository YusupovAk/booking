'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getCurrentUser, signOut } from '../../lib/supabase';

const Header: React.FC = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showCurrencyModal, setShowCurrencyModal] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCurrency, setSelectedCurrency] = useState('UZS');
  const [selectedLanguage, setSelectedLanguage] = useState('Русский');

  useEffect(() => {
    const checkUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error('Error checking user:', error);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      setUser(null);
      window.location.href = '/';
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header className="bg-gradient-to-r from-[#003580] to-[#002c6e] text-white py-4 px-6 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold font-['Helvetica']">Booking.com</div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Currency Selector */}
          <button
            onClick={() => setShowCurrencyModal(true)}
            className="flex items-center space-x-1 hover:bg-white/10 px-3 py-2 rounded transition"
          >
            <span>{selectedCurrency}</span>
            <span className="text-xs">▼</span>
          </button>

          {/* Language Selector */}
          <button
            onClick={() => setShowLanguageModal(true)}
            className="flex items-center space-x-1 hover:bg-white/10 px-3 py-2 rounded transition"
          >
            <span>{languages.find(l => l.native === selectedLanguage)?.flag}</span>
            <span className="text-xs">▼</span>
          </button>

          {/* Help Icon */}
          <button className="hover:bg-white/10 p-2 rounded transition" title="Help">
            ❓
          </button>

          {/* User Actions */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                className="flex items-center space-x-2 hover:bg-white/10 px-3 py-2 rounded transition"
              >
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-[#003580] font-bold">
                  {user.email.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm">▼</span>
              </button>
              {showUserDropdown && (
                <div className="absolute top-full right-0 mt-2 bg-white text-gray-800 rounded-lg shadow-lg py-2 min-w-48 z-50">
                  <div className="px-4 py-2 border-b border-gray-200">
                    <p className="text-sm font-medium">{user.email}</p>
                  </div>
                  <Link href="/account" className="block px-4 py-2 hover:bg-gray-100">
                    My Account
                  </Link>
                  <Link href="/account/bookings" className="block px-4 py-2 hover:bg-gray-100">
                    My Bookings
                  </Link>
                  <Link href="/account/settings" className="block px-4 py-2 hover:bg-gray-100">
                    Account Settings
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <button className="hover:bg-white/10 px-3 py-2 rounded transition">
                Зарегистрировать свой объект
              </button>
              <Link href="/signup">
                <button className="border border-white text-white px-4 py-2 rounded hover:bg-white hover:text-[#003580] transition">
                  Зарегистрироваться
                </button>
              </Link>
              <Link href="/signin">
                <button className="bg-[#0071C2] text-white px-4 py-2 rounded hover:bg-[#005aa3] transition">
                  Войти в аккаунт
                </button>
              </Link>
            </>
          )}
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