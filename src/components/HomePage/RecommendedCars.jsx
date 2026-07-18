import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { IoCarSportOutline, IoHeart, IoHeartOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { garageStore } from "../../stores/GarageStore";
import { userStore } from "../../stores/UserStore";
import {
  getCarId,
  getCarImage,
  getCarName,
  getCarSubtitle,
} from "../../utils/carUtils";
import "./RecommendedCars.scss";

const recommenderApiUrl =
  import.meta.env.VITE_RECOMMENDER_API_URL || "http://localhost:8000";

const RecommendedCars = observer(() => {
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const userId = userStore.user?.userId;

  useEffect(() => {
    if (!userId) {
      setIsLoading(false);
      return;
    }

    const controller = new AbortController();

    const loadRecommendations = async () => {
      setIsLoading(true);
      setError("");

      try {
        const response = await fetch(
          `${recommenderApiUrl}/recommendations/${userId}?limit=4`,
          { signal: controller.signal },
        );

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.detail || "Preporuke trenutno nisu dostupne.");
        }

        setCars(Array.isArray(data) ? data : data.cars || []);
      } catch (requestError) {
        if (requestError.name !== "AbortError") {
          setError(requestError.message || "Preporuke trenutno nisu dostupne.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadRecommendations();
    return () => controller.abort();
  }, [userId]);

  return (
    <section className="recommended-section">
      <div className="section-header">
        <h2>PRILAGOĐENO TVOM STILU</h2>
        <p>AI je odabrao najbolje podudarnosti baš za tebe</p>
      </div>

      {isLoading && <p>Izračunavam personalizirane preporuke...</p>}
      {error && <p className="recommendation-error">{error}</p>}
      {!isLoading && !error && cars.length === 0 && (
        <p className="recommendation-status">
          Još nema preporuka. Ponovno odaberi preferencije ili pokreni traženje
          automobila.
        </p>
      )}

      {!isLoading && !error && cars.length > 0 && (
        <div className="cars-grid">
          {cars.map((car) => {
            const id = getCarId(car);
            const isSaved = garageStore.has(id);

            return (
              <article key={id} className="car-card">
                <div className="image-wrapper">
                  <img src={getCarImage(car)} alt={getCarName(car)} />
                  {car.match !== null && car.match !== undefined && (
                    <div className="match-overlay">
                      <span className="match-score">{car.match}%</span>
                    </div>
                  )}
                  <button
                    type="button"
                    className={`recommended-heart ${isSaved ? "is-saved" : ""}`}
                    onClick={() => garageStore.toggle(car)}
                    aria-label={isSaved ? "Ukloni iz garaže" : "Dodaj u garažu"}
                  >
                    {isSaved ? <IoHeart /> : <IoHeartOutline />}
                  </button>
                </div>

                <div className="card-body">
                  <h3>{getCarName(car)}</h3>
                  <p>{getCarSubtitle(car)}</p>
                </div>

                <div className="card-footer">
                  <button
                    type="button"
                    className="details-btn"
                    onClick={() => navigate(`/cars/${id}`)}
                  >
                    DETALJI <IoCarSportOutline />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
});

export default RecommendedCars;
