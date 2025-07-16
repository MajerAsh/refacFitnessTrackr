import { Routes, Route } from "react-router";
import Layout from "./layout/Layout"; //<Layout> uses <Outlet /> from react-router
import ActivityDetails from "./activities/ActivityDetails";
import Register from "./auth/Register";
import Login from "./auth/Login";
import ActivitiesPage from "./activities/ActivitiesPage";
import Error404 from "./Error404.jsx";
import RoutinesPage from "./routines/RoutinesPage";
import RoutineDetails from "./routines/RoutineDetails";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<ActivitiesPage />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="activities/:activityId" element={<ActivityDetails />} />
        <Route path="routines" element={<RoutinesPage />} />
        <Route path="routines/:routineId" element={<RoutineDetails />} />
        <Route path="*" element={<Error404 />} />
      </Route>
    </Routes>
  );
}
/* Prior yellow curlies^ can cutt:
  {
  const { page } = usePage();

 // if (page === "register") return <Register />;
  //if (page === "login") return <Login />;
  //if (page === "activities") return <ActivitiesPage />;

  return <Error404 />;
}*/
