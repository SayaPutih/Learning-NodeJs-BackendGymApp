import sequ from "../../config/database.js";
import {DataTypes} from "sequelize";

const GymWorkoutDetailModel = sequ.define(
	"GymWorkoutDetail",
	{
		id : {
			type : DataTypes.UUID,
			defaultValue : DataTypes.UUIDV4,
			primaryKey : true,
			allowNull : false,
		},
		GymWorkoutId : {
			type : DataTypes.UUID,
			defaultValue : DataTypes.UUIDV4,
			allowNull : false,
		},
		isCompoundExcersise : {
			type : DataTypes.BOOLEAN,
			defaultValue : 0,
			allowNull : false
		},
		muscleTargeted : {
			type : DataTypes.STRING,
			allowNull : true,
			defaultValue : 'Default'
		},
		minutes : {
			type : DataTypes.TIME,
			allowNull : true,
			defaultValue : "00:00:00",
		} ,
		max : {
			type : DataTypes.INTEGER,
			allowNull : true,
			defaultValue : 0,
		},
	},
	{
		timestamps : true,
	}
);


export default GymWorkoutDetailModel;