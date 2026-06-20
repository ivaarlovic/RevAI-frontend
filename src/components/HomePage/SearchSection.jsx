import React from "react";
import "./SearchSection.scss";
import { IoCarSportOutline } from "react-icons/io5";

const SearchSection = () => {
  return (
    <section className="search-section">
      <div className="container">
        {/* Lijevi panel */}
        <div className="panel search-box">
          <h1>
            PRONAĐI AUTOMOBIL
            <br />
            KOJI ODGOVARA TVOM STILU
          </h1>
          <p>Naš AI analizira tvoje preferencije i izdvaja savršen izbor.</p>

          <div className="input-wrapper">
            <input
              type="text"
              placeholder="Opiši što tražiš (npr. sportski auto...)"
            />
          </div>

          <button className="search-btn">PRETRAŽI</button>
        </div>

        {/* Desni panel */}
        <div className="panel ai-status">
          <IoCarSportOutline className="car-icon" />
          <p>Rezultat će se prikazati ovdje.</p>
          <div className="status">
            AI ENGINE: ACTIVE
            <span className="tocka">●</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchSection;
