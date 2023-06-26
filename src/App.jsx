import { Routes, Route } from "react-router-dom";
import "./index.css";
import { lazy, Suspense } from "react";
import Loader from "./components/Loader";
// import { useAppContext } from "./contexts/AppContext";
import Homepage from "./pages/Homepage";
import { useAppContext } from "./contexts/AppContext";

const Register = lazy(() => import("./pages/Register"));
const Login = lazy(() => import("./pages/Login"));
const About = lazy(() => import("./pages/About"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Payment = lazy(() => import("./pages/Payment"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));

function App() {
  const { userData } = useAppContext();
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={userData?.role === "user" ? <Dashboard /> : <Login />}
        />
        <Route
          path="/payment"
          element={userData?.role === "user" ? <Payment /> : <Login />}
        />
        <Route
          path="/admin-dashboard"
          element={userData?.role === "admin" ? <AdminDashboard /> : <Login />}
        />
      </Routes>
    </Suspense>
  );
}

export default App;
