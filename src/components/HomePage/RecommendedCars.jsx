import React, { useEffect, useState } from "react";
import "./RecommendedCars.scss";
import { IoCarSportOutline, IoFlashOutline } from "react-icons/io5";
import { userStore } from "../../stores/UserStore";

const RecommendedCars = () => {
  const [cars, setCars] = useState([]);

  const userId = userStore.user?.userId;

  useEffect(() => {
    console.log("Dohvaćam za userid:", userId);
    if (userId) {
      fetch(`http://localhost:8000/recommendations/${userId}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("Podacistigli", data);
          setCars(data);
        })
        .catch((err) =>
          console.error("Greska pri dohvaćanju preporuka: ", err),
        );
    }
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
