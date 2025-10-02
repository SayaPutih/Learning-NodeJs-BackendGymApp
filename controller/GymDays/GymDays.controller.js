//CRRUD setup
//import GymDayDisciplineModel from "../../../models/routine/GymDayDisciplineModel.js";
import GymDayDisciplineModel from "../../models/routine/GymDayDisciplineModel.js";

const GymDayModel = GymDayDisciplineModel;
//CREATE
export const CreateAGymDay = async (req, res) => {
  try {
    const tempInserter = req.body;
    if (tempInserter == null)
      return res.status(404).json(`Please insert a valid body Master Evan`);

    const checker = await GymDayModel.findOne({
      where: { name: tempInserter.name },
    });
    if (checker)
      return res
        .status(500)
        .json(`${tempInserter.name} is already in the database master Evan`);

    const inserter = await GymDayModel.create(tempInserter);
    const allItems = await GymDayModel.findAll();

    return res.status(200).json({
      message: `Created a new Gym Day Called ${inserter.name}`,
      total: `Total In the Database is : ${allItems.length}`,
      allItems: allItems,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//READ ALL
const response = (res, status, message) => {
  return res.status(status).json(message);
};
export const findAllGymDays = async (req, res) => {
  try {
    const tempFinder = await GymDayModel.findAll();
    if (tempFinder == null)
      return response(res, 404, `Nothing in the Database Master Evan`);
    response(res, 200, {
      message: `Found Something in the Database Master Evan`,
      total: tempFinder.length,
      all: tempFinder,
    });
  } catch (err) {
    response(res, 500, err.message);
  }
};

//READ BY ID
export const findGymDayByName = async (req, res) => {
  try {
    const gymName = req.params.gymName;
    const tempFinder = await GymDayModel.findAll({
      where: {
        name: gymName,
      },
    });

    if (tempFinder == null)
      return res.status(404).json(`Nothing in the Database master Evan`);
    return res.status(200).json(tempFinder);
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

//UPDATE
export const updateGymDayById = async (req, res) => {
  try {
    const id = req.params.id;
    const { name } = req.body;

    const tempFinder = await GymDayModel.findByPk(id);
    if (tempFinder == null)
      return res.status(404).json({
        message: `Nothing in the Database with the id of ${id}`,
        database: await GymDayModel.findAll(),
      });

    const isExist = await GymDayModel.findOne({ where: { name: name } });
    if (isExist)
      return res.status(400).json(`There is already a ${name} in the database`);

    tempFinder.name = name;
    await tempFinder.save();
    return res.status(200).json({
      message: `Updated the id of : ${id}`,
      updated: tempFinder,
      database: await GymDayModel.findAll(),
    });
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

//DELETE
export const deleteGymDayById = async (req, res) => {
  try {
    const id = req.params.id;
    const tempFinder = await GymDayModel.findByPk(id);
    if (tempFinder == null)
      return res.status(404).json({
        message: `Nothing with the id of ${id} master Evan`,
        database: await GymDayModel.findAll(),
      });

    await tempFinder.destroy();

    return res.status(200).json({
      message: `Succesfully Deleted ${tempFinder.name}`,
      total: tempFinder.length,
      database: await GymDayModel.findAll(),
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
};
