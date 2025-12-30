import { Op, fn, col, literal } from "sequelize";
import GymDayDisciplineModel from "../../models/routine/GymDayDisciplineModel.js";
import GymDetailModel from "../../models/routine/GymDetailModel.js";
import GymWorkoutDetailModel from "../../models/routine/GymWorkoutDetailModel.js";
import GymWorkoutDisciplineModel from "../../models/routine/GymWorkoutDisciplineModel.js";

const DayModel = GymDayDisciplineModel;
const WorkoutModel = GymWorkoutDisciplineModel;
const DetailModel = GymDetailModel;
const WorkoutDetailModel = GymWorkoutDetailModel;

export async function DetailsOpWhere(req, res) {
  try {
    const result = await DetailModel.findAll({
      where: {
        [Op.and]: [
          { kg: { [Op.gt]: 40 } },
          { workoutDate: { [Op.lt]: "2024-11-10" } },
        ],
      },
    });

    if (result.length < 1) return res.status(404).json("Nothing Master Evan");
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ message: err });
  }
}

export async function DetailsOpLike(req, res) {
  try {
    const result = await DetailModel.findAll({
      where: {
        [Op.and]: [{ kg: { [Op.gt]: 25 } }, { kg: { [Op.lte]: 30 } }],
      },
      include: [
        {
          model: WorkoutModel,
          as: "WorkoutName",
          where: {
            workoutname: { [Op.like]: "%B%" },
          },
          required: true,
        },
      ],
    });

    if (result.length < 1) return res.status(404).json("Nothing Master Evan");
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ message: err });
  }
}

export async function DetailsOpBetween(req, res) {
  try {
    const result = await DetailModel.findAll({
      where: {
        workoutDate: { [Op.between]: ["2025-01-01", "2025-01-31"] },
      },
      include: [
        {
          model: WorkoutModel,
          as: "WorkoutName",
          required: true,
        },
      ],
      order: [["workoutDate", "ASC"]],
    });

    if (result.length < 1) return res.status(404).json("Nothing Master Evan");
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ message: err });
  }
}

// export async function Op(req, res) {
//   try {
//   } catch (err) {
//     return res.status(500).json({ message: err });
//   }
// }
