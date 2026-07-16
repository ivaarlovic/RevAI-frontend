import React, { useEffect, useMemo, useState } from "react";
import { observer } from "mobx-react-lite";

import { carStore } from "../stores/CarStore";
import { userStore } from "../stores/UserStore";

import "./../styles/RecommendationPage.scss";

const recommenderApiUrl =
  import.meta.env.VITE_RECOMMENDER_API_URL || "http://localhost:8000";

const getUniqueValues = (cars, propertyName) => {
  return [
    ...new Set(
      cars
        .map((car) => car[propertyName])
        .filter((value) => {
          if (value === null || value === undefined) {
            return false;
          }

          const normalizedValue = value.toString().trim();

          return (
            normalizedValue !== "" &&
            normalizedValue.toLowerCase() !== "unknown"
          );
        }),
    ),
  ].sort((first, second) => first.toString().localeCompare(second.toString()));
};

const getCarName = (car) => {
  if (!car) {
    return "";
  }

  const brand = car.brand?.trim() || "";
  let model = car.model?.trim() || "";

  if (brand && model.toLowerCase().startsWith(brand.toLowerCase())) {
    model = model.slice(brand.length).trim();
  }

  return `${brand} ${model}`.trim();
};

const formatPrice = (price) => {
  if (price === null || price === undefined || Number.isNaN(Number(price))) {
    return "Cijena nije dostupna";
  }

  return new Intl.NumberFormat("hr-HR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(Number(price));
};

const RecommendationPage = observer(() => {
  const [currentStep, setCurrentStep] = useState(1);

  const [brand, setBrand] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [bodyType, setBodyType] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minYear, setMinYear] = useState("");

  const [recommendation, setRecommendation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const userId = userStore.user?.userId;

  useEffect(() => {
    if (carStore.cars.length === 0) {
      carStore.loadCars();
    }
  }, []);

  const randomCars = useMemo(() => {
    return [...carStore.cars].sort(() => Math.random() - 0.5).slice(0, 25);
  }, [carStore.cars.length]);

  const brandOptions = useMemo(
    () => getUniqueValues(carStore.cars, "brand"),
    [carStore.cars.length],
  );

  const fuelOptions = useMemo(
    () => getUniqueValues(carStore.cars, "fuelType"),
    [carStore.cars.length],
  );

  const bodyOptions = useMemo(
    () => getUniqueValues(carStore.cars, "bodyType"),
    [carStore.cars.length],
  );

  const isStep1Complete = carStore.likedCars.length === 3;

  const isStep2Complete = Boolean(
    brand || fuelType || bodyType || maxPrice || minYear,
  );

  const handleToggleCar = (carId) => {
    const isAlreadySelected = carStore.likedCars.includes(carId);

    if (!isAlreadySelected && carStore.likedCars.length >= 3) {
      return;
    }

    carStore.toggleLikeCar(carId);
    setRecommendation(null);
    setError("");
  };

  const handleGetRecommendation = async () => {
    if (!userId) {
      setError("Korisnik nije prijavljen.");
      return;
    }

    if (carStore.likedCars.length !== 3) {
      setError("Potrebno je odabrati točno 3 automobila.");
      return;
    }

    if (!isStep2Complete) {
      setError("Potrebno je odabrati barem jedan kriterij.");
      return;
    }

    setIsLoading(true);
    setError("");
    setRecommendation(null);

    try {
      const response = await fetch(
        `${recommenderApiUrl}/guided-recommendation/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            selected_car_ids: [...carStore.likedCars],
            brand: brand || null,
            fuel_type: fuelType || null,
            body_type: bodyType || null,
            max_price: maxPrice ? Number(maxPrice) : null,
            min_year: minYear ? Number(minYear) : null,
            limit: 1,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail || "Preporuku trenutačno nije moguće izračunati.",
        );
      }

      setRecommendation(data.car);
    } catch (requestError) {
      console.error("Greška pri dohvaćanju preporuke:", requestError);

      setError(requestError.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="preference-form-container">
      <div className="form-header">
        <h1 className="form-title">Pronađi idealan automobil</h1>

        <p className="form-subtitle">
          Do personalizirane preporuke u 3 jednostavna koraka
        </p>
      </div>

      {/* KORAK 1 */}
      <div className={`form-step ${currentStep === 1 ? "active" : ""}`}>
        <div className="step-header">
          <div className="step-number">1</div>

          <div className="step-info">
            <h2>Odaberi 3 automobila</h2>
            <p>Odaberi tri automobila koja najviše odgovaraju tvom ukusu</p>
          </div>

          <div className="step-counter">{carStore.likedCars.length} / 3</div>
        </div>

        {carStore.isLoading && <p>Učitavanje automobila...</p>}

        <div className="cars-selection-grid">
          {randomCars.map((car) => {
            const isSelected = carStore.likedCars.includes(car.id);

            return (
              <div
                key={car.id}
                className={`car-selection-item ${isSelected ? "selected" : ""}`}
                onClick={() => handleToggleCar(car.id)}
              >
                <div className="car-item-image">
                  <img
                    src={car.imageUrl || "/preuzmi1.png"}
                    alt={getCarName(car)}
                  />
                </div>

                <div className="car-item-info">
                  <h3>{getCarName(car)}</h3>
                  <p>{car.bodyType || "Nepoznata karoserija"}</p>

                  <span className="car-item-price">
                    {formatPrice(car.price)}
                  </span>
                </div>

                {isSelected && <div className="selected-badge">✓ Odabrano</div>}
              </div>
            );
          })}
        </div>

        {isStep1Complete && (
          <button
            type="button"
            className="next-btn"
            onClick={() => setCurrentStep(2)}
          >
            Nastavi na sljedeći korak →
          </button>
        )}
      </div>

      {/* KORAK 2 */}
      <div className={`form-step ${currentStep === 2 ? "active" : ""}`}>
        <div className="step-header">
          <div className="step-number">2</div>

          <div className="step-info">
            <h2>Odredi željene kriterije</h2>
            <p>Filtriraj ponudu prema svojim potrebama</p>
          </div>
        </div>

        <div className="recommendation-filters">
          <div className="filter-field">
            <label htmlFor="recommendation-brand">Marka</label>

            <select
              id="recommendation-brand"
              value={brand}
              onChange={(event) => setBrand(event.target.value)}
            >
              <option value="">Sve marke</option>

              {brandOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-field">
            <label htmlFor="recommendation-fuel">Vrsta goriva</label>

            <select
              id="recommendation-fuel"
              value={fuelType}
              onChange={(event) => setFuelType(event.target.value)}
            >
              <option value="">Sve vrste goriva</option>

              {fuelOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-field">
            <label htmlFor="recommendation-body">Vrsta karoserije</label>

            <select
              id="recommendation-body"
              value={bodyType}
              onChange={(event) => setBodyType(event.target.value)}
            >
              <option value="">Sve vrste karoserije</option>

              {bodyOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-field">
            <label htmlFor="recommendation-price">Najviša cijena</label>

            <input
              id="recommendation-price"
              type="number"
              min="0"
              step="1000"
              value={maxPrice}
              onChange={(event) => setMaxPrice(event.target.value)}
              placeholder="Npr. 50000"
            />
          </div>

          <div className="filter-field">
            <label htmlFor="recommendation-year">Minimalno godište</label>

            <input
              id="recommendation-year"
              type="number"
              min="1900"
              max="2100"
              value={minYear}
              onChange={(event) => setMinYear(event.target.value)}
              placeholder="Npr. 2020"
            />
          </div>
        </div>

        <div className="step-actions">
          <button
            type="button"
            className="back-btn"
            onClick={() => setCurrentStep(1)}
          >
            ← Natrag
          </button>

          {isStep2Complete && (
            <button
              type="button"
              className="next-btn"
              onClick={() => {
                setCurrentStep(3);
                setRecommendation(null);
                setError("");
              }}
            >
              Pregled odabira →
            </button>
          )}
        </div>
      </div>

      {/* KORAK 3 */}
      <div className={`form-step ${currentStep === 3 ? "active" : ""}`}>
        <div className="step-header">
          <div className="step-number">3</div>

          <div className="step-info">
            <h2>Pregled odabira</h2>
            <p>Provjeri podatke i pokreni algoritam preporuke</p>
          </div>
        </div>

        <div className="review-section">
          <div className="review-subsection">
            <h3>Odabrani automobili</h3>

            <div className="review-cars-grid">
              {carStore.getLikedObjects().map((car) => (
                <div key={car.id} className="review-card">
                  <img
                    src={car.imageUrl || "/preuzmi1.png"}
                    alt={getCarName(car)}
                    className="review-img"
                  />

                  <div className="review-text">
                    <p className="car-title">{getCarName(car)}</p>

                    <p className="car-sub">
                      {car.bodyType || "Nepoznata karoserija"}
                    </p>

                    <p className="car-price">{formatPrice(car.price)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="selected-filters-review">
            <h3>Odabrani kriteriji</h3>

            <div className="review-box">
              <p>
                <strong>Marka:</strong> {brand || "Sve marke"}
              </p>

              <p>
                <strong>Gorivo:</strong> {fuelType || "Sve vrste"}
              </p>

              <p>
                <strong>Karoserija:</strong> {bodyType || "Sve vrste"}
              </p>

              <p>
                <strong>Najviša cijena:</strong>{" "}
                {maxPrice ? formatPrice(maxPrice) : "Nije određena"}
              </p>

              <p>
                <strong>Minimalno godište:</strong> {minYear || "Nije određeno"}
              </p>
            </div>
          </div>
        </div>

        {error && <p className="recommendation-error">{error}</p>}

        {recommendation && (
          <div className="final-recommendation">
            <div className="recommendation-image-wrapper">
              <img
                src={
                  recommendation.image ||
                  recommendation.imageUrl ||
                  "/preuzmi1.png"
                }
                alt={getCarName(recommendation)}
              />

              <span className="recommendation-match">
                {recommendation.match}%
              </span>
            </div>

            <div className="recommendation-info">
              <span className="recommendation-label">NAJBOLJA PREPORUKA</span>

              <h2>{getCarName(recommendation)}</h2>

              <p>
                {recommendation.year} · {recommendation.bodyType}
              </p>

              <div className="recommendation-details">
                <span>{recommendation.fuelType}</span>

                <span>{formatPrice(recommendation.price)}</span>

                {recommendation.horsePower > 0 && (
                  <span>{Math.round(recommendation.horsePower)} KS</span>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="step-actions">
          <button
            type="button"
            className="back-btn"
            onClick={() => setCurrentStep(2)}
            disabled={isLoading}
          >
            ← Natrag
          </button>

          <button
            type="button"
            className="submit-btn"
            onClick={handleGetRecommendation}
            disabled={isLoading}
          >
            {isLoading ? "ALGORITAM ANALIZIRA..." : "PRONAĐI MOJ AUTOMOBIL 🎯"}
          </button>
        </div>
      </div>
    </div>
  );
});

export default RecommendationPage;
