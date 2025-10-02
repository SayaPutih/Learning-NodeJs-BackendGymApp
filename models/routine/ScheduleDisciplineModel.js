import sequ from "../../config/database.js";
import { DataTypes } from "sequelize";

//otomatis created at sama updated at
const ScheduleDisciplineModel = sequ.define(
  "Schedule",
  {
    id: {
      //otomatis bikin sendiri
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    DoaPagi: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    Duolingo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    Alkitab01: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "-",
    },
    Alkitab02: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "-",
    },
    CuciPiring: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    Chores: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "-",
    },
    Work: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "-",
    },
    DoaMalem: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    manjainMilli: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    igScreenTime: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    youtubeScreenTime: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    timestamps: true,
  }
);
export default ScheduleDisciplineModel;
