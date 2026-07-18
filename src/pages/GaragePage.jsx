import { observer } from "mobx-react-lite";
import { IoCarSportOutline, IoTrashOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { garageStore } from "../stores/GarageStore";
import {
  formatPrice,
  getCarId,
  getCarImage,
  getCarName,
  getCarPrice,
  getCarSubtitle,
} from "../utils/carUtils";
import "../styles/GaragePage.scss";

const GaragePage = observer(() => {
  const navigate = useNavigate();

  return (
    <main className="garage-page">
      <header className="garage-page__header">
        <div>
          <h1>MOJA GARAŽA</h1>
          <p>{garageStore.cars.length} spremljenih automobila</p>
        </div>
        <button type="button" onClick={() => navigate("/search")}>
          PRONAĐI JOŠ AUTOMOBILA
        </button>
      </header>

      {garageStore.cars.length === 0 ? (
        <section className="garage-empty">
          <IoCarSportOutline />
          <h2>Tvoja garaža je prazna</h2>
          <p>
            Spremi automobile iz pretrage ili preporuka kako bi ih kasnije lakše
            usporedila.
          </p>
          <button type="button" onClick={() => navigate("/search")}>
            Otvori pretragu
          </button>
        </section>
      ) : (
        <section className="garage-grid">
          {garageStore.cars.map((car) => {
            const id = getCarId(car);
            return (
              <article key={id} className="garage-card">
                <div className="garage-card__image">
                  <img src={getCarImage(car)} alt={getCarName(car)} />
                  <button
                    type="button"
                    className="garage-card__remove"
                    onClick={() => garageStore.remove(id)}
                    title="Ukloni iz garaže"
                  >
                    <IoTrashOutline />
                  </button>
                  {car.match !== null && car.match !== undefined && (
                    <span className="garage-card__match">{car.match}%</span>
                  )}
                </div>

                <div className="garage-card__body">
                  <h2>{getCarName(car)}</h2>
                  <p>{getCarSubtitle(car)}</p>
                  <strong>{formatPrice(getCarPrice(car))}</strong>
                </div>

                <button
                  type="button"
                  className="garage-card__details"
                  onClick={() => navigate(`/cars/${id}`)}
                >
                  DETALJI <IoCarSportOutline />
                </button>
              </article>
            );
          })}
        </section>
      )}
    </main>
  );
});

export default GaragePage;
