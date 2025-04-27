import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/login/login";
import FormStudent from "../pages/students/formStudent";
import ProtectedRoute from "../routes/ProtectedRoute";

const LOGOUT_TIME = 30 * 60 * 1000; // 30 minutos en milisegundos

const PublicRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("userToken"));

  useEffect(() => {
    let logoutTimer;

    const resetTimer = () => {
      clearTimeout(logoutTimer);
      if (isAuthenticated) {
        logoutTimer = setTimeout(() => {
          localStorage.removeItem("userToken");
          setIsAuthenticated(false); // <-- actualizar estado
          window.location.href = "/";
        }, LOGOUT_TIME);
      }
    };

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);
    window.addEventListener("scroll", resetTimer);
    window.addEventListener("click", resetTimer);

    resetTimer();

    return () => {
      clearTimeout(logoutTimer);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      window.removeEventListener("scroll", resetTimer);
      window.removeEventListener("click", resetTimer);
    };
  }, [isAuthenticated]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/estudiantes" element={<FormStudent />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default PublicRoutes;
