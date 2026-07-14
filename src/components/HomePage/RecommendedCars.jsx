import React, { useEffect, useState } from "react";
import "./RecommendedCars.scss";
import { IoCarSportOutline, IoFlashOutline } from "react-icons/io5";

const RecommendedCars = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/recommendations/" + userId)
      .then((res) => res.json())
      .then((data) => setCars(data));
  }, [userId]);

  return (
    <section className="recommended-section">
      <div className="section-header">
        <h2>PRILAGOĐENO TVOM STILU</h2>
        <p>AI je odabrao najbolje podudarnosti baš za tebe</p>
      </div>

      <div className="cars-grid">
        {cars.map((car) => (
          <div key={car.id} className="car-card">
            <div className="image-wrapper">
              <img src={car.image} alt={car.name} />
              <div className="match-overlay">
                <span className="match-score">{car.match}%</span>
              </div>
            </div>

            <div className="card-body">
              <h3>{car.name}</h3>
              <p>{car.subtitle}</p>
            </div>

            <div className="card-footer">
              <button className="details-btn">
                DETALJI
                <IoCarSportOutline />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecommendedCars;
