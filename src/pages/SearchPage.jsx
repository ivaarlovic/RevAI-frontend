import { observer } from "mobx-react-lite";
import { useEffect, useMemo, useState } from "react";
import { IoHeart, IoHeartOutline, IoSearchOutline } from "react-icons/io5";
import { useNavigate, useSearchParams } from "react-router-dom";
import { carStore } from "../stores/CarStore";
import { garageStore } from "../stores/GarageStore";
import {
  formatPrice,
  getCarBody,
  getCarBrand,
  getCarFuel,
  getCarId,
  getCarImage,
  getCarMatch,
  getCarModel,
  getCarName,
  getCarPrice,
  getCarSubtitle,
  getCarYear,
  getUniqueOptions,
  matchesCategory,
} from "../utils/carUtils";
import "../styles/SearchPage.scss";

const PAGE_SIZE = 20;

const categoryLabels = {
  electric: "Električni",
  sport: "Sportski",
  city: "Gradski",
  suv: "Džipovi / SUV",
};

const SearchPage = observer(() => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "";

  const [searchTerm, setSearchTerm] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [bodyType, setBodyType] = useState("");
  const [category, setCategory] = useState(initialCategory);
  const [yearFrom, setYearFrom] = useState("");
  const [yearTo, setYearTo] = useState("");
  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");
  const [sortBy, setSortBy] = useState("name-asc");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    carStore.loadCars();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [
    searchTerm,
    brand,
    model,
    fuelType,
    bodyType,
    category,
    yearFrom,
    yearTo,
    priceFrom,
    priceTo,
    sortBy,
  ]);

  const cars = carStore.cars;
  const brandOptions = getUniqueOptions(cars, getCarBrand);
  const modelOptions = getUniqueOptions(
    brand ? cars.filter((car) => getCarBrand(car) === brand) : cars,
    getCarModel,
  );
  const fuelOptions = getUniqueOptions(cars, getCarFuel);
  const bodyOptions = getUniqueOptions(cars, getCarBody);

  const filteredCars = useMemo(() => {
    const normalizedTerm = searchTerm.trim().toLowerCase();
    const minYear = Number(yearFrom) || 0;
    const maxYear = Number(yearTo) || Number.POSITIVE_INFINITY;
    const minPrice = Number(priceFrom) || 0;
    const maxPrice = Number(priceTo) || Number.POSITIVE_INFINITY;

    const result = cars.filter((car) => {
      const name = getCarName(car).toLowerCase();
      const carYear = getCarYear(car) || 0;
      const carPrice = getCarPrice(car) || 0;

      return (
        (!normalizedTerm || name.includes(normalizedTerm)) &&
        (!brand || getCarBrand(car) === brand) &&
        (!model || getCarModel(car) === model) &&
        (!fuelType || getCarFuel(car) === fuelType) &&
        (!bodyType || getCarBody(car) === bodyType) &&
        matchesCategory(car, category) &&
        carYear >= minYear &&
        carYear <= maxYear &&
        carPrice >= minPrice &&
        carPrice <= maxPrice
      );
    });

    return result.sort((first, second) => {
      switch (sortBy) {
        case "price-asc":
          return (
            (getCarPrice(first) || Infinity) - (getCarPrice(second) || Infinity)
          );
        case "price-desc":
          return (getCarPrice(second) || 0) - (getCarPrice(first) || 0);
        case "year-desc":
          return (getCarYear(second) || 0) - (getCarYear(first) || 0);
        case "year-asc":
          return (
            (getCarYear(first) || Infinity) - (getCarYear(second) || Infinity)
          );
        case "match-desc":
          return (getCarMatch(second) || 0) - (getCarMatch(first) || 0);
        case "name-desc":
          return getCarName(second).localeCompare(getCarName(first), "hr");
        default:
          return getCarName(first).localeCompare(getCarName(second), "hr");
      }
    });
  }, [
    cars,
    searchTerm,
    brand,
    model,
    fuelType,
    bodyType,
    category,
    yearFrom,
    yearTo,
    priceFrom,
    priceTo,
    sortBy,
  ]);

  const totalPages = Math.max(1, Math.ceil(filteredCars.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const pageStart = (safePage - 1) * PAGE_SIZE;
  const visibleCars = filteredCars.slice(pageStart, pageStart + PAGE_SIZE);

  const handleCategoryChange = (value) => {
    setCategory(value);
    if (value) {
      setSearchParams({ category: value });
    } else {
      setSearchParams({});
    }
  };

  const resetFilters = () => {
    setSearchTerm("");
    setBrand("");
    setModel("");
    setFuelType("");
    setBodyType("");
    setCategory("");
    setYearFrom("");
    setYearTo("");
    setPriceFrom("");
    setPriceTo("");
    setSortBy("name-asc");
    setSearchParams({});
  };

  return (
    <main className="search-page">
      <header className="search-page__header">
        <h1>Pronađi svoj savršeni auto</h1>
        <p>
          Filtriraj cijelu bazu prema marki, modelu, gorivu, karoseriji, cijeni
          i godištu.
        </p>
      </header>

      <div className="search-layout">
        <aside className="search-filters">
          <div className="search-filters__heading">
            <h2>Filteri</h2>
            <button type="button" onClick={resetFilters}>
              Poništi sve
            </button>
          </div>

          <label>
            Marka
            <select
              value={brand}
              onChange={(event) => {
                setBrand(event.target.value);
                setModel("");
              }}
            >
              <option value="">Sve marke</option>
              {brandOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>

          <label>
            Model
            <select
              value={model}
              onChange={(event) => setModel(event.target.value)}
            >
              <option value="">Svi modeli</option>
              {modelOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>

          <label>
            Gorivo
            <select
              value={fuelType}
              onChange={(event) => setFuelType(event.target.value)}
            >
              <option value="">Sve vrste</option>
              {fuelOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>

          <label>
            Karoserija
            <select
              value={bodyType}
              onChange={(event) => setBodyType(event.target.value)}
            >
              <option value="">Sve karoserije</option>
              {bodyOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>

          <label>
            Top kategorija
            <select
              value={category}
              onChange={(event) => handleCategoryChange(event.target.value)}
            >
              <option value="">Sve kategorije</option>
              {Object.entries(categoryLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>

          <fieldset>
            <legend>Godište</legend>
            <div className="range-fields">
              <input
                type="number"
                min="1900"
                max="2100"
                placeholder="Od"
                value={yearFrom}
                onChange={(event) => setYearFrom(event.target.value)}
              />
              <input
                type="number"
                min="1900"
                max="2100"
                placeholder="Do"
                value={yearTo}
                onChange={(event) => setYearTo(event.target.value)}
              />
            </div>
          </fieldset>

          <fieldset>
            <legend>Cijena (€)</legend>
            <div className="range-fields">
              <input
                type="number"
                min="0"
                step="1000"
                placeholder="Od"
                value={priceFrom}
                onChange={(event) => setPriceFrom(event.target.value)}
              />
              <input
                type="number"
                min="0"
                step="1000"
                placeholder="Do"
                value={priceTo}
                onChange={(event) => setPriceTo(event.target.value)}
              />
            </div>
          </fieldset>
        </aside>

        <section className="search-results">
          <div className="search-toolbar">
            <label className="search-input">
              <IoSearchOutline />
              <input
                type="search"
                placeholder="Pretraži po marki ili modelu..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </label>

            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              aria-label="Sortiranje"
            >
              <option value="name-asc">Naziv: A–Ž</option>
              <option value="name-desc">Naziv: Ž–A</option>
              <option value="price-asc">Cijena: niža–viša</option>
              <option value="price-desc">Cijena: viša–niža</option>
              <option value="year-desc">Godište: novije–starije</option>
              <option value="year-asc">Godište: starije–novije</option>
              <option value="match-desc">Najveći AI match</option>
            </select>
          </div>

          {carStore.isLoading && (
            <p className="search-state">Učitavanje automobila...</p>
          )}
          {carStore.error && (
            <p className="search-state search-state--error">{carStore.error}</p>
          )}

          {!carStore.isLoading && !carStore.error && (
            <>
              <div className="results-summary">
                <p>
                  Pronađeno: <strong>{filteredCars.length}</strong> automobila
                </p>
                {filteredCars.length > 0 && (
                  <p>
                    Prikaz {pageStart + 1}–
                    {Math.min(pageStart + PAGE_SIZE, filteredCars.length)} od{" "}
                    {filteredCars.length}
                  </p>
                )}
              </div>

              {visibleCars.length === 0 ? (
                <div className="search-empty">
                  <IoSearchOutline />
                  <h2>Nema rezultata</h2>
                  <p>Promijeni ili poništi dio filtera.</p>
                  <button type="button" onClick={resetFilters}>
                    Poništi filtere
                  </button>
                </div>
              ) : (
                <div className="search-cars-grid">
                  {visibleCars.map((car) => {
                    const id = getCarId(car);
                    const isSaved = garageStore.has(id);
                    const match = getCarMatch(car);

                    return (
                      <article key={id} className="search-car-card">
                        <div className="search-car-card__image">
                          <img src={getCarImage(car)} alt={getCarName(car)} />
                          {match !== null && (
                            <span className="search-car-card__match">
                              {match}%
                            </span>
                          )}
                          <button
                            type="button"
                            className={`search-car-card__heart ${isSaved ? "is-saved" : ""}`}
                            onClick={() => garageStore.toggle(car)}
                            aria-label={
                              isSaved ? "Ukloni iz garaže" : "Dodaj u garažu"
                            }
                          >
                            {isSaved ? <IoHeart /> : <IoHeartOutline />}
                          </button>
                        </div>

                        <div className="search-car-card__body">
                          <h3>{getCarName(car)}</h3>
                          <p>{getCarSubtitle(car) || "Podaci nisu dostupni"}</p>
                          <strong>{formatPrice(getCarPrice(car))}</strong>
                        </div>

                        <button
                          type="button"
                          className="search-car-card__details"
                          onClick={() => navigate(`/cars/${id}`)}
                        >
                          DETALJI
                        </button>
                      </article>
                    );
                  })}
                </div>
              )}

              {totalPages > 1 && (
                <nav className="pagination" aria-label="Stranice rezultata">
                  <button
                    type="button"
                    disabled={safePage === 1}
                    onClick={() =>
                      setCurrentPage((page) => Math.max(1, page - 1))
                    }
                  >
                    Prethodna
                  </button>
                  {Array.from({ length: totalPages }, (_, index) => index + 1)
                    .filter(
                      (page) =>
                        page === 1 ||
                        page === totalPages ||
                        Math.abs(page - safePage) <= 2,
                    )
                    .map((page, index, pages) => (
                      <span key={page} className="pagination__item">
                        {index > 0 && page - pages[index - 1] > 1 && (
                          <span className="pagination__dots">…</span>
                        )}
                        <button
                          type="button"
                          className={page === safePage ? "is-active" : ""}
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </button>
                      </span>
                    ))}
                  <button
                    type="button"
                    disabled={safePage === totalPages}
                    onClick={() =>
                      setCurrentPage((page) => Math.min(totalPages, page + 1))
                    }
                  >
                    Sljedeća
                  </button>
                </nav>
              )}
            </>
          )}
        </section>
      </div>
    </main>
  );
});

export default SearchPage;
