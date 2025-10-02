import sequ from "../../config/database.js";
import { DataTypes } from "sequelize";

const CodeDisciplineModel = sequ.define(
  "CodeDiscipline",
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    stackName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ProjectName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName : "CodeDisciplines",
    timestamps: true,
  }
);

export default CodeDisciplineModel;
