import express from "express";
import mysql from "mysql2";
import seq from "./config/database.js";

import cors from "cors";
const corsOptions = {
  origin: "http://localhost:5173", // frontend origin (e.g., Vite dev server)
  credentials: true,
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

app.get("/get-full-details", async (req, res) => {
  try {
    const result = await ScheduleDisciplineModel.findAll({
      attributes: ["date", ["DoaPagi", "Doa"], ["CuciPiring", "CcPiring"]],

      include: [
        {
          model: CodeDetailModel,
          as: "ListCodeDetails",
          attributes: ["detail"],

          include: [
            {
              model: CodeDisciplineModel,
              as: "StackDetails",
              attributes: ["stackName"],
            },
          ],
        },
      ],
    });

    if (!result)
      return res.status(404).json("Nothing in the Database Master Evan");
    return res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/insert-schedule", async (req, res) => {
  try {
    const tempInserter = await ScheduleDisciplineModel.create(req.body);
    res.status(200).json(tempInserter);
  } catch (err) {
    console.error(`Error Apa -> : ${err}`);
    res.status(500).json({ message: err.message });
  }
});
app.post("/insert-beta", async (req, res) => {
  try {
    const tempInserter = {
      ...req.body,
      date: new Date(),
    };
    const inserted = await ScheduleDisciplineModel.create(tempInserter);
    res.status(200).json(inserted);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
app.post("/insert-stack", async (req, res) => {
  try {
    const tempInserter = await CodeDisciplineModel.create(req.body);
    res
      .status(200)
      .json(`Created new Code Master Evan : ${tempInserter.stackName}`);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
app.post("/insert-code-details", async (req, res) => {
  try {
    const tempInserter = req.body;

    const tableExists = await ScheduleDisciplineModel.findByPk(
      tempInserter.TableId
    );
    const codeStackExists = await CodeDisciplineModel.findByPk(
      tempInserter.CodeId
    );

    if (tableExists == null)
      return res
        .status(404)
        .json(`Nothing with table Id ${tempInserter.TableId} M Evan`);
    if (codeStackExists == null)
      return res
        .status(404)
        .json(`Nothing with Code Id ${tempInserter.CodeId} M Evan`);

    const inserter = await CodeDetailModel.create(tempInserter);
    res
      .status(200)
      .json(
        `Created new Detail for ${codeStackExists.stackName} -> ${inserter.detail}`
      );
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

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
