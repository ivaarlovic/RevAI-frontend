import React, { useEffect, useMemo } from "react";
import { observer } from "mobx-react-lite";
import { carStore } from "../stores/CarStore";
import "./../styles/LandingPage.scss";
import { useNavigate } from "react-router-dom";
import { IoCarSportOutline } from "react-icons/io5";
import { RevAIService } from "../services/RevAIService";
import { userStore } from "../stores/UserStore";

const LandingPage = observer(() => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  useEffect(() => {
    carStore.loadCars();
  }, []);

  const randomCars = useMemo(() => {
    return [...carStore.cars].sort(() => Math.random() - 0.5).slice(0, 25);
  }, [carStore.cars]);

  const selectedCount = carStore.selectedCars.length;

  const handleNext = async () => {
    if (!carStore.isSelectionComplete || !userStore.user?.userId) return;

    setIsSaving(true);
    setError("");

    try {
      await RevAIService.savePreferences({
        userId: userStore.user.userId,
        carIds: [...carStore.selectedCars],
      });
      navigate("/home");
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          "Došlo je do greške pri spremanju odabira. Pokušaj ponovno.",
      );
    } finally {
      setIsSaving(false);
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
                : `Odaberi još ${5 - selectedCount} automobila`}
            </span>
          </div>
        </div>

        {carStore.isLoading && (
          <p className="landing-message">Učitavanje automobila...</p>
        )}
        {carStore.error && (
          <p className="landing-message landing-message--error">
            {carStore.error}
          </p>
        )}

        <div className="cars-grid">
          {randomCars.map((car) => {
            const id = getCarId(car);
            const selected = carStore.selectedCars.includes(id);
            return (
              <button
                key={id}
                type="button"
                className={`car-card ${selected ? "selected" : ""}`}
                onClick={() => carStore.toggleSelection(id)}
              >
                <div className="image-container">
                  <img src={getCarImage(car)} alt={getCarName(car)} />
                  {selected && (
                    <div className="selected-overlay">
                      <IoCarSportOutline />
                    </div>
                  )}
                </div>
                <div className="car-info">
                  <h3>{getCarName(car)}</h3>
                </div>
              </button>
            );
          })}
        </div>

        {error && (
          <p className="landing-message landing-message--error">{error}</p>
        )}
        <button
          className={`next-btn ${!carStore.isSelectionComplete ? "disabled" : ""}`}
          disabled={!carStore.isSelectionComplete || isSaving}
          onClick={handleNext}
        >
          {isSaving ? "SPREMANJE..." : "NASTAVI"}
        </button>
      </div>
    </section>
  );
});

export default LandingPage;
