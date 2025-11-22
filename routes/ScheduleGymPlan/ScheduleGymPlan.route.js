import express from "express";
import {
  getAllScheduleGymPlan,
  insertGymPlan,
  updateGymPlan,
} from "../../controller/ScheduleGymPlan/ScheduleGymPlan.controller.js";

const ScheduleGymPlanRoute = express.Router();

ScheduleGymPlanRoute.get("/Get-All-Scheduled-Workout", getAllScheduleGymPlan);
ScheduleGymPlanRoute.post("/insert-Scheduled-Workout", insertGymPlan);
ScheduleGymPlanRoute.put("/update-Scheduled-Workout/:id", updateGymPlan);

export default ScheduleGymPlanRoute;
