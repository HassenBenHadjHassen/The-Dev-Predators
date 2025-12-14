import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
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
    </Routes>
  );
}

export default App;
