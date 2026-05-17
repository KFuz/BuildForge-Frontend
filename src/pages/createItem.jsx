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
    <div>
      <h1>Add Item</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          value={formData.title}
          onChange={handleChange}
          name="title"
          type="text"
          required
        />

        <label htmlFor="category">Category:</label>
        <select
          id="category"
          value={formData.category}
          onChange={handleChange}
          name="category"
        >
          <option value="Body">Body</option>
          <option value="Electrical">Electrical</option>
          <option value="Mechanical">Mechanical</option>
          <option value="Suspension">Suspension</option>
        </select>

        <label htmlFor="status">Status:</label>
        <select
          id="status"
          value={formData.status}
          onChange={handleChange}
          name="status"
        >
          <option value="Not purchased">Not purchased</option>
          <option value="Purchased">Purchased</option>
        </select>

        <label htmlFor="cost">Cost:</label>
        <input
          id="cost"
          value={formData.cost}
          onChange={handleChange}
          name="cost"
          type="number"
          required
        />

        <label htmlFor="notes">Notes:</label>
        <textarea
          id="notes"
          value={formData.notes}
          onChange={handleChange}
          name="notes"
        />

        <button type="submit">Add Item</button>
      </form>
    </div>
  );
}

export default CreateItem;