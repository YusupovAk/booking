'use client';

import React, { useState } from 'react';

interface HotelGalleryProps {
  photos: string[];
}

const HotelGallery: React.FC<HotelGalleryProps> = ({ photos }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);

  if (showAll) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
        <div className="max-w-4xl max-h-full overflow-auto bg-white rounded-lg">
          <div className="p-4">
            <button
              onClick={() => setShowAll(false)}
              className="float-right text-gray-600 hover:text-gray-800"
            >
              ✕
            </button>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
              {photos.map((photo, index) => (
                <img
                  key={index}
                  src={photo}
                  alt={`Hotel photo ${index + 1}`}
                  className="w-full h-48 object-cover rounded cursor-pointer"
                  onClick={() => {
                    setCurrentIndex(index);
                    setShowAll(false);
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative mb-6">
      <div className="grid grid-cols-4 gap-2">
        <div className="col-span-2 row-span-2">
          <img
            src={photos[currentIndex]}
            alt="Main hotel photo"
            className="w-full h-64 object-cover rounded-lg cursor-pointer"
            onClick={() => setShowAll(true)}
          />
        </div>
        {photos.slice(1, 5).map((photo, index) => (
          <img
            key={index}
            src={photo}
            alt={`Hotel photo ${index + 2}`}
            className="w-full h-32 object-cover rounded-lg cursor-pointer"
            onClick={() => setCurrentIndex(index + 1)}
          />
        ))}
      </div>
      <button
        onClick={() => setShowAll(true)}
        className="absolute bottom-4 right-4 bg-white bg-opacity-80 px-4 py-2 rounded-lg hover:bg-opacity-100 transition"
      >
        View all photos
      </button>
      <button className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-80 p-2 rounded-full hover:bg-opacity-100">
        ‹
      </button>
      <button className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-80 p-2 rounded-full hover:bg-opacity-100">
        ›
      </button>
      <button className="absolute top-4 right-4 bg-white bg-opacity-80 p-2 rounded-full hover:bg-opacity-100">
        ❤️
      </button>
    </div>
  );
};

export default HotelGallery;