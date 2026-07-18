import { observer } from "mobx-react-lite";
import {
  IoCarSportOutline,
  IoLogOutOutline,
  IoRefreshOutline,
} from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { carStore } from "../stores/CarStore";
import { garageStore } from "../stores/GarageStore";
import { userStore } from "../stores/UserStore";
import "../styles/ProfilePage.scss";

const ProfilePage = observer(() => {
  const navigate = useNavigate();
  const user = userStore.user;

  const handleResetPreferences = () => {
    carStore.resetSelections();
    navigate("/landing");
  };

  const handleLogout = () => {
    userStore.logout();
    navigate("/login", { replace: true });
  };

  return (
    <main className="profile-page">
      <section className="profile-card">
        <div className="profile-card__avatar">
          <IoCarSportOutline />
        </div>
        <div>
          <p className="profile-card__eyebrow">MOJ PROFIL</p>
          <h1>{user?.username || "Korisnik"}</h1>
          <p className="profile-card__email">
            {user?.email || "Email nije dostupan"}
          </p>
        </div>
      </section>

      <section className="profile-stats">
        <article>
          <strong>{garageStore.cars.length}</strong>
          <span>automobila u garaži</span>
        </article>
        <article>
          <strong>{carStore.selectedCars.length}</strong>
          <span>početnih preferencija</span>
        </article>
        <article>
          <strong>{carStore.likedCars.length}</strong>
          <span>odabira za novu preporuku</span>
        </article>
      </section>

      <section className="profile-actions">
        <div>
          <h2>Preferencije</h2>
          <p>Ponovno odaberi automobile i osvježi personalizirane preporuke.</p>
        </div>
        <button type="button" onClick={handleResetPreferences}>
          <IoRefreshOutline /> Ponovno odaberi
        </button>
      </section>

      <section className="profile-actions profile-actions--danger">
        <div>
          <h2>Odjava</h2>
          <p>Odjavi se s ovog uređaja i vrati na stranicu za prijavu.</p>
        </div>
        <button type="button" onClick={handleLogout}>
          <IoLogOutOutline /> Odjavi se
        </button>
      </section>
    </main>
  );
});

export default ProfilePage;
