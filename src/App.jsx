import { useState } from "react";
import { Routes, Route, Router } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./pages/user/Dashboard";
import { useSelector } from "react-redux";
import Projects from "./pages/user/Projects";
import ProjectDetails from "./pages/user/ProjectDetails";
import AddProjects from "./pages/user/AddProjects";
import ProtectedRoutes from "./components/protectedRoutes";
import { HiH1 } from "react-icons/hi2";
import Profile from "./pages/user/Profile";
import AdminRoutes from "./components/adminroute";
import AdminDashboard from "./pages/admin/Admindashboard";
import UserDetails from "./pages/admin/userdetails";

function App() {
  const [count, setCount] = useState("green");
  let { dark } = useSelector((state) => state.theme);
  console.log("APP RENDER");
  console.log(
    "AUTH:",
    useSelector((state) => state.auth),
  );
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
          <Route path="/Profile" element={<Profile />}></Route>
        </Route>
        <Route element={<AdminRoutes />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/users/:id" element={<UserDetails />} />
        </Route>

        <Route path="*" element={<h1>Not found</h1>}></Route>
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />
    </div>
  );
}

export default App;
