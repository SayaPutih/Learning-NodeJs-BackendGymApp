import express from "express";
import {
  getAllScheduleGymPlan,
  insertGymPlan,
  updateGymPlan,
  deleteGymPlanById,
} from "../../controller/ScheduleGymPlan/ScheduleGymPlan.controller.js";

const ScheduleGymPlanRoute = express.Router();

ScheduleGymPlanRoute.get("/Get-All-Scheduled-Workout", getAllScheduleGymPlan);
ScheduleGymPlanRoute.post("/insert-Scheduled-Workout", insertGymPlan);
ScheduleGymPlanRoute.put("/update-Scheduled-Workout/:id", updateGymPlan);
ScheduleGymPlanRoute.delete(
  "/delete-gym-schedule-by-id/:id",
  deleteGymPlanById
);

export default ScheduleGymPlanRoute;
