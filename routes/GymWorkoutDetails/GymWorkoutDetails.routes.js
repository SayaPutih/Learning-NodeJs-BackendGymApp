import {
  updateOrInsertWorkoutDetailFromWorkoutId,
  deleteWorkoutDetailById,
} from "../../controller/GymWorkoutDetails/GymWorkoutDetails.controller.js";
import express from "express";

const GymWorkoutDetailRouter = express.Router();

GymWorkoutDetailRouter.post(
  "/update-or-insert-workout-detail/:id",
  updateOrInsertWorkoutDetailFromWorkoutId
);
GymWorkoutDetailRouter.delete(
  "/delete-workout-detail-by-id/:id",
  deleteWorkoutDetailById
);

export default GymWorkoutDetailRouter;
