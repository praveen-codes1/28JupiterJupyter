import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import formbg from '../assets/formbg.png';

export default function FormComponent() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    time: '',
    day: '',
    sourceLat: '',
    sourceLon: '',
    officeLat: '',
    officeLon: '',
    tripType: 0
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dayMap = {
      Monday: 0,
      Tuesday: 1,
      Wednesday: 2,
      Thursday: 3,
      Friday: 4,
      Saturday: 5,
      Sunday: 6
    };

    const inputData = {
      home_lat: parseFloat(form.sourceLat),
      home_lon: parseFloat(form.sourceLon),
      day_of_week_num: isNaN(form.day) ? dayMap[form.day] : parseInt(form.day),
      departure_hour: parseInt(form.time),
      trip_type_num: parseInt(form.tripType),
      office_lat: parseFloat(form.officeLat),
      office_lon: parseFloat(form.officeLon)
    };

    try {
      const response = await fetch("http://127.0.0.1:5000/api/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(inputData)
      });

      const data = await response.json();
      console.log("Prediction response:", data);

      navigate("/eta", { state: { predicted_eta: data.predicted_eta } }); // Pass as 'eta'
    } catch (err) {
      console.error("Prediction failed", err);
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
            placeholder="Time of Day (e.g., 9 for 9AM)"
            className="bg-white/20 border border-white/30 p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            onChange={handleChange}
            required
          />
          <input
            name="day"
            type="text"
            placeholder="Day of Week (e.g., Monday)"
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
            name="officeLat"
            type="text"
            placeholder="Office Latitude"
            className="bg-white/20 border border-white/30 p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            onChange={handleChange}
            required
          />
          <input
            name="officeLon"
            type="text"
            placeholder="Office Longitude"
            className="bg-white/20 border border-white/30 p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            onChange={handleChange}
            required
          />
          <div className="flex items-center justify-between">
            <label htmlFor="tripType" className="text-white">Trip Type</label>
            <select
              name="tripType"
              id="tripType"
              value={form.tripType}
              onChange={handleChange}
              className="bg-white/20 border border-white/30 p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              <option value={0}>Home to Office</option>
              <option value={1}>Office to Home</option>
            </select>
          </div>
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
