import useMutation from "../api/useMutation";

export default function RoutineForm() {
  const {
    mutate: createRoutine,
    loading,
    error,
  } = useMutation("POST", "/routines", ["routines"]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const goal = formData.get("goal");
    createRoutine({ name, goal });
  };

  return (
    <>
      <h2>Create a New Routine</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name <input name="name" required />
        </label>
        <label>
          Goal <input name="goal" required />
        </label>
        <button type="submit">
          {loading ? "Creating..." : "Create Routine"}
        </button>
        {error && <output>{error}</output>}
      </form>
    </>
  );
}
