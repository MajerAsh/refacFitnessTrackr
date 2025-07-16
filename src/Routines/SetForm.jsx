import { useParams } from "react-router";
import useQuery from "../api/useQuery";
import useMutation from "../api/useMutation";

export default function SetForm() {
  const { routineId } = useParams();
  const { data: activities } = useQuery("/activities", "activities");

  const {
    mutate: addSet,
    loading,
    error,
  } = useMutation("POST", `/routines/${routineId}/activities`, ["routines"]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const activityId = formData.get("activityId");
    const count = formData.get("count");
    addSet({ activityId: Number(activityId), count: Number(count) });
  };

  return (
    <>
      <h2>Add a Set</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Activity:
          <select name="activityId" required>
            {activities?.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Count:
          <input type="number" name="count" required />
        </label>
        <button type="submit">{loading ? "Adding..." : "Add Set"}</button>
        {error && <output>{error}</output>}
      </form>
    </>
  );
}
