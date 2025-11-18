import GymWorkoutDetailModel from "../../models/routine/GymWorkoutDetailModel.js";
import GymWorkoutDisciplineModel from "../../models/routine/GymWorkoutDisciplineModel.js";
import GymDetailModel from "../../models/routine/GymDetailModel.js";
const detailModel = GymWorkoutDetailModel;
const workoutModel = GymWorkoutDisciplineModel;

export const updateOrInsertWorkoutDetailFromWorkoutId = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;

    const maxKg = await GymDetailModel.max("kg",{
      where : { GymWorkoutId : id}
    });

    const tempFinder = await workoutModel.findByPk(id);
    if (body == null) return res.status(400).json(`Body is Missing Something`);
    if (tempFinder == null)
      return res
        .status(404)
        .json(`Nothing with workout id of ${id} master Evan`);

    const isExist = await detailModel.findOne({ where: { GymWorkoutId: id } });
    if (isExist) {
      //const tempUpdater = await detailModel.findByPk(id);
      isExist.isCompoundExcersise = body.isCompoundExcersise;
      isExist.muscleTargeted = body.muscleTargeted;
      isExist.minutes = body.minutes;
      isExist.max = maxKg;
      isExist.updatedAt = new Date();
      await isExist.save();
    } else {
      await detailModel.create({
        ...body,
        GymWorkoutId: id,
        max : maxKg,
      });
    }

    return res.status(200).json({
      message: "Success",
      result: await workoutModel.findOne({
        where: {
          id,
        },
        include: [
          {
            model: detailModel,
            as: "gymDetails",
          },
        ],
      }),
    });
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

export const deleteWorkoutDetailById = async (req, res) => {
  try {
    const id = req.params.id;
    const tempFinder = await detailModel.findOne({ where: { id: id } });
    if (tempFinder == null)
      return res
        .status(404)
        .json(`Nothing in the Database with detail : ${id}`);

    await tempFinder.destroy();
    return res.status(200).json(`Succesfully deleted ${id}`);
  } catch (err) {
    return res.status(500);
  }
};
