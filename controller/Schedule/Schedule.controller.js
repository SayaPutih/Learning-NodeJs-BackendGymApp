import express from "express";
import ScheduleDisciplineModel from "../../models/routine/ScheduleDisciplineModel.js";
//../../../models/routines/ScheduleDisciplineModel.js"
const model = ScheduleDisciplineModel;

export const getAllSchedule = async (req, res) => {
  try {
    const tempFinder = await model.findAll();
    if (!tempFinder) return res.status(404).json("Nothing in the database");
    return res.status(200).json({
      result: tempFinder,
      length: tempFinder.length,
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

export const updateSchedule = async (req, res) => {
  try {
    const tempFinderId = req.params.id;
    const {
      date,
      doaPagi,
      Duolingo,
      Alkitab01,
      Alkitab02,
      CuciPiring,
      Chores,
      Work,
      DoaMalam,
      manjainMilli,
      igScreenTime,
      youtubeScreenTime,
    } = req.body;

    const [jumlahUpdated] = await model.update(
      {
        date,
        doaPagi,
        Duolingo,
        Alkitab01,
        Alkitab02,
        CuciPiring,
        Chores,
        Work,
        DoaMalam,
        manjainMilli,
        igScreenTime,
        youtubeScreenTime,
        updatedAt: new Date(),
      },
      { where: { id: tempFinderId } }
    );

    if (jumlahUpdated === 0)
      return res
        .status(404)
        .json(`Nothing In The database with ${tempFinderId} master evan`);

    // tempFinder.date = date;
    // tempFinder.doaPagi = doaPagi;
    // tempFinder.Duolingo= Duolingo;
    // tempFinder.Alkitab01= Alkitab01;
    // tempFinder.Alkitab02= Alkitab02;
    // tempFinder.CuciPiring= CuciPiring;
    // tempFinder.Chores= Chores;
    // tempFinder.Work= Work;
    // tempFinder.DoaMalam= DoaMalam;
    // tempFinder.manjainMilli= manjainMilli;
    // tempFinder.igScreenTime= igScreenTime;
    // tempFinder.youtubeScreenTime=youtubeScreenTime;

    //await tempFinder.save();

    const updatedData = await model.findByPk(tempFinderId);

    return res.status(200).json({
      updated: tempFinderId,
      result: updatedData,
    });
  } catch (err) {
    res.status(500).json("Something Wrong Master Evan");
  }
};

export const deleteSchedule = async (req, res) => {
  try {
    const id = req.params.id;
    const tempFinder = await model.findByPk(id);
    if (!tempFinder)
      return res.status(404).json(`nothing with id ${id} master evan`);

    await tempFinder.destroy();

    const sisahTemp = await model.findAll();
    return res.status(200).json({
      deleted: tempFinder,
      total_in_database: sisahTemp.length,
      sisah: sisahTemp,
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
};
