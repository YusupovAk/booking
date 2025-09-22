'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getCurrentUser, signOut } from '../../lib/supabase';
import Header from '../components/Header';
import NavigationTabs from '../components/NavigationTabs';
import ProtectedRoute from '../components/ProtectedRoute';

interface User {
  id: string;
  email: string;
  created_at: string;
  last_sign_in_at?: string;
}

const AccountPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        if (currentUser) {
          setUser({
            id: currentUser.id,
            email: currentUser.email || '',
            created_at: currentUser.created_at,
            last_sign_in_at: currentUser.last_sign_in_at,
          });
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

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Account</h1>
          <p className="text-gray-600">Manage your account settings and bookings</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Account Overview */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-[#0071C2] rounded-full flex items-center justify-center text-white text-xl font-bold">
                {user.email.charAt(0).toUpperCase()}
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Account Overview</h3>
                <p className="text-gray-600 text-sm">{user.email}</p>
              </div>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <p>Member since: {new Date(user.created_at).toLocaleDateString()}</p>
              {user.last_sign_in_at && (
                <p>Last sign in: {new Date(user.last_sign_in_at).toLocaleDateString()}</p>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link
                href="/account/profile"
                className="block w-full bg-[#0071C2] text-white py-2 px-4 rounded hover:bg-[#005A9E] transition text-center"
              >
                Edit Profile
              </Link>
              <Link
                href="/account/bookings"
                className="block w-full bg-gray-100 text-gray-800 py-2 px-4 rounded hover:bg-gray-200 transition text-center"
              >
                My Bookings
              </Link>
              <Link
                href="/account/settings"
                className="block w-full bg-gray-100 text-gray-800 py-2 px-4 rounded hover:bg-gray-200 transition text-center"
              >
                Account Settings
              </Link>
            </div>
          </div>

          {/* Account Stats */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Stats</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Bookings</span>
                <span className="font-semibold text-[#0071C2]">0</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Reviews Written</span>
                <span className="font-semibold text-[#0071C2]">0</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Favorite Hotels</span>
                <span className="font-semibold text-[#0071C2]">0</span>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-md p-6 md:col-span-2 lg:col-span-3">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="text-center py-8 text-gray-500">
              <p>No recent activity to show.</p>
              <p className="text-sm mt-2">Start exploring hotels to see your activity here!</p>
            </div>
          </div>
        </div>

        {/* Sign Out Button */}
        <div className="mt-12 text-center">
          <button
            onClick={handleSignOut}
            className="bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 transition font-medium"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
    </ProtectedRoute>
  );
};

export default AccountPage;