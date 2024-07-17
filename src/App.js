// src/App.js
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./screens/Home";
import CarForm from "./components/CarForm";
import "./App.css";



const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/add" element={<CarForm />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
