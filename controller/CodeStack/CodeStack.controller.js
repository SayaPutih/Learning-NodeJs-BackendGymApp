import express from "express";
import CodeDisciplineModel from "../../models/routine/CodeDisciplineModel.js";
//import CodeDisciplineModel from "../../../models/routine/CodeDisciplineModel.js";
// ../../models/routine/CodeDisciplineModel.js

//check foreign key cascade
const CodeStack = CodeDisciplineModel;

export const getAllCodeStack = async (req, res) => {
  try {
    const tempFinder = await CodeStack.findAll();
    if (!tempFinder)
      return res.status(404).json(`Nothing in the Database Master Evan`);

    return res.status(200).json({
      message: `Found Master Evan Total : ${tempFinder.length}`,
      CodeStacks: tempFinder,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getCodeStackByName = async (req, res) => {
  try {
    const name = req.params.name;

    const tempFinder = await CodeStack.findOne({
      where: {
        stackName: name,
      },
    });

    const findAll = await CodeStack.findAll();

    if (!tempFinder)
      return res.status(404).json({
        notFoundMessage: `Nothing in the Database with the name ${name}`,
        DatabaseCount: findAll.length,
      });

    return res.status(200).json({
      message: `Founded ${name}`,
      result: tempFinder,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createACodeStack = async (req, res) => {
  try {
    const newStack = req.body;

    const createStack = await CodeStack.create(newStack);
    const findAll = await CodeStack.findAll();

    res.status(200).json({
      StackCreated: createStack,
      TotalStack: findAll.length,
      SemuaStack: findAll,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateCodeStackById = async (req, res) => {
  try {
    const idFinder = req.params.idFinder;
    const { newStackName, newProjectName } = req.body;
    const findStack = await CodeStack.findByPk(idFinder);

    if (!findStack)
      return res
        .status(404)
        .json(`Nothing With the id of ${idFinder} master Evan`);

    findStack.stackName = newStackName;
    findStack.ProjectName = newProjectName;

    await findStack.save();

    const findAll = await CodeStack.findAll();

    res.status(200).json({
      message: `Updated id : ${idFinder}`,
      result: findAll,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const delelteStackById = async (req, res) => {
  try {
    const idFinder = req.params.idFinder;
    if (idFinder == null)
      return res.status(400).json(`Master Evan, please insert ${idFinder}`);

    const deleteTemp = await CodeDisciplineModel.findByPk(idFinder);
    if (!deleteTemp)
      return res
        .status(404)
        .json(`Nothing with the id of ${idFinder} masterEvan`);

    await deleteTemp.destroy();

    const sisah = await CodeDisciplineModel.findAll();
    res.status(200).json({
      message: `Deleted Stack Name : ${deleteTemp.stackName}`,
      remaining: sisah,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
