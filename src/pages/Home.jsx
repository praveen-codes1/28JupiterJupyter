import React from 'react';
import { Link } from 'react-router-dom'; 
import { motion } from 'framer-motion';
import logo from '../assets/logo.png';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-blue-900 text-white flex flex-col items-center justify-center px-4">
      
      <a href="https://mypickup.in/" target="_blank" rel="noopener noreferrer">
        <img src={logo} alt="Ride ETA Logo" className="mx-auto mt-[-40px] w-32 h-32 mb-6 rounded-full shadow-lg hover:scale-105 transition-transform duration-300" />
      </a>
      

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold mb-4 tracking-wide">
          Ride ETA Predictor
        </h1>
        <p className="mb-6 text-lg text-gray-300">
          Get smart travel time estimates based on live traffic, time & location
        </p>
        <Link
          to="/form"
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded transition duration-300"
        >
          Start Predicting
        </Link>
      </motion.div>
    </div>
  );
}
