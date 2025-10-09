import { getAllGymList,getAllGymListWithDay,getAllGymDetails,getAllDaysWithWorkout } from "../../controller/GymList/GymList.controller.js";
import express from "express";
import router from "express";

const gymListRouter = express.Router();

gymListRouter.get("/get-all-workout-with-details", getAllGymList);
gymListRouter.get("/get-all-details", getAllGymDetails);
gymListRouter.get("/get-all-days-and-workout",getAllDaysWithWorkout);
gymListRouter.get("/get-all-workout-with-details-days", getAllGymListWithDay);


export default gymListRouter;

// import express from "express";
// import {
// 	getDataByLimit,
// 	getDataByCompanyAndUnitsSold,
// } from "../controller/schedule.controller.js";

// const route = express.Router()

// route.get("/get-data-limit/:number",getDataByLimit);

// route.get("/get-data-comp-unitsSold/:company",getDataByCompanyAndUnitsSold);
// route.get("/get-data-comp-unitsSold/:company/:units_sold",getDataByCompanyAndUnitsSold);
// //express 4 ->route.get("/get-data-comp-unitsSold/:company/:units_sold?",getDataByCompanyAndUnitsSold);

// export default route;
