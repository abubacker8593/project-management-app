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
import AddProjects from "./pages/AddProjects";
import ProtectedRoutes from "./components/protectedRoutes";
import { HiH1 } from "react-icons/hi2";

function App() {
  const [count, setCount] = useState("green");
  let { dark } = useSelector((state) => state.theme);
console.log("APP RENDER");
console.log("AUTH:", useSelector((state) => state.auth));
  return (
    <div className={dark ? "dark" : ""}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route element={<ProtectedRoutes />}>
        <Route path="/Home" element={<Dashboard />} />

        <Route path="/projects" element={<Projects />}>
          <Route path=":id" element={<ProjectDetails />} />
        </Route>
        <Route path="/AddProjects" element={<AddProjects />}></Route>

        </Route>
        <Route path="*" element={<h1>Not found</h1>}></Route>
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />
    </div>
  );
}

export default App;
