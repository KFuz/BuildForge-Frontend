import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";

function CreateItem() {
  const [formData, setFormData] = useState({
    title: "",
    category: "Mechanical",
    status: "Not purchased",
    cost: "",
    notes: "",
  });

  const { buildId } = useParams();
  const navigate = useNavigate();

  function handleChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/item`,
        {
          ...formData,
          build: buildId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate(`/builds/${buildId}`);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="form-page create-item-page">
      <h1 className="page-title form-title">Add Item</h1>

      <form className="item-form" onSubmit={handleSubmit}>
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
          <label className="form-label" htmlFor="category">
            Category:
          </label>
          <select
            className="form-input form-select"
            id="category"
            value={formData.category}
            onChange={handleChange}
            name="category"
          >
            <option className="form-option" value="Body">
              Body
            </option>
            <option className="form-option" value="Electrical">
              Electrical
            </option>
            <option className="form-option" value="Mechanical">
              Mechanical
            </option>
            <option className="form-option" value="Suspension">
              Suspension
            </option>
          </select>
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
            <option className="form-option" value="Not purchased">
              Not purchased
            </option>
            <option className="form-option" value="Purchased">
              Purchased
            </option>
          </select>
        </div>

        <div className="form-field">
          <label className="form-label" htmlFor="cost">
            Cost:
          </label>
          <input
            className="form-input"
            id="cost"
            value={formData.cost}
            onChange={handleChange}
            name="cost"
            type="number"
            required
          />
        </div>

        <div className="form-field">
          <label className="form-label" htmlFor="notes">
            Notes:
          </label>
          <textarea
            className="form-input form-textarea"
            id="notes"
            value={formData.notes}
            onChange={handleChange}
            name="notes"
          />
        </div>

        <button className="form-button" type="submit">
          Add Item
        </button>
      </form>
    </div>
  );
}

export default CreateItem;
