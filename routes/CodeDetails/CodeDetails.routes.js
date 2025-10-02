import {
  getCodeDetailsById,
  deleteCodeDetailsById,
  updateCodeDetailById,
  getAllCodeDetails,
} from "../../controller/CodeDetails/CodeDetails.controller.js";

import router from "express";
import express from "express";

const CodeDetailsRouter = express.Router();

CodeDetailsRouter.get("/get-codedetails", getAllCodeDetails);
CodeDetailsRouter.get("/get-codedetails-by-id/:id", getCodeDetailsById);
CodeDetailsRouter.put("/updateCodeDetailById/:id", updateCodeDetailById);
CodeDetailsRouter.delete("/deleteCodeDetailsById/:id", deleteCodeDetailsById);

export default CodeDetailsRouter;
