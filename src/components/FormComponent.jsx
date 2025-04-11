import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import formbg from '../assets/formbg.png'; // ✅ image imported properly

export default function FormComponent() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    time: '',
    day: '',
    sourceLat: '',
    sourceLon: '',
    destLat: '',
    destLon: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      navigate('/eta', { state: { eta: data.eta } });
    } catch (err) {
      console.error('Prediction failed', err);
    }
  };

  return (
    <div
      className="h-screen w-full bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${formbg})`, backgroundColor: '#0f172a' }}
    >
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="bg-white bg-opacity-10 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-lg"
      >
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Predict Your Ride ETA
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4 text-white">
          <input
            name="time"
            type="text"
            placeholder="Time of Day"
            className="bg-white/20 border border-white/30 p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            onChange={handleChange}
            required
          />
          <input
            name="day"
            type="text"
            placeholder="Day of Week"
            className="bg-white/20 border border-white/30 p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            onChange={handleChange}
            required
          />
          <input
            name="sourceLat"
            type="text"
            placeholder="Source Latitude"
            className="bg-white/20 border border-white/30 p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            onChange={handleChange}
            required
          />
          <input
            name="sourceLon"
            type="text"
            placeholder="Source Longitude"
            className="bg-white/20 border border-white/30 p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            onChange={handleChange}
            required
          />
          <input
            name="destLat"
            type="text"
            placeholder="Destination Latitude"
            className="bg-white/20 border border-white/30 p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            onChange={handleChange}
            required
          />
          <input
            name="destLon"
            type="text"
            placeholder="Destination Longitude"
            className="bg-white/20 border border-white/30 p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="w-full bg-green-400 text-black font-semibold py-2 rounded-xl hover:scale-105 transition"
          >
            Predict ETA
          </button>
        </form>
      </motion.div>
    </div>
  );
}
