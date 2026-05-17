import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";

function EditBuild() {
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

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function getBuild() {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/build/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setFormData(response.data.oneBuild);
      } catch (err) {
        console.log(err);
      }
    }

    getBuild();
  }, [id]);

  function handleChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/build/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate(`/builds/${id}`);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <h1>Edit Build</h1>

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

        <label htmlFor="make">Make:</label>
        <input
          id="make"
          value={formData.make}
          onChange={handleChange}
          name="make"
          type="text"
          required
        />

        <label htmlFor="model">Model:</label>
        <input
          id="model"
          value={formData.model}
          onChange={handleChange}
          name="model"
          type="text"
          required
        />

        <label htmlFor="year">Year:</label>
        <input
          id="year"
          value={formData.year}
          onChange={handleChange}
          name="year"
          type="number"
          required
        />

        <label htmlFor="engine">Engine:</label>
        <input
          id="engine"
          value={formData.engine}
          onChange={handleChange}
          name="engine"
          type="text"
          required
        />

        <label htmlFor="goal">Goal:</label>
        <input
          id="goal"
          value={formData.goal}
          onChange={handleChange}
          name="goal"
          type="text"
          required
        />

        <label htmlFor="status">Status:</label>
        <select
          id="status"
          value={formData.status}
          onChange={handleChange}
          name="status"
        >
          <option value="To do">To do</option>
          <option value="In progress">In progress</option>
          <option value="On-hold">On-hold</option>
          <option value="Complete">Complete</option>
        </select>

        <label htmlFor="budget">Budget:</label>
        <input
          id="budget"
          value={formData.budget}
          onChange={handleChange}
          name="budget"
          type="number"
          required
        />

        <label htmlFor="image">Image URL:</label>
        <input
          id="image"
          value={formData.image}
          onChange={handleChange}
          name="image"
          type="text"
        />

        <button type="submit">Update Build</button>
      </form>
    </div>
  );
}

export default EditBuild;