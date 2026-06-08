import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { carStore } from "../stores/CarStore";
import "./../styles/LandingPage.scss";
import { useNavigate } from "react-router-dom";

const LandingPage = observer(() => {
  useEffect(() => {
    carStore.loadCars();
  }, []);

  const navigate = useNavigate();
  const handleNext = () => {
    if (carStore.isSelectionComplete) {
      navigate("/home");
    }
  };

  return (
    <div className="landing-container">
      <h1>
        ODABERI 5 AUTOMOBILA KOJI TE ODUŠEVLJAVAJU I DOPUSTI DA TE UPOZNAMO!
      </h1>
      <div className="cars-grid">
        {carStore.cars.map((car) => (
          <div
            key={car.id}
            className={`car-card ${carStore.selectedCars.includes(car.id) ? "selected" : ""}`}
            onClick={() => carStore.toggleSelection(car.id)}
          >
            <img src={car.imageUrl} alt={car.model} />
            <p>
              {car.brand} - {car.model}
            </p>
          </div>
        ))}
      </div>
      <button
        className={`next-btn ${!carStore.isSelectionComplete ? "disabled" : ""}`}
        disabled={!carStore.isSelectionComplete}
        onClick={() => handleNext()}
      >
        NASTAVI
      </button>
    </div>
  );
});

export default LandingPage;
