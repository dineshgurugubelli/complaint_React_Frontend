import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Home from "../pages/Home";
import Complaints from "../pages/Complaints";
import ComplaintDetails from "../pages/ComplaintDetails";
import AddComplaint from "../pages/AddComplaint";
import EditComplaint from "../pages/EditComplaint";
import Important from "../pages/Important";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Logout from "../pages/Logout";
import NotFound from "../pages/NotFound";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/complaints" element={<Complaints />} />
      <Route path="/complaints/:id" element={<ComplaintDetails />} />
      <Route
        path="/add-complaint"
        element={
          <ProtectedRoute>
            <AddComplaint />
          </ProtectedRoute>
        }
      />
      <Route
        path="/edit-complaint/:id"
        element={
          <ProtectedRoute>
            <EditComplaint />
          </ProtectedRoute>
        }
      />
      <Route path="/important" element={<Important />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
