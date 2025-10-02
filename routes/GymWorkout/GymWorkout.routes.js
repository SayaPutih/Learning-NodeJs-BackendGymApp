import express from "express";
import { upload } from "../../uploads/upload.js";
import {
  insertAGymWorkout,
  getAllWorkouts,
  getAllWorkoutsByDay,
  getWorkoutById,
  UpdateWorkoutById,
  DeleteWorkoutById,
} from "../../controller/GymWorkout/GymWorkout.controller.js";

const GymWorkoutRouter = express.Router();

GymWorkoutRouter.get("/get-all-gym-workout", getAllWorkouts);
GymWorkoutRouter.post(
  "/insert-a-gym-workout",
  upload.single("workoutPicture"),
  insertAGymWorkout
);
GymWorkoutRouter.get(
  "/get-all-gym-workout-by-day/:dayname",
  getAllWorkoutsByDay
);
GymWorkoutRouter.get("/get-workout-by-id/:id", getWorkoutById);
GymWorkoutRouter.put(
  "/update-workout-by-id/:id",
  upload.single("workoutPicture"),
  UpdateWorkoutById
);
GymWorkoutRouter.delete("/delete-workout-by-id/:id", DeleteWorkoutById);

export default GymWorkoutRouter;
