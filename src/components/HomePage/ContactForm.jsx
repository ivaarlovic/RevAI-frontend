import React from "react";
import "./ContactForm.scss";

const ContactForm = () => {
  return (
    <div className="contact-box">
      <h2>IMAŠ PITANJE?</h2>
      <p>Pošalji nam poruku i javit ćemo ti se u najkraćem mogućem roku.</p>
      <input type="text" placeholder="Napiši poruku..." />
      <button className="send-btn">POŠALJI</button>
    </div>
  );
};

export default ContactForm;
