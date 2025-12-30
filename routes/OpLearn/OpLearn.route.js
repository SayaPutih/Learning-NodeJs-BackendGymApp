import express from "express";
import {
  DetailsOpWhere,
  DetailsOpLike,
  DetailsOpBetween,
} from "../../controller/OpLearn/OpLearn.controller.js";
const OpLearnRouter = express.Router();

OpLearnRouter.get("/Details-Where-And", DetailsOpWhere);
OpLearnRouter.get("/Details-Like-And", DetailsOpLike);
OpLearnRouter.get("/Details-Between-And", DetailsOpBetween);
export default OpLearnRouter;
