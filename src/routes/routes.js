import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from '../pages/login/login';
import FormStudent from "../pages/students/formStudent";

function PublicRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/estudiantes" element={<FormStudent />} />
            </Routes>
        </BrowserRouter>
    );
}

export default PublicRoutes