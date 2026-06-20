import React from "react";
import "./HowItWorks.scss";

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "OPIŠI ŽELJE",
      text: "Unesi svoje preferencije, stil vožnje ili budžet.",
    },
    {
      number: "02",
      title: "AI ANALIZA",
      text: "Naš algoritam pretražuje bazu i analizira tvoj stil.",
    },
    {
      number: "03",
      title: "SAVRŠEN IZBOR",
      text: "Dobivaš personalizirane preporuke automobila.",
    },
  ];

  return (
    <section className="howitworks-section">
      <div className="section-header">
        <h2>
          KAKO <span className="highlight">REVAI</span> RADI?
        </h2>
        <p>Tvoja vožnja. Naša inteligencija.</p>
      </div>

      <div className="steps-container">
        {steps.map((step, index) => (
          <div key={index} className="step-card">
            <div className="step-number">{step.number}</div>
            <div className="step-content">
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
