import CodeDetailModel from "../routine/CodeDetailModel.js";
import CodeDisciplineModel from "../routine/CodeDisciplineModel.js";
import ScheduleDisciplineModel from "../routine/ScheduleDisciplineModel.js";
import GymDetailModel from "../routine/GymDetailModel.js";
import GymWorkoutDisciplineModel from "../routine/GymWorkoutDisciplineModel.js";
import GymDayDisciplineModel from "../routine/GymDayDisciplineModel.js";
import GymWorkoutDetailModel from "../routine/GymWorkoutDetailModel.js";
import ScheduleGymPlanModel from "../routine/ScheduleGymPlanModel.js";

ScheduleGymPlanModel.belongsTo(GymWorkoutDisciplineModel, {
  foreignKey: "WorkoutId",
  as: "Workout",
});

ScheduleDisciplineModel.hasMany(CodeDetailModel, {
  foreignKey: "TableId",
  sourceKey: "id",
  as: "ListCodeDetails",
});
CodeDetailModel.belongsTo(ScheduleDisciplineModel, {
  foreignKey: "TableId",
  sourceKey: "id",
  as: "TableFrom",
});

ScheduleDisciplineModel.hasMany(GymDetailModel, {
  foreignKey: "TableId",
  sourceKey: "id",
  as: "WorkoutDetails",
});
GymDetailModel.belongsTo(ScheduleDisciplineModel, {
  foreignKey: "TableId",
  sourceKey: "id",
  as: "TableFrom",
});

GymWorkoutDisciplineModel.hasMany(GymDetailModel, {
  foreignKey: "GymWorkoutId",
  sourceKey: "id",
  as: "MyWorkoutDetails",
});
GymDetailModel.belongsTo(GymWorkoutDisciplineModel, {
  foreignKey: "GymWorkoutId",
  sourceKey: "id",
  as: "WorkoutName",
});

GymWorkoutDisciplineModel.hasOne(GymWorkoutDetailModel, {
  foreignKey: "GymWorkoutId",
  sourceKey: "id",
  as: "gymDetails",
  onDelete: "CASCADE",
});
GymWorkoutDetailModel.belongsTo(GymWorkoutDisciplineModel, {
  foreignKey: "GymWorkoutId",
  targetKey: "id",
  as: "FromGymWorkout",
});

GymDayDisciplineModel.hasMany(GymWorkoutDisciplineModel, {
  foreignKey: "GymDayId",
  sourceKey: "id",
  as: "ListOfWorkouts",
  onDelete: "CASCADE",
});
GymWorkoutDisciplineModel.belongsTo(GymDayDisciplineModel, {
  foreignKey: "GymDayId",
  sourceKey: "id",
  as: "FromDay",
});

CodeDisciplineModel.hasMany(CodeDetailModel, {
  foreignKey: "CodeId",
  sourceKey: "id",
  as: "ListCodeDetails",
  onDelete: "CASCADE",
});
CodeDetailModel.belongsTo(CodeDisciplineModel, {
  foreignKey: "CodeId",
  sourceKey: "id",
  as: "StackDetails",
});

export {
  ScheduleDisciplineModel,
  CodeDetailModel,
  CodeDisciplineModel,
  GymDetailModel,
  GymWorkoutDisciplineModel,
  GymDayDisciplineModel,
  GymWorkoutDetailModel,
};
