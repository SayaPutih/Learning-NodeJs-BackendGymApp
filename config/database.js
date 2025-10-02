import { Sequelize } from "sequelize";

const seq = new Sequelize(/*"ScheduleEvanderDiscipline"*/"TestSchedulingRoutine", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default seq;
