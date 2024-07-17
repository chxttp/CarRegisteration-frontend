import React, { useState } from 'react';
import './CarForm.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CarForm = () => {
  const navigate = useNavigate();
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [repairItems, setRepairItems] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('https://carregisteration.onrender.com/api/car', {
        registrationNumber,
        repairItems: repairItems.split(',').map(item => item.trim())
      });
      alert('Car added successfully');
      navigate('/home')
      // Clear form fields or redirect as needed
    } catch (error) {
      console.error('Error adding car:', error);
      alert('Error adding car');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Registration Number:</label>
        <input
          type="text"
          value={registrationNumber}
          onChange={(e) => setRegistrationNumber(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Repair Items (comma-separated):</label>
        <input
          type="text"
          value={repairItems}
          onChange={(e) => setRepairItems(e.target.value)}
          required
        />
      </div>
      <button type="submit">Add Car</button>
    </form>
  );
};

export default CarForm;
