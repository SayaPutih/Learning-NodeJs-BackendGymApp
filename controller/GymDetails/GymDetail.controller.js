import GymDetailModel from "../../models/routine/GymDetailModel.js";
import GymWorkoutDiscipline from "../../models/routine/GymWorkoutDisciplineModel.js";
import GymWorkoutDetailModel from "../../models/routine/GymWorkoutDetailModel.js";
import { Op } from "sequelize";

const model = GymDetailModel;

//const maxWorkout = await model.findMax(kg);

export const getWorkoutDetailsWithWorkoutName = async (req,res)=>{
  try{

    //const {page,limit} = req.params;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const name = req.query.name || null;

    const start = (page - 1) * limit;
    const end = page * limit;

    //const total = await GymDetailModel.count();

    const {count,rows} = await GymDetailModel.findAndCountAll(
    {
      include : [
        {
          model : GymWorkoutDiscipline,
          as : "WorkoutName",
          where : name ? 
          {
             workoutName : { [Op.like] : `%${name}%` }
          } : undefined,
          include : [
            {
              model : GymWorkoutDetailModel,
              as : "gymDetails",
            }
          ]
        },
      ],
      limit : limit,
      offset : start,
      order : [['workoutDate','DESC']],
    });

    const response = rows.map((a)=>({
        id: a.id,
        kg: a.kg,
        reps: a.reps,
        sets: a.sets,
        typeWo: a.typeWo,
        workoutDate: a.workoutDate,
        TableId: a.TableId,
        GymWorkoutId: a.GymWorkoutId,
        //createdAt: a.createdAt,
        updatedAt: a.updatedAt,

        WorkoutNameId: a.WorkoutName?.id ?? null,
        WorkoutNameWorkoutPicture: a.WorkoutName?.workoutPicture ?? null,
        WorkoutNameWorkoutName: a.WorkoutName?.workoutName ?? null,
        WorkoutNameGymDayId: a.WorkoutName?.GymDayId ?? null,
        //WorkoutNameCreatedAt: a.WorkoutName?.createdAt ?? null,
        //WorkoutNameUpdatedAt: a.WorkoutName?.updatedAt ?? null,

        WorkoutNameDetailsId: a.WorkoutName?.gymDetails?.id ?? null,
        //WorkoutNameDetailsGymWorkoutId: a.WorkoutName?.gymDetails?.GymWorkoutId ?? null,
        WorkoutNameDetailsIsCompoundExcersise: a.WorkoutName?.gymDetails?.isCompoundExcersise ?? null,
        WorkoutNameDetailsMuscleTargeted: a.WorkoutName?.gymDetails?.muscleTargeted ?? null,
        WorkoutNameDetailsMinutes: a.WorkoutName?.gymDetails?.minutes ?? null,
        WorkoutNameDetailsMax: a.WorkoutName?.gymDetails?.max ?? null,
        //WorkoutNameDetailsCreatedAt: a.WorkoutName.gymDetails?.createdAt ?? null,
        //WorkoutNameDetailsUpdatedAt: a.WorkoutName.gymDetails?.updatedAt ?? null
    }))

    const totalCurrent = rows.length;
    const startFrom = start;
    const endTo = start + rows.length;

    return res.status(200).json({
      totalData : count,
      totalCurrent : totalCurrent,
      start : startFrom,
      end : endTo,
      result : response,
    });

  }catch(err){
    return res.status(500).json({message : err});
  }
}



export const getGymDetailByWorkoutId = async (req, res) => {
  try {
    const gymWorkoutId = req.params.id;
    const tempFinder = await model.findAll({
      where: { gymWorkoutId: gymWorkoutId },
    });

    const maxKg = await model.max("Kg", {
      where: { gymWorkoutId: gymWorkoutId },
    });

    if (tempFinder.length <= 0)
      return res
        .status(404)
        .json(`Nothing in the Database with id ${gymWorkoutId} master Evan`);

    return res.status(200).json({
      result: tempFinder,
      maxKgDb: maxKg,
    });
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
    // if (workoutFinder.length <= 0)
    if (false)
      return res
        .status(404)
        .json(`Nothing with the workout id of ${body.GymWorkoutId} masterEvan`);

    tempFinder.kg = body.kg;
    tempFinder.sets = body.sets;
    tempFinder.reps = body.reps;
    tempFinder.typeWo = body.typeWo;
    tempFinder.GymWorkoutId = body.GymWorkoutId;
    tempFinder.updatedAt = new Date();

    await tempFinder.save();

    return res.status(200).json({
      message: "It is Done",
      message2: "Test Message",
      message3: "Lama Responya Vscode LOLOL",
      result: await model.findByPk(id),
    });
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

export const getGymDetailById = async (req, res) => {
  try {
    const id = req.params.id;
    const tempFinder = await model.findByPk(id);
    if (tempFinder == null)
      return res
        .status(404)
        .json(`Nothing in the database with the id of ${id} master Evan`);
    return res.status(200).json(tempFinder);
  } catch (err) {
    return res.status(500).json(err.message);
  }
};
