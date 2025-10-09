import sequ from "../../config/database.js";
import { DataTypes } from "sequelize";

const GymDetailModel = sequ.define(
  "GymDetail",
  {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    kg: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    reps: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    sets: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    typeWo: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "-",
    },
    workoutDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: "2004-01-29",//Must Be Date
    },
    TableId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    GymWorkoutId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

export default GymDetailModel;
