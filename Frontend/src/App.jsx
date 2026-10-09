import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./pages/login";
import Home from "./pages/home";
import Student from "./pages/student";
import { isLoggedIn } from "./api/authService";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/home"
          element={isLoggedIn() ? <Home /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/student"
          element={
            isLoggedIn() ? <Student /> : <Navigate to="/login" replace />
          }
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
