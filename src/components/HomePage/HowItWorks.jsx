import React from "react";
import "./HowItWorks.scss";

const HowItWorks = () => {
  const steps = [
    {
      title: "OPIŠI ŽELJE:",
      text: "Unesi svoje preferencije stil vožnje ili budžet.",
    },
    {
      title: "AI ANALIZA:",
      text: "Naš algoritam pretražuje bazu i analizira tvoj stil.",
    },
    {
      title: "SAVRŠEN IZBOR:",
      text: "Dobivaš personalizirane preporuke automobila.",
    },
  ];
  return (
    <div className="howitworks-container">
      <h2>
        KAKO <span className="rev"> REV</span>
        <span className="ai">AI </span> RADI?
      </h2>
      {steps.map((step, index) => (
        <div key={index} className="step-card">
          <span className="step-title">{step.title}</span>
          <span className="step-text">{step.text}</span>
        </div>
      ))}
    </div>
  );
};

export default HowItWorks;
