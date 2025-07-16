import useQuery from "../api/useQuery";
import { useAuth } from "../auth/AuthContext";
import { Link } from "react-router";
import RoutineForm from "./RoutineForm";

export default function RoutinesPage() {
  const { data: routines, loading, error } = useQuery("/routines", "routines");
  const { token } = useAuth();

  if (loading) return <p>Loading routines...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <h1>Routines</h1>
      <ul>
        {routines.map((routine) => (
          <li key={routine.id}>
            <Link to={`/routines/${routine.id}`}>{routine.name}</Link>
          </li>
        ))}
      </ul>
      {token && <RoutineForm />}
    </>
  );
}
