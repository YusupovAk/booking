'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getCurrentUser, resetPassword } from '../../../lib/supabase';
import Header from '../../components/Header';
import NavigationTabs from '../../components/NavigationTabs';
import ProtectedRoute from '../../components/ProtectedRoute';

const AccountSettingsPage: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [emailNotifications, setEmailNotifications] = useState({
    bookingConfirmations: true,
    promotionalOffers: false,
    newsletter: false,
  });
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
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

  const handlePasswordReset = async () => {
    if (!user?.email) return;

    try {
      const { error } = await resetPassword(user.email);
      if (error) {
        setMessage('Error sending password reset email. Please try again.');
      } else {
        setMessage('Password reset email sent! Check your inbox.');
      }
    } catch (error) {
      setMessage('Error sending password reset email. Please try again.');
    }
  };

  const handleSavePreferences = async () => {
    setSaving(true);
    // In a real app, save preferences to database
    setTimeout(() => {
      setSaving(false);
      setMessage('Preferences saved successfully!');
      setTimeout(() => setMessage(''), 3000);
    }, 1000);
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

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link href="/account" className="text-[#0071C2] hover:underline">My Account</Link>
          <span className="mx-2 text-gray-500">{'>'}</span>
          <span className="text-gray-900">Account Settings</span>
        </nav>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Account Settings</h1>
          <p className="text-gray-600">Manage your account preferences and security settings</p>
        </div>

        {message && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
            {message}
          </div>
        )}

        <div className="space-y-8">
          {/* Personal Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  value={user.email}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                />
                <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Account Created</label>
                <input
                  type="text"
                  value={new Date(user.created_at).toLocaleDateString()}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                />
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Security Settings</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Change Password</h3>
                <p className="text-gray-600 mb-4">
                  We recommend changing your password regularly for security.
                </p>
                <button
                  onClick={handlePasswordReset}
                  className="bg-[#0071C2] text-white py-2 px-4 rounded hover:bg-[#005A9E] transition"
                >
                  Send Password Reset Email
                </button>
              </div>
            </div>
          </div>

          {/* Email Preferences */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Email Preferences</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Booking Confirmations</h3>
                  <p className="text-sm text-gray-600">Receive emails about your bookings and reservations</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={emailNotifications.bookingConfirmations}
                    onChange={(e) => setEmailNotifications({...emailNotifications, bookingConfirmations: e.target.checked})}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0071C2]"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Promotional Offers</h3>
                  <p className="text-sm text-gray-600">Receive special offers and discounts from Booking.com</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={emailNotifications.promotionalOffers}
                    onChange={(e) => setEmailNotifications({...emailNotifications, promotionalOffers: e.target.checked})}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0071C2]"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Newsletter</h3>
                  <p className="text-sm text-gray-600">Receive our weekly newsletter with travel tips and inspiration</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={emailNotifications.newsletter}
                    onChange={(e) => setEmailNotifications({...emailNotifications, newsletter: e.target.checked})}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0071C2]"></div>
                </label>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={handleSavePreferences}
                disabled={saving}
                className="bg-[#0071C2] text-white py-2 px-6 rounded hover:bg-[#005A9E] transition disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save Preferences'}
              </button>
            </div>
          </div>

          {/* Privacy Settings */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Privacy Settings</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Data & Privacy</h3>
                <p className="text-gray-600 mb-4">
                  Control how your data is used and manage your privacy settings.
                </p>
                <div className="space-y-2">
                  <Link href="/privacy" className="block text-[#0071C2] hover:underline">Privacy Policy</Link>
                  <Link href="/terms" className="block text-[#0071C2] hover:underline">Terms of Service</Link>
                  <Link href="/data-request" className="block text-[#0071C2] hover:underline">Request Your Data</Link>
                </div>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Danger Zone</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-red-600 mb-2">Delete Account</h3>
                <p className="text-gray-600 mb-4">
                  Permanently delete your account and all associated data. This action cannot be undone.
                </p>
                <button className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </ProtectedRoute>
  );
};

export default AccountSettingsPage;