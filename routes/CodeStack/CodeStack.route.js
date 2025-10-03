import express from "express";
import {
  getAllCodeStack,
  getCodeStackByName,
  createACodeStack,
  insertAStack,
  updateCodeStackById,
  delelteStackById,
} from "../../controller/CodeStack/CodeStack.controller.js";

const CodeStackRouter = express.Router();

CodeStackRouter.get("/get-all-code-stack", getAllCodeStack);
CodeStackRouter.get("/get-code-stack-by-name/:name", getCodeStackByName);
CodeStackRouter.post("/create-a-new-stack", createACodeStack);
CodeStackRouter.post("/insert-a-new-stack", insertAStack);
CodeStackRouter.put("/update-code-stack/:idFinder", updateCodeStackById);
CodeStackRouter.delete("/delete-stack-by-id/:idFinder", delelteStackById);

export default CodeStackRouter;
