import React, { useEffect, useMemo } from "react";
import { observer } from "mobx-react-lite";
import { carStore } from "../stores/CarStore";
import "./../styles/LandingPage.scss";
import { useNavigate } from "react-router-dom";
import { IoCarSportOutline } from "react-icons/io5";
import { RevAIService } from "../services/RevAIService";
import { userStore } from "../stores/UserStore";

const LandingPage = observer(() => {
  useEffect(() => {
    carStore.loadCars();
  }, []);

  const navigate = useNavigate();

  const randomCars = useMemo(() => {
    return [...carStore.cars].sort(() => Math.random() - 0.5).slice(0, 25);
  }, [carStore.cars]);

  const selectedCount = carStore.selectedCars.length;

  const handleNext = async () => {
    if (carStore.isSelectionComplete) {
      console.log("Userid", userStore.user);
      try {
        await RevAIService.savePreferences({
          userId: userStore.user.userId,
          carIds: carStore.selectedCars,
        });

        navigate("/home");
      } catch (error) {
        console.error("Greška pri spremanju preferencija:", error);
        alert("Došlo je do greške spremanja odabira, pokušaj ponovno.");
      }
    }
  };

  return (
    <section className="landing-section">
      <div className="landing-container">
        <div className="header">
          <h1>ODABERI 5 AUTOMOBILA KOJI TE ODUŠEVLJAVAJU</h1>
          <p className="subtitle">
            Dopusti da te upoznamo — naš AI će ti na temelju odabira predložiti
            savršen auto
          </p>

          <div className="selection-info">
            <span className="count">
              {selectedCount} <span className="total">/ 5</span>
            </span>
            <span className="status">
              {selectedCount === 5
                ? "Spremno za nastavak!"
                : "Odaberi još automobila"}
            </span>
          </div>
        </div>

        <div className="cars-grid">
          {randomCars.map((car) => (
            <div
              key={car.id}
              className={`car-card ${carStore.selectedCars.includes(car.id) ? "selected" : ""}`}
              onClick={() => carStore.toggleSelection(car.id)}
            >
              <div className="image-container">
                <img src={car.imageUrl} alt={car.model} />
                {carStore.selectedCars.includes(car.id) && (
                  <div className="selected-overlay">
                    <IoCarSportOutline />
                  </div>
                )}
              </div>
              <div className="car-info">
                <h3>
                  {car.brand} {car.model}
                </h3>
              </div>
            </div>
          ))}
        </div>

        <button
          className={`next-btn ${!carStore.isSelectionComplete ? "disabled" : ""}`}
          disabled={!carStore.isSelectionComplete}
          onClick={handleNext}
        >
          NASTAVI
        </button>
      </div>
    </section>
  );
});

export default LandingPage;
