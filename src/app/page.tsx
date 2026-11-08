import Hero from "@/components/Hero";
import LibrarySection from "@/components/LibrarySection";
import { getWorkouts } from "@/utils/api";

const HomePage = async () => {
  const workouts = await getWorkouts();

  return (
    <>
      <Hero />
      <LibrarySection workouts={workouts} />
    </>
  );
};

export default HomePage;