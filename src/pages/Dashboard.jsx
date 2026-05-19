import { useEffect, useState } from "react";
import { Link } from "react-router";
import axios from "axios";

function Dashboard({ user }) {
  const [builds, setBuilds] = useState([]);

  useEffect(() => {
    async function getBuilds() {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/build`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setBuilds(response.data);
      } catch (err) {
        console.log(err);
      }
    }

    getBuilds();
  }, []);

  return (
    <div className="dashblock dashboard-page">
      <div className="dashboard-header">
        <div className="dashboard-title-block">
          <h1 className="page-title dashboard-title">Welcome {user.username}</h1>
          <h2 className="dashheading dashboard-subtitle">Your Builds</h2>
        </div>

        <Link className="create-link dashboard-create-link" to="/builds/create">
          Create New Build
        </Link>
      </div>

      {builds.length === 0 ? (
        <p className="empty-text dashboard-empty">No builds yet.</p>
      ) : (
        <div className="builds-list dashboard-builds-list">
          {builds.map((build) => (
            <div key={build._id} className="build-row dashboard-build-row">
              <div className="build-info dashboard-build-info">
                <h3 className="build-title">
                  <Link className="build-link" to={`/builds/${build._id}`}>
                    {build.title}
                  </Link>
                </h3>
                <p className="build-meta">
                  {build.year} {build.make} {build.model}
                </p>
              </div>

              <div className="build-status dashboard-build-status">
                <span className="status-label">Status:</span>
                <span className="status-value">{build.status}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
