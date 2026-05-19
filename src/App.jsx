import { useState } from "react";
import { Routes, Route, Navigate } from "react-router";
import Homepage from "./pages/Homepage";
import SignUp from "./pages/Signup";
import SignIn from "./pages/SignIn";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import CreateBuild from "./pages/createBuild";
import BuildDetails from "./pages/buildDetails";
import EditBuild from "./pages/editBuild";
import CreateItem from "./pages/createItem";
import EditItem from "./pages/editItem";
// import Layout from './Layout';


function getUserFromToken() {
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }

  try {
    return JSON.parse(atob(token.split(".")[1])).payload;
  } catch (err) {
    console.error("Invalid token:", err);
    localStorage.removeItem("token");
    return null;
  }
}

function App() {
  const [user, setUser] = useState(getUserFromToken);

  return (
    <div>
      <Navbar user={user} setUser={setUser} />

      <Routes>
        <Route path="/" element={<Homepage />} />

        <Route
          path="/sign-up"
          element={!user ? <SignUp /> : <Navigate to="/dashboard" />}
        />

        <Route
          path="/sign-in"
          element={
            !user ? <SignIn setUser={setUser} /> : <Navigate to="/dashboard" />
          }
        />

        <Route
          path="/dashboard"
          element={
            user ? <Dashboard user={user} /> : <Navigate to="/sign-in" />
          }
        />

        <Route
          path="/builds/create"
          element={user ? <CreateBuild /> : <Navigate to="/sign-in" />}
        />

        <Route
          path="/builds/:id"
          element={user ? <BuildDetails /> : <Navigate to="/sign-in" />}
        />

        <Route
          path="/builds/:id/edit"
          element={user ? <EditBuild /> : <Navigate to="/sign-in" />}
        />

        <Route
          path="/builds/:buildId/items/create"
          element={user ? <CreateItem /> : <Navigate to="/sign-in" />}
        />

        <Route
          path="/items/:id/edit"
          element={user ? <EditItem /> : <Navigate to="/sign-in" />}
        />
      </Routes>
    </div>
  );
}

export default App;
