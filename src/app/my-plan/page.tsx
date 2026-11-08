import MyPlanSection from "@/components/MyPlanSection";
import { getWorkouts } from "@/utils/api";

const MyPlanPage = async () => {
  const workouts = await getWorkouts();

  return <MyPlanSection workouts={workouts} />;
};

export default MyPlanPage;