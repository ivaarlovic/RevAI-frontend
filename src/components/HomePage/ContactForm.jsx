import React, { useState } from "react";
import "./ContactForm.scss";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ovdje možeš dodati logiku slanja
    console.log("Poslana poruka:", formData);
    alert("Poruka je poslana! (Demo)");
  };

  return (
    <section className="contact-section">
      <div className="contact-container">
        <div className="section-header">
          <h2>IMAŠ PITANJE?</h2>
          <p>Pošalji nam poruku i naš tim će ti se javiti u najkraćem roku.</p>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              name="name"
              placeholder="Ime i prezime"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Email adresa"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <textarea
              name="message"
              placeholder="Napiši poruku..."
              rows={6}
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="send-btn">
            POŠALJI PORUKU
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
