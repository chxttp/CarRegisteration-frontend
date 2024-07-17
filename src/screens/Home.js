// src/components/Home.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SearchBar from '../components/SearchBar';
import './Home.css';

const Home = () => {
  const [filteredCars, setFilteredCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [repairItems, setRepairItems] = useState([]);

  const handleSearch = async (query) => {
    if (query) {
      const response = await axios.get(`https://carregisteration.onrender.com/api/search?query=${query}`);
      setFilteredCars(response.data);
    } else {
      setFilteredCars([]);
    }
  };

  const handleSelectCar = async (car) => {
    setSelectedCar(car);
    const response = await axios.get(`https://carregisteration.onrender.com/api/car/${car}`);
    setRepairItems(response.data);
    setFilteredCars([]);
  };

  return (
    <div className="container">
      <img src="/images/car.png" alt="Car" className="car-image" />
      <h1>Car Repair Search</h1>
      <Link to="/add">
        <button className="add-button">Add/Edit Car</button>
      </Link>
      <SearchBar onSearch={handleSearch} />
      <ul>
        {filteredCars.map((car) => (
          <li key={car} onClick={() => handleSelectCar(car)}>
            {car}
          </li>
        ))}
      </ul>
      {selectedCar && (
        <div className="selected-car">
          <h2>Repair items for {selectedCar}</h2>
          <ul>
            {repairItems.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Home;
