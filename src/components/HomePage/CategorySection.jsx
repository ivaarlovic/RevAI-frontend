import React from "react";
import { MdElectricBolt } from "react-icons/md";
import { PiCityLight } from "react-icons/pi";
import { BsSpeedometer2 } from "react-icons/bs";
import { PiJeepLight } from "react-icons/pi";
import "./CategorySection.scss";

const CategorySection = () => {
  return (
    <section className="category-section">
      <h2>TOP KATEGORIJE</h2>
      <div className="categories-grid">
        <div className="category-card">
          <MdElectricBolt className="icon" />
          <h2>ELEKTRIČNI</h2>
        </div>
        <div className="category-card">
          <BsSpeedometer2 className="icon" />
          <h2>SPORTSKI</h2>
        </div>
        <div className="category-card">
          <PiCityLight className="icon" />
          <h2>GRADSKI</h2>
        </div>
        <div className="category-card">
          <PiJeepLight className="icon" />
          <h2>DŽIPOVI</h2>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
