import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { IoCarSportOutline } from "react-icons/io5";

import { carStore } from "../../stores/CarStore";
import { userStore } from "../../stores/UserStore";

import "./SearchSection.scss";

const getUniqueOptions = (cars, propertyName) => {
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

const getCarDisplayName = (car) => {
  if (!car) {
    return "";
  }

  const brand = car.brand?.trim() || "";
  let model = car.model?.trim() || "";

  // Uklanja ponavljanje poput "Audi AUDI R8".
  if (brand && model.toLowerCase().startsWith(brand.toLowerCase())) {
    model = model.slice(brand.length).trim();
  }

  return `${brand} ${model}`.trim();
};

const SearchSection = observer(() => {
  const [brand, setBrand] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [bodyType, setBodyType] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minYear, setMinYear] = useState("");

  const [result, setResult] = useState(null);
  const [candidateCount, setCandidateCount] = useState(0);
  const [isSearching, setIsSearching] = useState(false);
  const [message, setMessage] = useState(
    "Odaberi kriterije i rezultat će se prikazati ovdje.",
  );

  const userId = userStore.user?.userId;

  useEffect(() => {
    if (carStore.cars.length === 0) {
      carStore.loadCars();
    }
  }, []);

  const brandOptions = getUniqueOptions(carStore.cars, "brand");

  const fuelOptions = getUniqueOptions(carStore.cars, "fuelType");

  const bodyOptions = getUniqueOptions(carStore.cars, "bodyType");

  const handleSearch = async () => {
    if (!userId) {
      setResult(null);
      setMessage("Korisnik nije prijavljen.");
      return;
    }

    const hasAtLeastOneFilter =
      brand || fuelType || bodyType || maxPrice || minYear;

    if (!hasAtLeastOneFilter) {
      setResult(null);
      setMessage("Odaberi barem jedan kriterij pretraživanja.");
      return;
    }

    setIsSearching(true);
    setResult(null);
    setCandidateCount(0);
    setMessage("Sustav analizira dostupne automobile...");

    try {
      const parameters = new URLSearchParams();

      if (brand) {
        parameters.append("brand", brand);
      }

      if (fuelType) {
        parameters.append("fuel_type", fuelType);
      }

      if (bodyType) {
        parameters.append("body_type", bodyType);
      }

      if (maxPrice) {
        parameters.append("max_price", maxPrice);
      }

      if (minYear) {
        parameters.append("min_year", minYear);
      }

      const baseUrl =
        import.meta.env.VITE_RECOMMENDER_API_URL || "http://localhost:8000";

      const response = await fetch(
        `${baseUrl}/search-best/${userId}?${parameters.toString()}`,
        {
          method: "GET",
          cache: "no-store",
        },
      );

      const data = await response.json();

      if (!response.ok) {
        const errorMessage =
          typeof data.detail === "string"
            ? data.detail
            : "Pretraživanje nije uspjelo.";

        throw new Error(errorMessage);
      }

      setResult(data.car);
      setCandidateCount(data.candidateCount);
      setMessage("");
    } catch (error) {
      console.error("Greška pri pretraživanju automobila:", error);

      setResult(null);
      setCandidateCount(0);
      setMessage(error.message || "Došlo je do pogreške pri pretraživanju.");
    } finally {
      setIsSearching(false);
    }
  };

  const handleReset = () => {
    setBrand("");
    setFuelType("");
    setBodyType("");
    setMaxPrice("");
    setMinYear("");

    setResult(null);
    setCandidateCount(0);
    setMessage("Odaberi kriterije i rezultat će se prikazati ovdje.");
  };

  return (
    <section className="search-section">
      <div className="container">
        <div className="panel search-box">
          <h1>
            PRONAĐI AUTOMOBIL
            <br />
            KOJI ODGOVARA TVOM STILU
          </h1>

          <p>
            Zadaj željene kriterije, a sustav će među pronađenim automobilima
            odabrati najbolju podudarnost za tebe.
          </p>

          <div className="filters-grid">
            <div className="filter-field">
              <label htmlFor="search-brand">Marka</label>

              <select
                id="search-brand"
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
              <label htmlFor="search-fuel">Vrsta goriva</label>

              <select
                id="search-fuel"
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

            <div className="filter-field filter-field--wide">
              <label htmlFor="search-body">Vrsta karoserije</label>

              <select
                id="search-body"
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
              <label htmlFor="search-price">Najviša cijena</label>

              <input
                id="search-price"
                type="number"
                min="0"
                step="1000"
                value={maxPrice}
                onChange={(event) => setMaxPrice(event.target.value)}
                placeholder="Npr. 50000"
              />
            </div>

            <div className="filter-field">
              <label htmlFor="search-year">Minimalno godište</label>

              <input
                id="search-year"
                type="number"
                min="1900"
                max="2100"
                value={minYear}
                onChange={(event) => setMinYear(event.target.value)}
                placeholder="Npr. 2020"
              />
            </div>
          </div>

          <div className="search-actions">
            <button
              type="button"
              className="search-btn"
              onClick={handleSearch}
              disabled={isSearching || carStore.isLoading}
            >
              {isSearching ? "SUSTAV ANALIZIRA..." : "PRONAĐI NAJBOLJI"}
            </button>

            <button
              type="button"
              className="reset-btn"
              onClick={handleReset}
              disabled={isSearching}
            >
              PONIŠTI
            </button>
          </div>
        </div>

        <div className="panel ai-status">
          {result ? (
            <div className="search-result">
              <div className="result-image-wrapper">
                <img
                  src={result.image || result.imageUrl || "/preuzmi1.png"}
                  alt={getCarDisplayName(result)}
                  className="result-image"
                />

                <span className="result-match">{result.match}%</span>
              </div>

              <h3>{getCarDisplayName(result)}</h3>

              <p className="result-subtitle">
                {result.year} · {result.bodyType || "Nepoznata karoserija"}
              </p>

              <div className="result-details">
                <span>{result.fuelType || "Nepoznato gorivo"}</span>

                <span>{formatPrice(result.price)}</span>

                {result.horsePower > 0 && (
                  <span>{Math.round(result.horsePower)} KS</span>
                )}
              </div>

              <p className="candidate-count">
                Najbolja podudarnost među <strong>{candidateCount}</strong>{" "}
                pronađenih automobila
              </p>
            </div>
          ) : (
            <div className="empty-result">
              <IoCarSportOutline className="car-icon" />

              <p>{message}</p>
            </div>
          )}

          <div className="status">
            AI ENGINE: ACTIVE
            <span className="tocka">●</span>
          </div>
        </div>
      </div>
    </section>
  );
});

export default SearchSection;
