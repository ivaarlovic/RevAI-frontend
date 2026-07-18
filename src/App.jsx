import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Login from "./components/Navbar/Login";
import Navbar from "./components/Navbar/Navbar";
import Registration from "./components/Navbar/Registration";
import ProtectedRoute from "./components/Routing/ProtectedRoute";
import PublicOnlyRoute from "./components/Routing/PublicOnlyRoute";
import ScrollToTop from "./components/ScrollToTop";
import CarDetailsPage from "./pages/CarDetailsPage";
import ContactPage from "./pages/ContactPage";
import GaragePage from "./pages/GaragePage";
import HomePage from "./pages/HomePage";
import InfoPage from "./pages/InfoPage";
import LandingPage from "./pages/LandingPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProfilePage from "./pages/ProfilePage";
import RecommendationPage from "./pages/RecommendationPage";
import SearchPage from "./pages/SearchPage";
import { garageStore } from "./stores/GarageStore";
import { userStore } from "./stores/UserStore";
import "./App.scss";

const Private = ({ children }) => <ProtectedRoute>{children}</ProtectedRoute>;

const App = observer(() => {
  useEffect(() => {
    garageStore.initialize(userStore.user?.userId);
    // MobX observer ponovno renderira App kada se korisnik promijeni.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userStore.user?.userId]);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="app-container">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <Navigate
                to={userStore.isAuthenticated ? "/home" : "/login"}
                replace
              />
            }
          />
          <Route
            path="/login"
            element={
              <PublicOnlyRoute>
                <Login />
              </PublicOnlyRoute>
            }
          />
          <Route
            path="/registration"
            element={
              <PublicOnlyRoute>
                <Registration />
              </PublicOnlyRoute>
            }
          />

          <Route
            path="/landing"
            element={
              <Private>
                <LandingPage />
              </Private>
            }
          />
          <Route
            path="/home"
            element={
              <Private>
                <HomePage />
              </Private>
            }
          />
          <Route
            path="/garage"
            element={
              <Private>
                <GaragePage />
              </Private>
            }
          />
          <Route
            path="/recommendation"
            element={
              <Private>
                <RecommendationPage />
              </Private>
            }
          />
          <Route
            path="/search"
            element={
              <Private>
                <SearchPage />
              </Private>
            }
          />
          <Route
            path="/cars/:carId"
            element={
              <Private>
                <CarDetailsPage />
              </Private>
            }
          />
          <Route
            path="/profile"
            element={
              <Private>
                <ProfilePage />
              </Private>
            }
          />

          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<InfoPage page="about" />} />
          <Route path="/terms" element={<InfoPage page="terms" />} />
          <Route path="/privacy" element={<InfoPage page="privacy" />} />
          <Route path="/error" element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
});

export default App;
