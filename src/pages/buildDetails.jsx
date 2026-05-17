import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import axios from "axios";
import BuildStats from "../components/BuildStats";
function BuildDetails() {
  const [build, setBuild] = useState(null);
  const [items, setItems] = useState([]);

  const navigate = useNavigate();
  const { id } = useParams();

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

        setBuild(response.data.oneBuild);

        const itemResponse = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/item`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const buildItems = itemResponse.data.filter((item) => {
          const itemBuildId =
            typeof item.build === "object" ? item.build._id : item.build;

          return itemBuildId === id;
        });

        setItems(buildItems);
      } catch (err) {
        console.log(err);
      }
    }

    getBuild();
  }, [id]);

  async function handleDeleteBuild() {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/build/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      navigate("/dashboard");
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDeleteItem(itemId) {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/item/${itemId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setItems(items.filter((item) => item._id !== itemId));
    } catch (err) {
      console.log(err);
    }
  }

  if (!build) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <h1>{build.title}</h1>

      {build.image && <img src={build.image} alt={build.title} width="300" />}

      <p>Make: {build.make}</p>
      <p>Model: {build.model}</p>
      <p>Year: {build.year}</p>
      <p>Engine: {build.engine}</p>
      <p>Goal: {build.goal}</p>
      <p>Status: {build.status}</p>
      <p>Budget: {build.budget}</p>

      <BuildStats build={build} items={items} />


      <Link to="/dashboard">Back to Dashboard</Link>

      <br />

      <Link to={`/builds/${build._id}/edit`}>Edit Build</Link>

      <br />

      <Link to={`/builds/${build._id}/items/create`}>Add Item</Link>

      <br />

      <button onClick={handleDeleteBuild}>Delete Build</button>

      <h2>Items</h2>

      {items.length === 0 ? (
        <p>No items added yet.</p>
      ) : (
        <div>
          {items.map((item) => (
            <div key={item._id}>
              <h3>{item.title}</h3>
              <p>Category: {item.category}</p>
              <p>Status: {item.status}</p>
              <p>Cost: {item.cost}</p>
              <p>Notes: {item.notes}</p>

              <Link to={`/items/${item._id}/edit`}>Edit Item</Link>

              <br />

              <button onClick={() => handleDeleteItem(item._id)}>
                Delete Item
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BuildDetails;