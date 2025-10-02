import Router from "express";
import express from "express";
import {
  getAllPainting,
  insertNewPainter,
  insertNewPainterV2,
  insertNewPainterV3,
} from "../../controller/other/painter.controller.js";

const routeTo = express.Router();

routeTo.get("/getAllPainting", getAllPainting);
routeTo.post("/insertNewPainter", insertNewPainter);
routeTo.post("/insert-a-new-painting",insertNewPaintingV2);
routeTo.post("/insert-a-new-painting",insertNewPaintingV3);

export default routeTo;
