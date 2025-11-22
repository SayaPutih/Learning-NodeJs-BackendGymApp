import express from "express";
import mysql from "mysql2";
import seq from "./config/database.js";
import "module-alias/register.js";

import cors from "cors";
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

//Schedule Update
//Schedule Get
//Schedule Delete

//Code Details Update
//Code Details Delete

import {
  ScheduleDisciplineModel,
  CodeDetailModel,
  CodeDisciplineModel,
  GymDetailModel,
  GymWorkoutDisciplineModel,
  GymDayDisciplineModel,
} from "./models/associations/association.js";

const PORT = 5000;
const app = express();
app.use(express.json());
app.use(cors(corsOptions));

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/images", express.static(path.join(__dirname, "images")));

import CodeStackRouter from "./routes/CodeStack/CodeStack.route.js";
app.use("/api/v3/CodeStack", CodeStackRouter);

import GymDaysRouter from "./routes/GymDays/GymDays.route.js";
app.use("/api/v3/GymDays", GymDaysRouter);

import GymWorkoutRouter from "./routes/GymWorkout/GymWorkout.routes.js";
app.use("/api/v3/GymWorkout", GymWorkoutRouter);

import CodeDetailsRouter from "./routes/CodeDetails/CodeDetails.routes.js";
app.use("/api/v3/CodeDetails", CodeDetailsRouter);

import ScheduleRouter from "./routes/Schedule/Schedule.routes.js";
app.use("/api/v3/Schedule", ScheduleRouter);

import gymListRouter from "./routes/GymList/GymList.route.js";
app.use("/api/v3/GymList", gymListRouter);

import gymDetailRouter from "./routes/GymDetails/GymDetail.route.js";
app.use("/api/v3/GymDetail", gymDetailRouter);

import CodeListRouter from "./routes/CodeList/CodeList.route.js";
app.use("/api/v3/CodeList", CodeListRouter);

import GymWorkoutDetailRouter from "./routes/GymWorkoutDetails/GymWorkoutDetails.routes.js";
app.use("/api/v3/GymWorkoutDetails", GymWorkoutDetailRouter);

import ScheduleGymPlanRoute from "./routes/ScheduleGymPlan/ScheduleGymPlan.route.js";
app.use("/api/v3/ScheduleGymPlan", ScheduleGymPlanRoute);

seq
  .authenticate()
  .then(() => {
    console.log("Connected To the Database Master Evan");
    return seq.sync({ alter: true }); //Creates A Table When It doesnt Exist
  })
  .then(() => {
    console.log("Tables Synced.");
  })
  .catch((err) => {
    console.error("Error : " + err);
  });

app.listen(PORT, () => {
  console.log(`Server Running on ${PORT}`);
});

//Creating The Database
// import GymDayDisciplineModel from './models/routine/GymDayDisciplineModel.js';
// import GymWorkoutDisciplineModel from './models/routine/GymWorkoutDisciplineModel.js';
// import GymDetailModel from './models/routine/GymDetailModel.js';
// import CodeDetailModel from './models/routine/CodeDetailModel.js';
// import CodeDisciplineModel from './models/routine/CodeDisciplineModel.js';
// import ScheduleDisciplineModel from './models/routine/ScheduleDisciplineModel.js'
//ga otomatis bikin sync table -> Standarnya emang gitu -gpt4.0

// const con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "discipline3",
// });
// import defaultRouter from "./routes/default.route.js";
// app.use("/api/v1/testing", defaultRouter);
// import coffeeRouter from "./routes/schedule.route.js";
// app.use("/api/v1/df_coffee", coffeeRouter);

// import paintingRouter from "./routes/other/painter.route.js";
// app.use("/api/v2/paint", paintingRouter);
