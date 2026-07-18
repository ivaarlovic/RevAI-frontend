import { observer } from "mobx-react-lite";
import {
  IoArrowBackOutline,
  IoCarSportOutline,
  IoHeartOutline,
  IoHeart,
} from "react-icons/io5";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { carStore } from "../stores/CarStore";
import { garageStore } from "../stores/GarageStore";
import {
  formatPrice,
  getCarBody,
  getCarFuel,
  getCarHorsePower,
  getCarId,
  getCarImage,
  getCarMatch,
  getCarName,
  getCarPrice,
  getCarSubtitle,
  getCarYear,
} from "../utils/carUtils";
import "../styles/CarDetailsPage.scss";

const CarDetailsPage = observer(() => {
  const { carId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (carStore.cars.length === 0) {
      carStore.loadCars();
    }
  }, []);

  const car =
    carStore.cars.find((item) => String(getCarId(item)) === String(carId)) ||
    garageStore.cars.find((item) => String(getCarId(item)) === String(carId));

  if (carStore.isLoading && !car) {
    return <main className="car-details-state">Učitavanje automobila...</main>;
  }

  if (!car) {
    return (
      <main className="car-details-state">
        <IoCarSportOutline />
        <h1>Automobil nije pronađen</h1>
        <button type="button" onClick={() => navigate("/search")}>
          Povratak na pretragu
        </button>
      </main>
    );
  }

  const id = getCarId(car);
  const isSaved = garageStore.has(id);
  const match = getCarMatch(car);

  return (
    <main className="car-details-page">
      <button
        className="car-details-page__back"
        type="button"
        onClick={() => navigate(-1)}
      >
        <IoArrowBackOutline /> Natrag
      </button>

      <section className="car-details-card">
        <div className="car-details-card__image">
          <img src={getCarImage(car)} alt={getCarName(car)} />
          {match !== null && <span>{match}% podudarnost</span>}
        </div>

        <div className="car-details-card__content">
          <p className="car-details-card__eyebrow">DETALJI AUTOMOBILA</p>
          <h1>{getCarName(car)}</h1>
          <p className="car-details-card__subtitle">{getCarSubtitle(car)}</p>
          <p className="car-details-card__price">
            {formatPrice(getCarPrice(car))}
          </p>

          <div className="car-details-grid">
            <article>
              <span>Godište</span>
              <strong>{getCarYear(car) || "N/A"}</strong>
            </article>
            <article>
              <span>Gorivo</span>
              <strong>{getCarFuel(car) || "N/A"}</strong>
            </article>
            <article>
              <span>Karoserija</span>
              <strong>{getCarBody(car) || "N/A"}</strong>
            </article>
            <article>
              <span>Snaga</span>
              <strong>
                {getCarHorsePower(car)
                  ? `${Math.round(getCarHorsePower(car))} KS`
                  : "N/A"}
              </strong>
            </article>
          </div>

          <div className="car-details-card__explanation">
            <h2>Zašto bi ti mogao odgovarati?</h2>
            <p>
              RevAI kombinira tvoje ranije odabire s karakteristikama
              automobila. Prikazana podudarnost pomaže ti usporediti ovaj
              automobil s ostalim rezultatima, ali konačan izbor uvijek ovisi o
              tvojim potrebama i budžetu.
            </p>
          </div>

          <button
            type="button"
            className={`car-details-card__garage ${isSaved ? "is-saved" : ""}`}
            onClick={() => garageStore.toggle(car)}
          >
            {isSaved ? <IoHeart /> : <IoHeartOutline />}
            {isSaved ? "Ukloni iz garaže" : "Spremi u garažu"}
          </button>
        </div>
      </section>
    </main>
  );
});

export default CarDetailsPage;
