import express from "express";
import CodeDetailModel from "../../models/routine/CodeDetailModel.js";
//import CodeDetailModel from "../../../models/routine/CodeDetailModel.js";
//../../../models/routines/CodeDetailModel.js"
const model = CodeDetailModel;

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
