import { MdElectricBolt } from "react-icons/md";
import { BsSpeedometer2 } from "react-icons/bs";
import { PiCityLight } from "react-icons/pi";
import { PiJeepLight } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import "./CategorySection.scss";

const categories = [
  {
    icon: MdElectricBolt,
    title: "ELEKTRIČNI",
    description: "Budućnost vožnje",
    value: "electric",
    color: "#00ffcc",
  },
  {
    icon: BsSpeedometer2,
    title: "SPORTSKI",
    description: "Adrenalin na cesti",
    value: "sport",
    color: "#ff3366",
  },
  {
    icon: PiCityLight,
    title: "GRADSKI",
    description: "Agilni i ekonomični",
    value: "city",
    color: "#00aaff",
  },
  {
    icon: PiJeepLight,
    title: "DŽIPOVI",
    description: "Snaga i terenski",
    value: "suv",
    color: "#ffaa00",
  },
];

const CategorySection = () => {
  const navigate = useNavigate();
  return (
    <section className="category-section">
      <div className="section-header">
        <h2>TOP KATEGORIJE</h2>
        <p>Istraži automobile po svom životnom stilu</p>
      </div>

      <div className="categories-grid">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <button
              key={category.value}
              type="button"
              className="category-card"
              onClick={() => navigate(`/search?category=${category.value}`)}
            >
              <div className="icon-wrapper">
                <Icon className="icon" style={{ color: category.color }} />
              </div>
              <h3>{category.title}</h3>
              <p>{category.description}</p>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default CategorySection;
