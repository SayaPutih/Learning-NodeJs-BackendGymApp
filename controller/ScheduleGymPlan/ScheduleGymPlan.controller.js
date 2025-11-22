import ScheduleGymPlanModel from "../../models/routine/ScheduleGymPlanModel.js";
import GymWorkoutDisciplineModel from "../../models/routine/GymWorkoutDisciplineModel.js";

export const getAllScheduleGymPlan = async (req, res) => {
  try {
    const tempFinder = await ScheduleGymPlanModel.findAll({
      include: [
        {
          model: GymWorkoutDisciplineModel,
          as: "Workout",
          attributes: ["workoutName", "id", "workoutPicture"],
        },
      ],
    });

    if (tempFinder.length === 0)
      return res.status(404).json("Nothing in the database Master Evan");

    return res.status(200).json(tempFinder);
  } catch (err) {
    return res.status(500).json("Somethings wrong master Evan : " + err);
  }
};

export const insertGymPlan = async (req, res) => {
  try {
    const body = req.body;
    if (!body) return res.status(400).json("Please Enter a Valid Body");

    const check = await GymWorkoutDisciplineModel.findOne({
      where: { id: body.WorkoutId },
    });
    if (!check)
      return res.status(404).json("Nothing with the wokrout id of Master Evan");

    await ScheduleGymPlanModel.create({ ...body });
    return res.status(200).json("Successfull Insert");
  } catch (err) {
    return res.status(500).json("Somthine Wrong master Evan " + err);
  }
};

export const updateGymPlan = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;

    const validWorkout = await GymWorkoutDisciplineModel.findOne({
      where: { id: body.WorkoutId },
    });
    if (!validWorkout)
      return res.status(404).json("Nothing with Workout id : ", body.WorkoutId);

    const tempFinder = await ScheduleGymPlanModel.findByPk(id);
    if (tempFinder === 0)
      return res
        .status(404)
        .json("Nothing in the database with the gymplan id : " + id);

    tempFinder.timeSet = body.timeSet;
    tempFinder.WorkoutId = body.WorkoutId;
    tempFinder.reps = body.reps;
    tempFinder.sets = body.sets;

    await tempFinder.save();

    return res.status(200).json("Succesfully updated");
  } catch (err) {
    return res.status(500).json("Eror Master Evan : " + err);
  }
};
