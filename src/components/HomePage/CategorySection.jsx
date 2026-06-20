import React from "react";
import { MdElectricBolt } from "react-icons/md";
import { BsSpeedometer2 } from "react-icons/bs";
import { PiCityLight } from "react-icons/pi";
import { PiJeepLight } from "react-icons/pi";
import "./CategorySection.scss";

const categories = [
  {
    icon: MdElectricBolt,
    title: "ELEKTRIČNI",
    description: "Budućnost vožnje",
    color: "#00ffcc",
  },
  {
    icon: BsSpeedometer2,
    title: "SPORTSKI",
    description: "Adrenalin na cesti",
    color: "#ff3366",
  },
  {
    icon: PiCityLight,
    title: "GRADSKI",
    description: "Agilni i ekonomični",
    color: "#00aaff",
  },
  {
    icon: PiJeepLight,
    title: "DŽIPOVI",
    description: "Snaga i terenski",
    color: "#ffaa00",
  },
];

const CategorySection = () => {
  return (
    <section className="category-section">
      <div className="section-header">
        <h2>TOP KATEGORIJE</h2>
        <p>Istraži automobile po svom životnom stilu</p>
      </div>

      <div className="categories-grid">
        {categories.map((cat, index) => {
          const Icon = cat.icon;
          return (
            <div key={index} className="category-card">
              <div className="icon-wrapper">
                <Icon className="icon" style={{ color: cat.color }} />
              </div>
              <h3>{cat.title}</h3>
              <p>{cat.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CategorySection;
