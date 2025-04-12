import React from 'react';
import { useLocation, Link } from 'react-router-dom';

export default function ETADisplay() {
  const location = useLocation();
  const eta = location.state?.predicted_eta || location.state?.eta;  // Changed 'predicted_eta' to 'eta'

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold">Predicted ETA</h2>
      <p className="my-4 text-lg">{eta ? eta : 'No ETA available'}</p>
      <Link to="/form" className="text-blue-500 underline">Predict Again</Link>
    </div>
  );
}
