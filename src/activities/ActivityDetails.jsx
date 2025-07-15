// New component for pt1#6
import { useParams, useNavigate } from "react-router";
import useQuery from "../api/useQuery";
import useMutation from "../api/useMutation";
import { useAuth } from "../auth/AuthContext";

export default function ActivityDetails() {
  const { activityId } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();

  const {
    data: activity,
    loading,
    error,
  } = useQuery(`/activities/${activityId}`);

  const {
    mutate: deleteActivity,
    loading: deleting,
    error: deleteError,
  } = useMutation("DELETE", `/activities/${activityId}`, ["activities"]);

  const handleDelete = async () => {
    await deleteActivity();
    navigate("/");
  };

  if (loading || !activity) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <h1>{activity.name}</h1>
      <p>{activity.description}</p>
      <p>
        <strong>Creator:</strong> {activity.creatorName}
      </p>
      {token && (
        <button onClick={handleDelete}>
          {deleting
            ? "Deleting..."
            : deleteError
            ? deleteError
            : "Delete Activity"}
        </button>
      )}
    </>
  );
}
