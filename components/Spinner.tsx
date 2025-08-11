import React from 'react';

const Spinner = () => (
  <div className="flex justify-center items-center p-8">
    <div className="w-12 h-12 border-4 border-teal-600 border-solid border-t-transparent rounded-full animate-spin"></div>
  </div>
);

export default Spinner;