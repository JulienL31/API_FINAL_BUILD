
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Users from "./pages/users";
import Catways from "./pages/catways";
import Reservations from "./pages/reservations";
import Home from "./pages/home";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./layout/Layout";
import NotFound from "./pages/notfound";


function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* Pages protégées avec Navbar persistante */}
        <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/catways" element={<Catways />} />
          <Route path="/reservations" element={<Reservations />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default AppRouter;
