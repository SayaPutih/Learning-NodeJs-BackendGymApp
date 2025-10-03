import {getAllCodeAndProjects,getAllProjects,getProjectByStackId} from "../../controller/CodeList/CodeList.controller.js";
import router from "express";
import express from "express";

const CodeListRouter = express.Router();

CodeListRouter.get("/Get-all-Code-and-projects",getAllCodeAndProjects);
CodeListRouter.get("/Get-all-projects",getAllProjects);
CodeListRouter.get("/Get-Code-by-id/:id",getProjectByStackId);

export default CodeListRouter;

// import Router from "express";
// import express from "express";
// import {
//   getAllPainting,
//   insertNewPainter,
//   insertNewPainterV2,
//   insertNewPainterV3,
// } from "../../controller/other/painter.controller.js";

// const routeTo = express.Router();

// routeTo.get("/getAllPainting", getAllPainting);
// routeTo.post("/insertNewPainter", insertNewPainter);
// routeTo.post("/insert-a-new-painting",insertNewPaintingV2);
// routeTo.post("/insert-a-new-painting",insertNewPaintingV3);

// export default routeTo;
