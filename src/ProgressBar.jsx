// src/ProgressBar.js
import React from 'react';

const ProgressBar = ({ timeLeft }) => {
  const progress = (timeLeft / 10) * 100;

  return (
    <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
      <div
        className={`bg-indigo-500 h-4 rounded-full transition-width duration-1000 ease-linear`}
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
