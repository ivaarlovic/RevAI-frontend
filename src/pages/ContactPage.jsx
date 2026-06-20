import React, { useState } from "react";
import "./../styles/ContactPage.scss";
import {
  IoMailOutline,
  IoCallOutline,
  IoLocationOutline,
} from "react-icons/io5";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Kontakt poruka:", formData);
    alert("Poruka uspješno poslana! (Demo mod)");
    // Reset forme
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <section className="contact-page">
      <div className="contact-header">
        <h1>KONTAKTIRAJ NAS</h1>
        <p>Imamo pitanje? Tu smo za tebe.</p>
      </div>

      <div className="contact-content">
        {/* Kontakt forma */}
        <div className="contact-form-container">
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="input-row">
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
            </div>

            <div className="input-group">
              <input
                type="text"
                name="subject"
                placeholder="Naslov poruke"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <textarea
                name="message"
                placeholder="Tvoja poruka..."
                rows={8}
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

        {/* Kontakt informacije */}
        <div className="contact-info">
          <div className="info-card">
            <IoMailOutline className="info-icon" />
            <h3>Email</h3>
            <p>info@revai.hr</p>
          </div>

          <div className="info-card">
            <IoCallOutline className="info-icon" />
            <h3>Telefon</h3>
            <p>+385 91 234 5678</p>
          </div>

          <div className="info-card">
            <IoLocationOutline className="info-icon" />
            <h3>Adresa</h3>
            <p>Zagreb, Hrvatska</p>
          </div>

          <div className="info-card">
            <h3>Radno vrijeme</h3>
            <p>Pon - Pet: 09:00 - 17:00</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
