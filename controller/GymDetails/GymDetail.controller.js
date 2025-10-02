import GymDetailModel from "../../models/routine/GymDetailModel.js";
import GymWorkoutDiscipline from "../../models/routine/GymWorkoutDisciplineModel.js";

const model = GymDetailModel;

export const getGymDetailByWorkoutId = async (req, res) => {
  try {
    const gymWorkoutId = req.params.id;
    const tempFinder = await model.findAll({
      where: { gymWorkoutId: gymWorkoutId },
    });

    if (tempFinder.length <= 0)
      return res
        .status(404)
        .json(`Nothing in the Database with id ${gymWorkoutId} master Evan`);

    return res.status(200).json(tempFinder);
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

export const insertGymDetailByWorkoutId = async (req, res) => {
  try {
    const id = req.params.id;
    const tempBody = req.body;
    const tempFinder = await GymWorkoutDiscipline.findAll({
      where: { id: id },
    });
    if (tempFinder.length <= 0)
      return res
        .status(404)
        .json(`Nothing in the Database with id ${id} master Evan`);

    const tempInserter = await model.create(tempBody);
    return res.status(200).json({
      total: (await model.findAll()).length,
      result: tempInserter,
    });
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

export const editGymDetailById = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const tempFinder = await model.findByPk(id);
    if (tempFinder == null)
      return res.status(404).json(`Nothing with the id of ${id} master evan`);
    const workoutFinder = await model.findAll({
      where: { GymWorkoutId: body.GymWorkoutId },
    });
    if (workoutFinder.length <= 0)
      return res
        .status(404)
        .json(`Nothing with the workout id of ${GymWorkoutId} masterEvan`);

    tempFinder.kg = body.kg;
    tempFinder.sets = body.sets;
    tempFinder.typeWo = body.typeWo;

    await tempFinder.save();

    return res.status(200).json(await model.findAll());
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

export const deleteGymDetailBytId = async (req, res) => {
  try {
    const id = req.params.id;
    const tempFinder = await model.findByPk(id);
    if (tempFinder == null)
      return res.status(404).json(`Nothing with the id of ${id} master evan`);

    await tempFinder.destroy();

    return res.status(200).json({
      deleted: tempFinder,
      total: (await model.findAll()).length,
      sisah: await model.findAll(),
    });
  } catch (err) {
    return res.status(500).json(err.message);
  }
};
