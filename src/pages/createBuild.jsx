import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

function CreateBuild() {
  const [formData, setFormData] = useState({
    title: "",
    make: "",
    model: "",
    year: "",
    engine: "",
    goal: "",
    status: "To do",
    budget: "",
    image: "",
  });

  const navigate = useNavigate();

  function handleChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/build`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      navigate("/dashboard");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="form-page create-build-page">
      <h1 className="page-title form-title">Create New Build</h1>

      <form className="build-form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label className="form-label" htmlFor="title">
            Title:
          </label>
          <input
            className="form-input"
            id="title"
            value={formData.title}
            onChange={handleChange}
            name="title"
            type="text"
            required
          />
        </div>

        <div className="form-field">
          <label className="form-label" htmlFor="make">
            Make:
          </label>
          <input
            className="form-input"
            id="make"
            value={formData.make}
            onChange={handleChange}
            name="make"
            type="text"
            required
          />
        </div>

        <div className="form-field">
          <label className="form-label" htmlFor="model">
            Model:
          </label>
          <input
            className="form-input"
            id="model"
            value={formData.model}
            onChange={handleChange}
            name="model"
            type="text"
            required
          />
        </div>

        <div className="form-field">
          <label className="form-label" htmlFor="year">
            Year:
          </label>
          <input
            className="form-input"
            id="year"
            value={formData.year}
            onChange={handleChange}
            name="year"
            type="number"
            required
          />
        </div>

        <div className="form-field">
          <label className="form-label" htmlFor="engine">
            Engine:
          </label>
          <input
            className="form-input"
            id="engine"
            value={formData.engine}
            onChange={handleChange}
            name="engine"
            type="text"
            required
          />
        </div>

        <div className="form-field">
          <label className="form-label" htmlFor="goal">
            Goal:
          </label>
          <input
            className="form-input"
            id="goal"
            value={formData.goal}
            onChange={handleChange}
            name="goal"
            type="text"
            required
          />
        </div>

        <div className="form-field">
          <label className="form-label" htmlFor="status">
            Status:
          </label>
          <select
            className="form-input form-select"
            id="status"
            value={formData.status}
            onChange={handleChange}
            name="status"
          >
            <option className="form-option" value="To do">
              To do
            </option>
            <option className="form-option" value="In progress">
              In progress
            </option>
            <option className="form-option" value="On-hold">
              On-hold
            </option>
            <option className="form-option" value="Complete">
              Complete
            </option>
          </select>
        </div>

        <div className="form-field">
          <label className="form-label" htmlFor="budget">
            Budget:
          </label>
          <input
            className="form-input"
            id="budget"
            value={formData.budget}
            onChange={handleChange}
            name="budget"
            type="number"
            required
          />
        </div>

        <div className="form-field">
          <label className="form-label" htmlFor="image">
            Image URL:
          </label>
          <input
            className="form-input"
            id="image"
            value={formData.image}
            onChange={handleChange}
            name="image"
            type="text"
          />
        </div>

        <button className="form-button" type="submit">
          Create Build
        </button>
      </form>
    </div>
  );
}

export default CreateBuild;
