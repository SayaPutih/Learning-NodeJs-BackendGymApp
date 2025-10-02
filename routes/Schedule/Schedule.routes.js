import express from "express";
import router from "express";
import {
  getAllSchedule,
  updateSchedule,
  deleteSchedule,
} from "../../controller/Schedule/Schedule.controller.js";

const ScheduleRouter = express.Router();

ScheduleRouter.get("/getAllSchedule", getAllSchedule);
ScheduleRouter.put("/updateSchedule/:id", updateSchedule);
ScheduleRouter.delete("/deleteSchedule/:id", deleteSchedule);

export default ScheduleRouter;
