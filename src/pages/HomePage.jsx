import "./../styles/HomePage.scss";
import SearchSection from "../components/HomePage/SearchSection";
import RecommendedCars from "../components/HomePage/RecommendedCars";
import CategorySection from "../components/HomePage/CategorySection";
import HowItWorks from "../components/HomePage/HowItWorks";
import ContactForm from "../components/HomePage/ContactForm";

function HomePage() {
  return (
    <div className="home-container">
      <main>
        <SearchSection />
        <RecommendedCars />
        <CategorySection />
        <HowItWorks />
        <ContactForm />
      </main>
    </div>
  );
}

export default HomePage;
