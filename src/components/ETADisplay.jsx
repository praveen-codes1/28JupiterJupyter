import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion'; // For animation
// Clock icon
import etabg from 'C:/Users/PRAVEEN PATIL/Desktop/jj_eta/jj_eta_app/src/assets/etabg.jpg'; // Background image import

export default function ETADisplay() {
  const location = useLocation();
  const predicted_eta = location.state?.predicted_eta;

  return (
    <div
      className="h-screen w-full flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${etabg})` }} // Set background image
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-white bg-opacity-30 backdrop-blur-lg p-10 rounded-3xl shadow-xl w-full max-w-md text-center"
      >
        <h2 className="text-3xl font-bold text-white mb-6">Your Predicted ETA</h2>
        <div className="mb-8">
          {/* Clock icon */}
          
          <p className="text-4xl font-semibold text-white">
            {predicted_eta ? predicted_eta : 'No ETA available'}
          </p>
        </div>
        <Link
          to="/form"
          className="w-full bg-blue-500 text-white font-semibold py-3 rounded-xl hover:bg-blue-600 transition"
        >
          Predict Again
        </Link>
      </motion.div>
    </div>
  );
}
