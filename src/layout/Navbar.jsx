import { useAuth } from "../auth/AuthContext";
import { Link } from "react-router"; //does navigation without setPage

/** Navbar with site navigation links */
export default function Navbar() {
  const { token, logout } = useAuth();

  return (
    <header>
      <p>Fitness Trackr</p>
      <nav>
        <Link to="/">Activities</Link>
        {token ? (
          <button onClick={logout}>Log out</button>
        ) : (
          <>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </nav>
    </header>
  );
}
