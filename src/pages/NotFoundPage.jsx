import { IoCarSportOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import "../styles/NotFoundPage.scss";

const NotFoundPage = () => (
  <main className="not-found-page">
    <IoCarSportOutline className="not-found-page__icon" />
    <p className="not-found-page__code">404</p>
    <h1>Stranica nije pronađena</h1>
    <p>Adresa možda nije ispravna ili stranica još nije izrađena.</p>
    <Link to="/home" className="not-found-page__button">
      Povratak na početnu
    </Link>
  </main>
);

export default NotFoundPage;
