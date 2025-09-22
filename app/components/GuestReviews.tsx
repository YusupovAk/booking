import React from 'react';
import { Review } from '../../lib/api';

interface GuestReviewsProps {
  reviews: Review[];
}

const GuestReviews: React.FC<GuestReviewsProps> = ({ reviews }) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-6">Guest Reviews</h2>

      {/* Review Summary */}
      <div className="bg-gray-50 p-6 rounded-lg mb-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="text-4xl font-bold">
            {reviews.length > 0 ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1) : '0'}
          </div>
          <div>
            <div className="font-semibold">Very Good</div>
            <div className="text-sm text-gray-600">Based on {reviews.length} reviews</div>
          </div>
        </div>
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map(rating => {
            const count = reviews.filter(r => Math.floor(r.rating) === rating).length;
            const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
            return (
              <div key={rating} className="flex items-center space-x-2">
                <span className="w-8">{rating}★</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <span className="w-8 text-sm">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Individual Reviews */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="border-b border-gray-200 pb-6">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                {review.guestName.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="font-semibold">{review.guestName}</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'}>★</span>
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 mb-2">{review.comment}</p>
                <div className="text-sm text-gray-500">{review.date}</div>
                <button className="text-blue-600 hover:underline text-sm mt-1">Helpful</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GuestReviews;