import { Workout } from "@/types";

const API_URL = "https://api.abcz.workers.dev/api/fitlog";

// Get all workouts
export const getWorkouts = async (): Promise<Workout[]> => {
  try {
    const response = await fetch(API_URL, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch workouts");
    }

    const data: Workout[] = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching workouts:", error);
    return [];
  }
};

// Get single workout by ID
export const getWorkoutById = async (
  id: string,
): Promise<Workout | null> => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      cache: "no-store",
    });

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      throw new Error("Failed to fetch workout details");
    }

    const data: Workout = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching workout details:", error);
    return null;
  }
};