import express from "express";
import { getDayWithHowMuchWorkout,getMuscleTargeted } from "../../controller/StatisticsGym/StatisticsGym.controller.js";

const StatisticsGymRoute = express.Router();

StatisticsGymRoute.get("/get-statistics-gym-day", getDayWithHowMuchWorkout);
StatisticsGymRoute.get("/get-gym-detail",getMuscleTargeted);

export default StatisticsGymRoute;
