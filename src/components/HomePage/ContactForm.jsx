import { useState } from "react";
import { sendContactMessage } from "../../services/contactService";
import "./ContactForm.scss";

const initialForm = { name: "", email: "", message: "" };

const ContactForm = () => {
  const [formData, setFormData] = useState(initialForm);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSending, setIsSending] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    setStatus({ type: "", message: "" });

    try {
      await sendContactMessage({
        ...formData,
        subject: "Pitanje s RevAI početne stranice",
      });
      setFormData(initialForm);
      setStatus({ type: "success", message: "Poruka je uspješno poslana." });
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    } finally {
      setIsSending(false);
    }
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

          {status.message && (
            <p className={`form-status form-status--${status.type}`}>
              {status.message}
            </p>
          )}

          <button type="submit" className="send-btn" disabled={isSending}>
            {isSending ? "SLANJE..." : "POŠALJI PORUKU"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
