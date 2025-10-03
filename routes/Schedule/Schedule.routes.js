import express from "express";
import router from "express";
import {
  getAllSchedule,
  updateSchedule,
  deleteSchedule,
  getFullScheduleDetails,
  insertASchedule,
  insertAScheduleV2,
} from "../../controller/Schedule/Schedule.controller.js";

const ScheduleRouter = express.Router();

ScheduleRouter.get("/getAllSchedule", getAllSchedule);
ScheduleRouter.get("/getAllSchedule-full-details", getFullScheduleDetails);
ScheduleRouter.post("/insert-a-schedule", insertASchedule);
ScheduleRouter.post("/insert-a-schedule-v2", insertAScheduleV2);
ScheduleRouter.put("/updateSchedule/:id", updateSchedule);
ScheduleRouter.delete("/deleteSchedule/:id", deleteSchedule);

export default ScheduleRouter;
