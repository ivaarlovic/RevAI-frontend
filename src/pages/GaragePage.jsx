import React from "react";
import "./../styles/GaragePage.scss";
import { IoCarSportOutline, IoTrashOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const GaragePage = () => {
  const navigate = useNavigate();

  const favoriteCars = [
    {
      id: 1,
      name: "VOLKSWAGEN Golf Mk4",
      subtitle: "Sport Pack • 2002 • 2.0 GTI",
      image: "/preuzmi1.png",
      match: 98,
    },
    {
      id: 2,
      name: "BMW M3 E46",
      subtitle: "Coupe • 2003 • 3.2L",
      image: "/preuzmi1.png",
      match: 95,
    },
    {
      id: 3,
      name: "AUDI RS4 B7",
      subtitle: "Avant • 2006 • 4.2 V8",
      image: "/preuzmi1.png",
      match: 93,
    },
    {
      id: 4,
      name: "PORSCHE 911 Carrera",
      subtitle: "996 • 2003",
      image: "/preuzmi1.png",
      match: 89,
    },
  ];

  const removeFromGarage = (id) => {
    // Za sada samo alert - kasnije možeš dodati state/logiku
    alert(`Uklonjen auto sa ID: ${id}`);
    // TODO: Dodaj logiku za uklanjanje iz favorites
  };

  return (
    <section className="garage-section">
      <div className="garage-header">
        <div>
          <h1>MOJA GARAŽA</h1>
          <p>{favoriteCars.length} omiljenih automobila</p>
        </div>

        <button className="find-more-btn" onClick={() => navigate("/")}>
          PRONAĐI JOŠ AUTOMOBILA
        </button>
      </div>

      <div className="cars-grid">
        {favoriteCars.map((car) => (
          <div key={car.id} className="car-card">
            <div className="image-container">
              <img src={car.image} alt={car.name} />
              <button
                className="remove-btn"
                onClick={() => removeFromGarage(car.id)}
                title="Ukloni iz garaže"
              >
                <IoTrashOutline />
              </button>
              <div className="match-badge">{car.match}%</div>
            </div>

            <div className="card-content">
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

export default GaragePage;
