import { useState } from "react";
import { IoMailOutline } from "react-icons/io5";
import { contactEmail, sendContactMessage } from "../services/contactService";
import "../styles/ContactPage.scss";

const initialForm = { name: "", email: "", subject: "", message: "" };

const ContactPage = () => {
  const [formData, setFormData] = useState(initialForm);
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    setStatus({ type: "", message: "" });

    try {
      await sendContactMessage(formData);
      setFormData(initialForm);
      setStatus({
        type: "success",
        message: "Poruka je uspješno poslana. Hvala!",
      });
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section className="contact-page">
      <div className="contact-header">
        <h1>KONTAKTIRAJ NAS</h1>
        <p>Imaš pitanje, prijedlog ili problem? Pošalji poruku.</p>
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

            {status.message && (
              <p className={`contact-status contact-status--${status.type}`}>
                {status.message}
              </p>
            )}

            <button type="submit" className="send-btn" disabled={isSending}>
              {isSending ? "SLANJE..." : "POŠALJI PORUKU"}
            </button>
          </form>
        </div>

        {/* Kontakt informacije */}
        <div className="contact-info">
          <div className="info-card">
            <IoMailOutline className="info-icon" />
            <h3>Email</h3>
            <p>
              {contactEmail ||
                "Email će se prikazati nakon podešavanja .env datoteke."}
            </p>
          </div>

          <div className="info-card">
            <h2>Kako šaljemo poruke?</h2>
            <p>
              Kontakt forma poruku šalje izravno na email postavljen u
              konfiguraciji projekta.
            </p>
          </div>

          <div className="info-card">
            <h2>Napomena</h2>
            <p>
              Pri prvom testnom slanju potrebno je potvrditi aktivaciju forme u
              primljenom emailu.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
