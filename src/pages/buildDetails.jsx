import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import axios from "axios";
import BuildStats from "../components/buildStats";

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
    return <h1 className="loading-text">Loading...</h1>;
  }

  return (
    <div className="details-page build-details-page">
      <div className="build-card build-details-card">
        <h1 className="page-title build-details-title">{build.title}</h1>

        {build.image && (
          <img className="build-image" src={build.image} alt={build.title} />
        )}

        <div className="build-details-grid">
          <p className="detail-row">
            <span className="detail-label">Make:</span> {build.make}
          </p>
          <p className="detail-row">
            <span className="detail-label">Model:</span> {build.model}
          </p>
          <p className="detail-row">
            <span className="detail-label">Year:</span> {build.year}
          </p>
          <p className="detail-row">
            <span className="detail-label">Engine:</span> {build.engine}
          </p>
          <p className="detail-row">
            <span className="detail-label">Goal:</span> {build.goal}
          </p>
          <p className="detail-row">
            <span className="detail-label">Status:</span> {build.status}
          </p>
          <p className="detail-row">
            <span className="detail-label">Budget:</span> {build.budget} BHD
          </p>
        </div>

        <BuildStats build={build} items={items} />

        <div className="page-actions build-actions">
          <Link className="action-link" to="/dashboard">
            Back to Dashboard
          </Link>
          <Link className="action-link" to={`/builds/${build._id}/edit`}>
            Edit Build
          </Link>
          <Link
            className="action-link"
            to={`/builds/${build._id}/items/create`}
          >
            Add Item
          </Link>
          <button className="danger-btn action-button" onClick={handleDeleteBuild}>
            Delete Build
          </button>
        </div>
      </div>

      <h2 className="items-title">Items</h2>

      {items.length === 0 ? (
        <p className="empty-text items-empty">No items added yet.</p>
      ) : (
        <div className="items-list">
          {items.map((item) => (
            <div className="item-card" key={item._id}>
              <h3 className="item-title">{item.title}</h3>

              <p className="item-info">
                <span className="item-label">Category:</span> {item.category}
              </p>
              <p className="item-info">
                <span className="item-label">Status:</span> {item.status}
              </p>
              <p className="item-info">
                <span className="item-label">Cost:</span> {item.cost} BHD
              </p>
              <p className="item-info">
                <span className="item-label">Notes:</span> {item.notes}
              </p>

              <div className="item-actions">
                <Link className="action-link" to={`/items/${item._id}/edit`}>
                  Edit Item
                </Link>
                <button
                  className="danger-btn action-button"
                  onClick={() => handleDeleteItem(item._id)}
                >
                  Delete Item
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BuildDetails;
