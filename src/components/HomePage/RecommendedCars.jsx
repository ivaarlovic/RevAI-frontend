import React, { useEffect, useState } from "react";
import "./RecommendedCars.scss";
import { IoCarSportOutline } from "react-icons/io5";
import { userStore } from "../../stores/UserStore";

const recommenderApiUrl =
  import.meta.env.VITE_RECOMMENDER_API_URL || "http://localhost:8000";

const RecommendedCars = () => {
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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

        setCars(data);
      } catch (requestError) {
        if (requestError.name !== "AbortError") {
          console.error("Greška pri dohvaćanju preporuka:", requestError);
          setError(requestError.message);
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

      {!isLoading && !error && (
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
      )}
    </section>
  );
};

export default RecommendedCars;
