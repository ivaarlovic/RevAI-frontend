import React from "react";
import "./SearchSection.scss";
import { IoCarOutline } from "react-icons/io5";

const SearchSection = () => {
  return (
    <section className="search-section">
      {/* Lijevi dio */}
      <div className="search-box">
        <h2>PRONAĐI AUTOMOBIL KOJI ODGOVARA TVOM STILU</h2>
        <p>Naš AI analizira tvoje preferencije i izdvaja savršen izbor.</p>
        <input
          type="text"
          placeholder="Opiši što tražiš (npr. sportski auto...)"
        />
        <button className="search-btn">PRETRAŽI</button>
      </div>
      {/* Desni dio */}
      <div className="ai-status">
        <div className="icon-wrapper">
          <IoCarOutline className="car-icon" />
        </div>
        <p>Rezultat će se prikazati ovdje.</p>
        <span className="status-indicator">
          AI ENGINE: ACTIVE <span className="tocka">●</span>
        </span>
      </div>
    </section>
  );
};

export default SearchSection;
