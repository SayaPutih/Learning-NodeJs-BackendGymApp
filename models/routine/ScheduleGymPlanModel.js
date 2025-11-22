import sequ from "../../config/database.js";
import { DataTypes } from "sequelize";

const ScheduleGymPlanModel = sequ.define(
  "ScheduleGymPlan",
  {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    timeSet: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    WorkoutId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    reps: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sets: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

export default ScheduleGymPlanModel;
