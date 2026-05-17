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
    <div>
      <h1>Welcome {user.username}</h1>

      <h2>Your Builds</h2>

      <Link to="/builds/create">Create New Build</Link>

      {builds.length === 0 ? (
        <p>No builds yet.</p>
      ) : (
        <div>
          {builds.map((build) => (
            <div key={build._id}>
              <h3>
                <Link to={`/builds/${build._id}`}>{build.title}</Link>
              </h3>

              <p>
                {build.year} {build.make} {build.model}
              </p>

              <p>Status: {build.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;