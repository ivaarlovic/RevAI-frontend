import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { carStore } from "../stores/CarStore";
import "./../styles/RecommendationPage.scss";

const RecommendationPage = observer(() => {
  useEffect(() => {
    carStore.loadCars();
  }, []);
  const [currentStep, setCurrentStep] = useState(1);

  const handleToggleCar = (carId) => {
    carStore.toggleLikeCar(carId);
  };

  const handleLookingForChange = (value) => {
    carStore.setLookingFor(value);
  };

  const handleGetRecommendation = () => {
    if (carStore.likedCars.length === 3 && carStore.lookingFor) {
      carStore.getRecommendation();
      onSubmit();
    }
  };

  const isStep1Complete = carStore.likedCars.length === 3;
  const isStep2Complete = carStore.lookingFor.trim().length > 10;

  return (
    <div className="preference-form-container">
      <div className="form-header">
        <h1 className="form-title">Tell Us Your Preference</h1>
        <p className="form-subtitle">
          We'll find your perfect car in 3 simple steps
        </p>
      </div>
      {/*Step 1: Select 3 cars*/}
      <div className={`form-step ${currentStep === 1 ? "active" : ""}`}>
        <div className="step-header">
          <div className="step-number">1</div>
          <div className="step-info">
            <h2>Select 3 Cars You Like</h2>
            <p>Pick three cars that appeal to you</p>
          </div>
          <div className="step-counter">{carStore.likedCars.length} / 3</div>
        </div>
        <div className="cars-selection-grid">
          {carStore.cars.map((car) => (
            <div
              key={car.id}
              className={`car-selection-item ${carStore.likedCars.includes(car.id) ? "selected" : ""}`}
              onClick={() => handleToggleCar(car.id)}
            >
              <div className="car-item-image">
                <img
                  src={car.imageUrl}
                  alt={car.model}
                  style={{ width: "100%" }}
                />
              </div>
              <div className="car-item-info">
                <h3>
                  {car.brand} {car.model}
                </h3>
                <p>{car.bodyType}</p>
                <span className="car-item-price">${car.price}</span>
              </div>
              {carStore.likedCars.includes(car.id) && (
                <div className="selected-badge">✓ Selected</div>
              )}
            </div>
          ))}
        </div>
        {isStep1Complete && (
          <button className="next-btn" onClick={() => setCurrentStep(2)}>
            Continue to Next Step →
          </button>
        )}
      </div>
      {/* Step 2: What are you looking for? */}
      <div className={`form-step ${currentStep === 2 ? "active" : ""}`}>
        <div className="step-header">
          <div className="step-number">2</div>
          <div className="step-info">
            <h2>Describe Your Ideal Car</h2>
            <p>Tell us what features and characteristics matter to you</p>
          </div>
        </div>
        <div className="looking-for-section">
          <label htmlFor="looking-for">What are you looking for?</label>
          <textarea
            id="looking-for"
            placeholder="e.g., I want a fast electric car with luxury features for daily commute and weekend trips..."
            value={carStore.lookingFor}
            onChange={(e) => handleLookingForChange(e.target.value)}
            className="looking-for-input"
            rows="5"
          />
          <p className="char-count">
            {carStore.lookingFor.length} characters (minimum 10)
          </p>
        </div>
        <div className="step-actions">
          <button className="back-btn" onClick={() => setCurrentStep(1)}>
            ← Back
          </button>
          {isStep2Complete && (
            <button className="next-btn" onClick={() => setCurrentStep(3)}>
              Continue to Next Step →
            </button>
          )}
        </div>
      </div>
      {/* Step 3: Review & Get Recommendation */}
      <div className={`form-step ${currentStep === 3 ? "active" : ""}`}>
        <div className="step-header">
          <div className="step-number">3</div>
          <div className="step-info">
            <h2>Review Your Selection</h2>
            <p>Get your personalized car recommendation</p>
          </div>
        </div>

        <div className="review-section">
          <div className="review-subsection">
            <h3>Your Favorite Cars</h3>
            <div className="review-cars-grid">
              {carStore.getLikedObjects().map((car) => (
                <div key={car.id} className="review-card">
                  <img
                    src={car.imageUrl}
                    alt={car.model}
                    className="review-img"
                  />
                  <div className="review-text">
                    <p className="car-title">
                      {car.brand} {car.model}
                    </p>
                    <p className="car-sub">{car.bodyType}</p>
                    <p className="car-price">${car.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <h3>What You're Looking For</h3>
          <div className="review-box">
            <p>{carStore.lookingFor}</p>
          </div>
        </div>

        <div className="step-actions">
          <button className="back-btn" onClick={() => setCurrentStep(2)}>
            ← Back
          </button>
          <button className="submit-btn" onClick={handleGetRecommendation}>
            Get My Recommendation 🎯
          </button>
        </div>
      </div>
    </div>
  );
});

export default RecommendationPage;
