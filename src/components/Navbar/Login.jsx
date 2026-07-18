import { useState } from "react";
import "./Login.scss";
import { IoCarSportOutline } from "react-icons/io5";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { userStore } from "../../stores/UserStore";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [error, setError] = useState("");
  const registered = Boolean(location.state?.registered);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const result = await userStore.login(
      formData.email,
      formData.password,
      formData.remember,
    );
    if (result.success) {
      navigate(location.state?.from || "/landing", { replace: true });
    } else {
      setError(result.error);
    }
  };

  return (
    <section className="login-section">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <IoCarSportOutline className="login-icon" />
            <h1>DOBRODOŠAO/LA NATRAG</h1>
            <p>Prijavi se da nastaviš otkrivati savršene automobile.</p>
          </div>

          <form onSubmit={handleSubmit}>
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
            <div className="options">
              <label className="remember-me">
                <input
                  type="checkbox"
                  name="remember"
                  checked={formData.remember}
                  onChange={handleChange}
                />
                Zapamti me
              </label>
              <span
                className="forgot-password"
                title="Reset lozinke nije povezan s backendom"
              >
                Zaboravljena lozinka?
              </span>
            </div>
            {registered && !error && (
              <p className="auth-message auth-message--success">
                Registracija je uspješna. Sada se možeš prijaviti.
              </p>
            )}
            {error && (
              <p className="auth-message auth-message--error">{error}</p>
            )}

            <button
              type="submit"
              className="login-button"
              disabled={userStore.isLoading}
            >
              {userStore.isLoading ? "PRIJAVA..." : "PRIJAVI SE"}
            </button>
          </form>

          <div className="register-link">
            Nemaš račun? <Link to="/registration">Registriraj se</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
