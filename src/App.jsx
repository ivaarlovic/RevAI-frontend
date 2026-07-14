import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar/Navbar";
import "./App.scss";
import Footer from "./components/Footer/Footer";
import GaragePage from "./pages/GaragePage";
import ContactPage from "./pages/ContactPage";
import Login from "./components/Navbar/Login";
import Registration from "./components/Navbar/Registration";
import SearchPage from "./pages/SearchPage";
import RecommendationPage from "./pages/RecommendationPage";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="app-container">
        <Navbar />
        <Routes>
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/garage" element={<GaragePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/recommendation" element={<RecommendationPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
