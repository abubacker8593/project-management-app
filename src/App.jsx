import { useState } from "react";
import { Routes, Route, Router } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./pages/Dashboard";
import { useSelector } from "react-redux";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";

function App() {
  const [count, setCount] = useState("green");
  let { dark } = useSelector((state) => state.theme);

  return (
    <div className={dark ? "dark" : ""}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Home" element={<Dashboard />} />

        <Route path="/projects" element={<Projects />}>
          <Route path=":id" element={<ProjectDetails />} />
        </Route>
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />
    </div>
  );
}

export default App;
