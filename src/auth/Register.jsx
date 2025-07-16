import { useState } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router";

/** A form that allows users to register for a new account */
export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState(null);

  const tryRegister = async (e) => {
    // added
    e.preventDefault();
    const formData = new FormData(e.target);
    //^^^

    const username = formData.get("username");
    const password = formData.get("password");
    try {
      await register({ username, password });
      navigate("/");
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <>
      <h1>Register for an account</h1>
      <form onSubmit={tryRegister}>
        <label>
          Username
          <input type="text" name="username" />
        </label>
        <label>
          Password
          <input type="password" name="password" />
        </label>
        <button type="submit">Register</button>
        {error && <output>{error}</output>}
      </form>
      <p>
        <Link to="/login">Log in here</Link>
      </p>
    </>
  );
}
