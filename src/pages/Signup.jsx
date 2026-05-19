import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/sign-up`,
        formData
      );
      navigate("/sign-in");
    } catch (err) {
      setErrorMessage(
        err.response?.data?.err || "An error occurred during sign up"
      );
    }
  }

  return (
    <div className="auth-page sign-up-page">
      <h1 className="page-title auth-title">Sign Up</h1>

      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label className="form-label" htmlFor="username">
            Username:
          </label>
          <input
            className="form-input"
            id="username"
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-field">
          <label className="form-label" htmlFor="password">
            Password:
          </label>
          <input
            className="form-input"
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button className="form-button" type="submit">
          Sign Up
        </button>
      </form>

      {errorMessage && (
        <p className="error-message" role="alert">
          {errorMessage}
        </p>
      )}
    </div>
  );
}

export default Signup;
