import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Display() {
  const location = useLocation();
  const { eta } = location.state || {};

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-2">Ride Info Display</h2>
      <p>{eta ? `The predicted ETA for your ride is: ${eta} minutes` : 'No prediction data available.'}</p>
      <Link to="/" className="text-blue-500 underline">Back to Home</Link>
    </div>
  );
}
