import { create } from 'zustand';
import { Hotel, SearchParams } from './api';

interface HotelStore {
  searchResults: Hotel[];
  currentHotel: Hotel | null;
  isLoading: boolean;
  error: string | null;
  searchParams: SearchParams | null;
  setSearchResults: (results: Hotel[]) => void;
  setCurrentHotel: (hotel: Hotel | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSearchParams: (params: SearchParams) => void;
}

export const useHotelStore = create<HotelStore>((set) => ({
  searchResults: [],
  currentHotel: null,
  isLoading: false,
  error: null,
  searchParams: null,
  setSearchResults: (results) => set({ searchResults: results }),
  setCurrentHotel: (hotel) => set({ currentHotel: hotel }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  setSearchParams: (params) => set({ searchParams: params }),
}));