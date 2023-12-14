import "./App.css";
import SignInPage from "./Pages/SignInPage/SignInPage";
import SignUpPage from "./Pages/SignUpPage/SignUpPage";
import HomePage from "./Pages/HomePage/HomePage";
import PrivateRoute from "./hooks/PrivateRoute";
import { Navigate } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={"/login"} />} />
        <Route path="/login" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route
          path="/contacts"
          element={<PrivateRoute components={<HomePage />} />}
        />
        <Route path="*" element={<Navigate to={"/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;
