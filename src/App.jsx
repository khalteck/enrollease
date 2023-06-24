import { Routes, Route } from "react-router-dom";
import "./index.css";
import { lazy, Suspense } from "react";
import Loader from "./components/Loader";
// import { useAppContext } from "./contexts/AppContext";
import Homepage from "./pages/Homepage";

const Register = lazy(() => import("./pages/Register"));
const Login = lazy(() => import("./pages/Login"));
const About = lazy(() => import("./pages/About"));

function App() {
  // const { userData } = useAppContext();
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* <Route
          path="/student-dashboard"
          element={userData?.student_data ? <StudentDashboard /> : <Login />}
        />
        <Route
          path="/student-payment"
          element={userData?.student_data ? <StudentPayment /> : <Login />}
        />
        <Route
          path="/staff-dashboard"
          element={userData?.bursar_data ? <StaffDashboard /> : <StaffLogin />}
        />
        <Route
          path="/staff-review"
          element={userData?.bursar_data ? <StaffReview /> : <StaffLogin />}
        /> */}
      </Routes>
    </Suspense>
  );
}

export default App;
