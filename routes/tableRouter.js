const {createFacultyTable,deleteFacultyTable,createCoachTable,deleteCoachTable,createSecurityTable,deleteSecurityTable,createCoordinatorTable,deleteCoordinatorTable} = require("../controllers/tableController");
const express = require("express");

const tableRouter = express.Router();

tableRouter.route("/faculty/create-table").get(createFacultyTable);
tableRouter.route("/faculty/delete-table").get(deleteFacultyTable);

tableRouter.route("/coach/create-table").get(createCoachTable);
tableRouter.route("/coach/delete-table").get(deleteCoachTable);

tableRouter.route("/security/create-table").get(createSecurityTable);
tableRouter.route("/security/delete-table").get(deleteSecurityTable);

tableRouter.route("/coordinator/create-table").get(createCoordinatorTable);
tableRouter.route("/coordinator/delete-table").get(deleteCoordinatorTable);

module.exports = tableRouter;