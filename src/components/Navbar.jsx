import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const important = useSelector((state) => state.important);
  const { user } = useAuth();

  return (
    <nav>
      <NavLink to="/" end>
        Home
      </NavLink>
      <NavLink to="/complaints">Complaints</NavLink>
      <NavLink to="/important">Important ({important.length})</NavLink>

      {!user && (
        <>
          <NavLink to="/signup">Signup</NavLink>
          <NavLink to="/login">Login</NavLink>
        </>
      )}

      {user && <NavLink to="/logout">Logout</NavLink>}
    </nav>
  );
}

export default Navbar;
