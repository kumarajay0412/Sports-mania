const {createCourseTable,deleteCourseTable,addNewCourse} = require("../controllers/courseController");
const express = require("express");

const courseRouter = express.Router();

courseRouter.route("/create-table").get(createCourseTable);
courseRouter.route("/delete-table").get(deleteCourseTable);
courseRouter.route("/").post(addNewCourse);
module.exports = courseRouter;