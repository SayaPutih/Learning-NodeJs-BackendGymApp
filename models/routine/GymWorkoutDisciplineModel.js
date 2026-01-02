import sequ from "../../config/database.js";
import { DataTypes } from "sequelize";

const GymWorkoutDisciplineModel = sequ.define(
  "GymWorkout",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    workoutPicture: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    workoutPictureGif: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    workoutName: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "-",
    },
    GymDayId: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
  },
  {
    timestamps: true,
  }
);

export default GymWorkoutDisciplineModel;
