import React from "react";
import "./RecommendedCars.scss";
import { IoCarSportOutline, IoFlashOutline } from "react-icons/io5";

const RecommendedCars = () => {
  const cars = [
    {
      id: 1,
      name: "VOLKSWAGEN Golf Mk4",
      subtitle: "Sport Pack • 2002",
      image: "/preuzmi1.png",
      match: 98,
    },
    {
      id: 2,
      name: "BMW M3 E46",
      subtitle: "Coupe • 2003",
      image: "/preuzmi1.png",
      match: 95,
    },
    {
      id: 3,
      name: "AUDI RS4 B7",
      subtitle: "Avant • 2006",
      image: "/preuzmi1.png",
      match: 93,
    },
    {
      id: 4,
      name: "PORSCHE 911 Carrera",
      subtitle: "996 • 2003",
      image: "/preuzmi1.png",
      match: 91,
    },
  ];

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
