import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Enter Ride Details</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="time" type="text" placeholder="Time of Day" className="border p-2 w-full" onChange={handleChange} required />
        <input name="day" type="text" placeholder="Day of Week" className="border p-2 w-full" onChange={handleChange} required />
        <input name="sourceLat" type="text" placeholder="Source Latitude" className="border p-2 w-full" onChange={handleChange} required />
        <input name="sourceLon" type="text" placeholder="Source Longitude" className="border p-2 w-full" onChange={handleChange} required />
        <input name="destLat" type="text" placeholder="Destination Latitude" className="border p-2 w-full" onChange={handleChange} required />
        <input name="destLon" type="text" placeholder="Destination Longitude" className="border p-2 w-full" onChange={handleChange} required />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Predict ETA</button>
      </form>
    </div>
  );
}
