import { observer } from "mobx-react-lite";
import { useState } from "react";
import { IoCarSportOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { userStore } from "../../stores/UserStore";
import "./Registration.scss";

const Registration = observer(() => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    if (formData.password !== formData.confirmPassword) {
      setMessage({ type: "error", text: "Lozinke se ne podudaraju." });
      return;
    }

    if (formData.password.length < 6) {
      setMessage({
        type: "error",
        text: "Lozinka mora imati najmanje 6 znakova.",
      });
      return;
    }

    if (!formData.terms) {
      setMessage({
        type: "error",
        text: "Potrebno je prihvatiti uvjete korištenja.",
      });
      return;
    }

    const result = await userStore.register(formData);
    if (result.success) {
      navigate("/login", { replace: true, state: { registered: true } });
    } else {
      setMessage({ type: "error", text: result.error });
    }
  };

  return (
    <section className="register-section">
      <div className="register-container">
        <div className="register-card">
          <div className="register-header">
            <IoCarSportOutline className="logo-icom" />
            <h1>KREIRAJ RAČUN</h1>
            <p>Pridruži se i pronađi auto savršen za tebe</p>
          </div>

          <form onSubmit={handleSubmit}>
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
              <input
                type="password"
                name="password"
                placeholder="Lozinka"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Potvrdi lozinku"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            <label className="terms-label">
              <input
                type="checkbox"
                name="terms"
                checked={formData.terms}
                onChange={handleChange}
                required
              />
              Prihvaćam <Link to="/terms"> uvjete korištenja </Link> i i{" "}
              <Link to="/privacy">politiku privatnosti</Link>
            </label>

            {message.text && (
              <p className={`auth-message auth-message--${message.type}`}>
                {message.text}
              </p>
            )}

            <button
              type="submit"
              className="register-btn"
              disabled={userStore.isLoading}
            >
              {userStore.isLoading ? "REGISTRACIJA..." : "REGISTRIRAJ SE"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
});

export default Registration;
