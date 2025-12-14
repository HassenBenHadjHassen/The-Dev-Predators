import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import SelectCompanionPage from "./pages/SelectCompanionPage";
import CheckInPage from "./pages/CheckInPage";
import DashboardPage from "./pages/DashboardPage";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/login"
        element={
          <div id="login-section">
            <Login />
          </div>
        }
      />
      <Route
        path="/signup"
        element={
          <div id="login-section">
            <SignUp />
          </div>
        }
      />
      <Route path="/select-companion" element={<SelectCompanionPage />} />
      <Route path="/check-in" element={<CheckInPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
    </Routes>
  );
}

export default App;
