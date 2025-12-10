import express from "express";
import router from "express";
import {
  getGymDetailByWorkoutId,
  insertGymDetailByWorkoutId,
  editGymDetailById,
  deleteGymDetailBytId,
  getGymDetailById,
} from "../../controller/GymDetails/GymDetail.controller.js";

const GymDetailRouter = express.Router();

GymDetailRouter.get(
  "/get-gym-detail-by-workout-id/:id",
  getGymDetailByWorkoutId
);
GymDetailRouter.get("/get-gym-detail-by-id/:id", getGymDetailById);
GymDetailRouter.post(
  "/insert-gym-detail-by-workout-id/:id",
  insertGymDetailByWorkoutId
);
GymDetailRouter.put("/edit-by-id-gymdetail/:id", editGymDetailById);
GymDetailRouter.delete("/delete-by-id-gymdetail/:id", deleteGymDetailBytId);

export default GymDetailRouter;
