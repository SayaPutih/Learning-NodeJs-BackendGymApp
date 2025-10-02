import express from "express";
import {
  CreateAGymDay,
  findAllGymDays,
  findGymDayByName,
  updateGymDayById,
  deleteGymDayById,
} from "../../controller/GymDays/GymDays.controller.js";

const GymDaysRouter = express.Router();

GymDaysRouter.post("/create-a-gym-day", CreateAGymDay);
GymDaysRouter.get("/find-all-gym-day", findAllGymDays);
GymDaysRouter.get("/find-gym-day-by-name/:gymName", findGymDayByName);
GymDaysRouter.put("/update-gym-day-by-id/:id", updateGymDayById);
GymDaysRouter.delete("/delete-gym-day-by-id/:id", deleteGymDayById);

export default GymDaysRouter;
