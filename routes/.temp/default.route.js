import express from "express";
import {
  GetDataFromCfPep,
  IsThisANumber,
} from "../controller/default.controller.js";

const router = express.Router();

router.get("/basic-cf-pep", GetDataFromCfPep);
router.get(`/:number`, IsThisANumber);

export default router;
