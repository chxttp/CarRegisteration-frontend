// src/App.js
import React, { useState } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import "./App.css";
import car from "../src/images/car.png";

const App = () => {
  const [filteredCars, setFilteredCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [repairItems, setRepairItems] = useState([]);

  const handleSearch = async (query) => {
    if (query) {
      const response = await axios.get(
        `https://carregisteration.onrender.com/api/search?query=${query}`
      );
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
      <img src={car} alt="Car" className="car-image" />
      <h1>ค้นหารายการซ่อมรถ</h1>
      <div className="search-container">
        <SearchBar onSearch={handleSearch} />
      </div>

      <ul>
        {filteredCars.map((car) => (
          <li key={car} onClick={() => handleSelectCar(car)}>
            {car}
          </li>
        ))}
      </ul>
      {selectedCar && (
        <div className="selected-car">
          <h2>รายการซ่อมของ {selectedCar}</h2>
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

export default App;
