import Hero from "@/components/HeroBanner";
import LibrarySection from "@/components/Library";
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