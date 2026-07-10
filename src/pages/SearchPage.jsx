import React, { useState, useMemo, useEffect } from "react";
import { carStore } from "../stores/CarStore";
import { observer } from "mobx-react-lite";
import "./../styles/SearchPage.scss";

const SearchPage = observer(() => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [yearFrom, setYearFrom] = useState("");
  const [yearTo, setYearTo] = useState("");
  const [sortBy, setSortBy] = useState("match");

  useEffect(() => {
    carStore.loadCars();
  }, []);

  const filteredCars = useMemo(() => {
    let result = [...carStore.cars];
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (car) =>
          car.brand?.toLowerCase().includes(term) ||
          car.model?.toLowerCase().includes(term) ||
          car.name?.toLowerCase().includes(term),
      );
    }

    if (selectedBrands.length > 0) {
      result = result.filter((car) => selectedBrands.includes(car.brand));
    }

    if (selectedCategories.length > 0) {
      result = result.filter((car) =>
        selectedCategories.includes(car.categories),
      );
    }

    if (yearFrom) {
      result = result.filter((car) => car.year >= parseInt(yearFrom));
    }
    if (yearTo) {
      result = result.filter((car) => car.year <= parseInt(yearTo));
    }

    if (sortBy === "match" && carStore.cars[0]?.match) {
      result.sort((a, b) => (b.match || 0) - (a.match || 0));
    } else if (sortBy === "year") {
      result.sort((a, b) => b.year - a.year);
    }

    return result;
  }, [
    searchTerm,
    selectedBrands,
    selectedCategories,
    yearFrom,
    yearTo,
    sortBy,
  ]);

  const toggleBrand = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand],
    );
  };

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedBrands([]);
    setSelectedCategories([]);
    setYearFrom("");
    setYearTo("");
    setSortBy("match");
  };

  return (
    <section className="search-page">
      <div className="search-page-header">
        <h1>Pronađi svoj savršeni auto</h1>
        <p>Pretraži i filtriraj automobile po svojim željama</p>
      </div>

      <div className="search-page-content">
        {/* FILTERI - lijeva strana */}
        <aside className="filters-sidebar">
          <h3>FILTERI PRETRAGE</h3>

          <div className="filter-group">
            <h4>Marka</h4>
            {["Volkswagen", "BMW", "Audi", "Porsche", "Tesla", "Mercedes"].map(
              (brand) => (
                <label key={brand} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => toggleBrand(brand)}
                  />
                  {brand}
                </label>
              ),
            )}
          </div>

          <div className="filter-group">
            <h4>Kategorija</h4>
            {[
              { label: "Sportski", value: "sport" },
              { label: "Električni", value: "electric" },
              { label: "Gradski", value: "city" },
              { label: "Džipovi", value: "suv" },
            ].map((cat) => (
              <label key={cat.value} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat.value)}
                  onChange={() => toggleCategory(cat.value)}
                />
                {cat.label}
              </label>
            ))}
          </div>

          <div className="filter-group">
            <h4>Godina proizvodnje</h4>
            <div className="year-range">
              <input
                type="number"
                placeholder="Od"
                value={yearFrom}
                onChange={(e) => setYearFrom(e.target.value)}
              />
              <span>—</span>
              <input
                type="number"
                placeholder="Do"
                value={yearTo}
                onChange={(e) => setYearTo(e.target.value)}
              />
            </div>
          </div>

          <button className="reset-btn" onClick={resetFilters}>
            Resetiraj filtere
          </button>
        </aside>

        {/* Glavni sadržaj */}
        <div className="results-area">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Pretraži po marki ili modelu..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="match">Sortiraj po Match %</option>
              <option value="year">Sortiraj po godini (novo → staro)</option>
            </select>
          </div>

          <p className="results-count">
            Pronađeno: <strong>{filteredCars.length}</strong> automobila
          </p>

          <div className="cars-grid">
            {filteredCars.map((car) => (
              <div key={car.id} className="car-card">
                <div className="image-container">
                  <img src={car.imageUrl || "/preuzmi1.png"} alt={car.name} />
                  {car.match && <div className="match-badge">{car.match}%</div>}
                </div>
                <div className="card-content">
                  <h3>
                    {car.brand} {car.model}
                  </h3>
                  <p>{car.subtitle || `${car.year} • ${car.engine || ""}`}</p>
                </div>
                <button className="details-btn">DETALJI</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

export default SearchPage;
