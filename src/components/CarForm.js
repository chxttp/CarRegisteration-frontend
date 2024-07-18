import React, { useState, useEffect } from 'react';
import './CarForm.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CarForm = () => {
  const navigate = useNavigate();
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [repairItems, setRepairItems] = useState('');
  const [cars, setCars] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    // Fetch all cars when the component mounts
    const fetchCars = async () => {
      try {
        const response = await axios.get('https://carregisteration.onrender.com/api/cars');
        setCars(response.data);
      } catch (error) {
        console.error('Error fetching cars:', error);
        alert('Error fetching cars');
      }
    };
    fetchCars();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await axios.put(`https://carregisteration.onrender.com/api/car/${registrationNumber}`, {
          repairItems: repairItems.split(',').map(item => item.trim())
        });
        alert('Car updated successfully');
      } else {
        await axios.post('https://carregisteration.onrender.com/api/car', {
          registrationNumber,
          repairItems: repairItems.split(',').map(item => item.trim())
        });
        alert('Car added successfully');
      }
      navigate('/home');
    } catch (error) {
      console.error('Error saving car data:', error);
      alert('Error saving car data');
    }
  };

  const handleEdit = (car) => {
    setRegistrationNumber(car.registrationNumber);
    setRepairItems(car.repairItems.join(', '));
    setIsEditMode(true);
  };

  const handleDelete = async (car) => {
    if (window.confirm(`Are you sure you want to delete the car with registration number ${car.registrationNumber}?`)) {
      try {
        await axios.delete(`https://carregisteration.onrender.com/api/car/${car.registrationNumber}`);
        alert('Car deleted successfully');
        setCars(cars.filter(c => c.registrationNumber !== car.registrationNumber));
      } catch (error) {
        console.error('Error deleting car:', error);
        alert('Error deleting car');
      }
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div>
          <label>กรอกหมายเลขทะเบียนรถ:</label>
          <input
            type="text"
            value={registrationNumber}
            onChange={(e) => setRegistrationNumber(e.target.value)}
            required
            disabled={isEditMode} // Disable the input field if in edit mode
          />
        </div>
        <div>
          <label>ใส่รายการซ่อม (เว้นวรรคด้วยเครื่องหมาย ','):</label>
          <input
            type="text"
            value={repairItems}
            onChange={(e) => setRepairItems(e.target.value)}
            required
          />
        </div>
        <button type="submit">{isEditMode ? 'Update Car' : 'Add Car'}</button>
        {isEditMode && (
          <button type="button" onClick={() => {
            setIsEditMode(false);
            setRegistrationNumber('');
            setRepairItems('');
          }}>Cancel Edit</button>
        )}
      </form>
      <h2>รายการ รถทั้งหมด</h2>
      <table>
        <thead>
          <tr>
            <th>ทะเบียนรถ</th>
            <th>รายการซ่อม</th>
            <th>เลือก</th>
          </tr>
        </thead>
        <tbody>
          {cars.map(car => (
            <tr key={car.registrationNumber}>
              <td>{car.registrationNumber}</td>
              <td>{car.repairItems.join(', ')}</td>
              <td>
                <button onClick={() => handleEdit(car)} className='edit'>Edit</button>
                <button onClick={() => handleDelete(car)} className='delete'>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CarForm;
