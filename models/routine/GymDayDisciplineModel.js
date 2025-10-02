import sequ from "../../config/database.js";
import { DataTypes } from "sequelize";

const GymDayDisciplineModel = sequ.define(
  "GymDay",
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

export default GymDayDisciplineModel;
