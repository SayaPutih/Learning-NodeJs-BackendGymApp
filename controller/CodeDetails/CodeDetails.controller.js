import express from "express";
import CodeDetailModel from "../../models/routine/CodeDetailModel.js";
import ScheduleDisciplineModel from "../../models/routine/ScheduleDisciplineModel.js";
import CodeDisciplineModel from "../../models/routine/CodeDisciplineModel.js";

//import CodeDetailModel from "../../../models/routine/CodeDetailModel.js";
//../../../models/routines/CodeDetailModel.js"
const model = CodeDetailModel;

//Get All
export const getAllCodeDetails = async (req, res) => {
  try {
    const tempFinder = await model.findAll();
    if (!tempFinder)
      return res.status(404).json("Nothing in the database Master Evan");
    return res.status(200).json(tempFinder);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

//by projectId(codeId)
export const getCodeDetailsById = async (req, res) => {
  try {
    const idFinder = req.params.id;
    const tempFinder = await model.findAll({ where: { CodeId: idFinder } });
    if (!tempFinder || tempFinder.length === 0)
      return res
        .status(404)
        .json(`Nothing in the database with id ${idFinder} Master Evan`);
    return res.status(200).json(tempFinder);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

//Insert a Code Details
export const insertACodeDetails= async (req, res) => {
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
        `Created new Work Info for ${codeStackExists.ProjectName} -> ${inserter.detail}`
      );
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateCodeDetailById = async (req, res) => {
  try {
    const idFinder = await req.params.id;

    const { detail, CodeId, ScheId } = await req.body;

    const tempFinder = await model.findOne({ where: { id: idFinder } });

    if (!tempFinder)
      return res
        .status(404)
        .json("Nothing in the database Master Evan with the id of " + idFinder);

    tempFinder.detail = detail;
    tempFinder.CodeId = CodeId;
    tempFinder.TableId = ScheId;

    await tempFinder.save();
    return res.status(200).json({
      message: "Succesfully Updated",
      result: tempFinder,
      database: await model.findAll(),
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

export const deleteCodeDetailsById = async (req, res) => {
  try {
    const idFinder = req.params.id;
    const tempFinder = await model.findOne({ where: { id: idFinder } });
    if (!tempFinder || tempFinder.length === 0) {
      return res
        .status(404)
        .json(`Nothing in the database with the id of ${idFinder}`);
    }

    await tempFinder.destroy();
    return res.status(200).json({
      message: `Succesfully deleted ${tempFinder.detail}`,
      sisah: await model.findAll(),
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
};
