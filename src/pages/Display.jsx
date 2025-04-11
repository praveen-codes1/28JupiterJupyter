import React from 'react';
import { Link } from 'react-router-dom';

export default function Display() {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-2">Ride Info Display</h2>
      <p>This page will show past predictions or a summary.</p>
      <Link to="/" className="text-blue-500 underline">Back to Home</Link>
    </div>
  );
}
