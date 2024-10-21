// components/Loader.tsx
import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="flex space-x-2">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className="w-3 h-3 bg-white rounded-full animate-pulse"
            style={{
              animationDelay: `${index * 0.15}s`,
              animationDuration: '1.5s',
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Loader;