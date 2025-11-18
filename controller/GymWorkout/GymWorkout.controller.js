import GymWorkoutDisciplineModel from "../../models/routine/GymWorkoutDisciplineModel.js";
import GymDayDisciplineModel from "../../models/routine/GymDayDisciplineModel.js";
import gymDetails from "../../models/routine/GymWorkoutDetailModel.js";
import GymDetailModel from "../../models/routine/GymDetailModel.js";

const WorkoutModel = GymWorkoutDisciplineModel;
const GymDayModel = GymDayDisciplineModel;
const FromDay = GymDayDisciplineModel;
const MyWorkoutDetails = GymDetailModel;

export const getAllWorkouts = async (req, res) => {
  try {
    const tempFinder = await WorkoutModel.findAll({
      include: [
        { model: gymDetails, as: "gymDetails" },
        { model: FromDay, as: "FromDay" },
        { model: MyWorkoutDetails, as: "MyWorkoutDetails" },
      ],
      total: MyWorkoutDetails.length,
      order: [["updatedAt", "DESC"]],
    });
    if (tempFinder < 1)
      return res.status(404).json(`Nothing in the Database Master Evan`);
    return res.status(200).json(tempFinder);
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

export const getAllWorkoutsByDay = async (req, res) => {
  try {
    const tempName = req.params.dayname;
    const dayFinder = await GymDayModel.findAll({ where: { name: tempName } });
    if (dayFinder.length === 0)
      return res
        .status(404)
        .json(`Nothing with the Gym Day Name : ${tempName}`);

    const tempFinder = await WorkoutModel.findAll({
      where: { GymDayId: dayFinder[0].id },
    });
    if (tempFinder.length === 0)
      return res.status(404).json(`${tempName} has no Workouts Yet`);
    return res.status(200).json(tempFinder);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

export const getWorkoutById = async (req, res) => {
  try {
    const tempFinder = await WorkoutModel.findByPk(req.params.id);
    if (tempFinder == null)
      return res.status(404).json(`Nothing With the id of ${req.params.id}`);
    return res.status(200).json(tempFinder);
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

export const insertAGymWorkout = async (req, res) => {
  try {
    const bodyInserter = req.body;
    if (bodyInserter == null)
      return res.status(400).json(`Please Insert a valid body master Evan`);

    const gymDayName = await GymDayModel.findOne({
      where: { id: bodyInserter.GymDayId },
    });
    if (!gymDayName)
      return res.status(404).json(`Please Enter a valid day master Evan`);

    const tempInserter = await WorkoutModel.create({
      ...bodyInserter,
      workoutPicture: req.file ? `/images/${req.file.filename}` : null,
    });

    const allWorkouts = await WorkoutModel.findAll({
      where: { GymDayId: bodyInserter.GymDayId },
    });
    return res.status(200).json({
      message: `Inserted A New Workout for ${gymDayName.name} : ${tempInserter.workoutName}`,
      total: `Total ${gymDayName.name} : ${allWorkouts.length}`,
      database: allWorkouts,
    });
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

export const UpdateWorkoutById = async (req, res) => {
  try {
    const tempFinder = await WorkoutModel.findByPk(req.params.id);
    if (tempFinder == null)
      return res.status(404).json(`Nothing with id ${req.params.id}`);

    const { name } = req.body;
    tempFinder.workoutName = name;

    if (req.file != null) {
      tempFinder.workoutPicture = `/images/${req.file.filename}`;
    }

    await tempFinder.save();

    return res.status(200).json({
      message: `SuccesFully updated ${name} Master Evan`,
      updatedWorkout: tempFinder,
      database: await WorkoutModel.findAll(),
    });
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

export const DeleteWorkoutById = async (req, res) => {
  try {
    const tempFinder = await WorkoutModel.findByPk(req.params.id);
    if (tempFinder == null)
      return res.status(404).json(`Nothing with that id MasterEvan`);

    await tempFinder.destroy();
    const sisahFinder = await WorkoutModel.findAll();
    return res.status(200).json({
      message: `Succesfully Deleted ${tempFinder.workoutName}`,
      total: sisahFinder.length,
      database: sisahFinder,
    });
  } catch (err) {
    return res.status(200).json(err.message);
  }
};
