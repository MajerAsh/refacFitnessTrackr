//import { useAuth } from "../auth/AuthContext";
import useQuery from "../api/useQuery";
import { Link } from "react-router";
//import useMutation from "../api/useMutation";

/** Shows a list of activities. */
export default function ActivityList() {
  const {
    data: activities,
    loading,
    error,
  } = useQuery("/activities", "activities");

  if (loading || !activities) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <ul>
      {activities.map((activity) => (
        <li key={activity.id}>
          <Link to={`/activities/${activity.id}`}>{activity.name}</Link>
        </li>
      ))}
    </ul>
  );
}

/*
/** Shows a single activity. Logged-in users will also see a delete button. 
function ActivityListItem({ activity }) {
  const { token } = useAuth();
  const {
    mutate: deleteActivity,
    loading,
    error,
  } = useMutation("DELETE", "/activities/" + activity.id, ["activities"]);

  return (
    <li>
      <p>{activity.name}</p>
      {token && (
        <button onClick={() => deleteActivity()}>
          {loading ? "Deleting" : error ? error : "Delete"}
        </button>
      )}
    </li>
  );
}
*/
