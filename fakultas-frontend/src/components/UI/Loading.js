// src/components/UI/Loading.js
import React from 'react';

const Loading = ({ size = 'medium', text = 'Loading...' }) => {
  const sizeClasses = {
    small: 'h-8 w-8',
    medium: 'h-12 w-12',
    large: 'h-16 w-16'
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className={`animate-spin rounded-full border-b-2 border-blue-600 ${sizeClasses[size]}`}></div>
      {text && <p className="text-gray-600">{text}</p>}
    </div>
  );
};

export const PageLoader = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loading size="large" text="Loading application..." />
    </div>
  );
};

export const ContentLoader = () => {
  return (
    <div className="flex items-center justify-center py-12">
      <Loading size="medium" text="Loading content..." />
    </div>
  );
};

export const InlineLoader = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
    </div>
  );
};

export default Loading;