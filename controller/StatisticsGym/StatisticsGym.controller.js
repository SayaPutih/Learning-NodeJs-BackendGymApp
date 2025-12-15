import GymDayDisciplineModel from "../../models/routine/GymDayDisciplineModel.js";
import GymWorkoutDisciplineModel from "../../models/routine/GymWorkoutDisciplineModel.js";
import GymWorkoutDetailModel from "../../models/routine/GymWorkoutDetailModel.js";
import {fn,col} from "sequelize";

export const getDayWithHowMuchWorkout = async (req, res) => {
  try {
    const result = await GymDayDisciplineModel.findAll({
      include: [
        {
          model: GymWorkoutDisciplineModel,
          as: "ListOfWorkouts",
        },
      ],
    });

    const response = result.map((a) => ({
      name: a.name,
      total: a.ListOfWorkouts.length,
    }));

    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

export const getMuscleTargeted = async (req,res)=>{
  try{

    const result = await GymWorkoutDetailModel.findAll({
      attributes : [
        "muscleTargeted",
        [fn("COUNT" , col("muscleTargeted")) , "total"],
      ],
      group : ['muscleTargeted'],
    });

    return res.status(200).json(result);

  }catch(err){
    return res.status(500).json({ message: err });
  }
}

