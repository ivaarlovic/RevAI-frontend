import React from "react";
import "./RecommendedCars.scss";

const RecommendedCars = () => {
  return (
    <section className="recommended-section">
      <h2>PRILAGOĐENO TVOM STILU</h2>
      <div className="cars-grid">
        <div className="car-card">
          <img src="/preuzmi1.png" alt="Golf Mk4" />
          <h3>VOLKSWAGEN Golf Mk4</h3>
          <p>Sport Pack</p>
          <div className="card-footer">
            <button className="details-btn">DETALJI</button>
            <span className="match-score">98%</span>
          </div>
        </div>
        <div className="car-card">
          <img src="/preuzmi1.png" alt="Golf Mk4" />
          <h3>VOLKSWAGEN Golf Mk4</h3>
          <p>Sport Pack</p>
          <div className="card-footer">
            <button className="details-btn">DETALJI</button>
            <span className="match-score">98%</span>
          </div>
        </div>
        <div className="car-card">
          <img src="/preuzmi1.png" alt="Golf Mk4" />
          <h3>VOLKSWAGEN Golf Mk4</h3>
          <p>Sport Pack</p>
          <div className="card-footer">
            <button className="details-btn">DETALJI</button>
            <span className="match-score">98%</span>
          </div>
        </div>
        <div className="car-card">
          <img src="/preuzmi1.png" alt="Golf Mk4" />
          <h3>VOLKSWAGEN Golf Mk4</h3>
          <p>Sport Pack</p>
          <div className="card-footer">
            <button className="details-btn">DETALJI</button>
            <span className="match-score">98%</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecommendedCars;
