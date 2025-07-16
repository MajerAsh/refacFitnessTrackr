import { useParams, useNavigate } from "react-router";
import useQuery from "../api/useQuery";
import useMutation from "../api/useMutation";
import { useAuth } from "../auth/AuthContext";
import SetForm from "./SetForm";

export default function RoutineDetails() {
  const { routineId } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();

  const { data: routine, loading, error } = useQuery(`/routines/${routineId}`);

  const {
    mutate: deleteRoutine,
    loading: deleting,
    error: deleteError,
  } = useMutation("DELETE", `/routines/${routineId}`, ["routines"]);

  const handleDelete = async () => {
    try {
      await deleteRoutine();
      navigate("/routines");
    } catch {
      // Let deleteError handle display
    }
  };

  if (loading || !routine) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <h1>{routine.name}</h1>
      <p>
        <strong>Goal:</strong> {routine.goal}
      </p>
      <p>
        <strong>Creator:</strong> {routine.creatorName}
      </p>

      {token && (
        <>
          <button onClick={handleDelete}>
            {deleting ? "Deleting..." : "Delete Routine"}
          </button>
          {deleteError && (
            <p style={{ color: "red", marginTop: "0.5em" }}>{deleteError}</p>
          )}
        </>
      )}

      <h2>Sets</h2>
      {routine.activities.length ? (
        <ul>
          {routine.activities.map((activity) => (
            <li key={activity.routineActivityId}>
              <strong>{activity.name}</strong>: {activity.count} reps
              {token && <DeleteSetButton id={activity.routineActivityId} />}
            </li>
          ))}
        </ul>
      ) : (
        <p>This routine has no sets yet. Add one below!</p>
      )}

      {token && <SetForm />}
    </>
  );
}

function DeleteSetButton({ id }) {
  const {
    mutate: deleteSet,
    loading,
    error,
  } = useMutation("DELETE", `/routine_activities/${id}`, ["routines"]);

  return (
    <>
      <button onClick={() => deleteSet()}>
        {loading ? "Removing..." : "Remove"}
      </button>
      {error && <p style={{ color: "red", marginTop: "0.25em" }}>{error}</p>}
    </>
  );
}
