const {createUserTable,deleteUserTable,addNewUser,getAllUsers,getCategorisedUnverifiedUsers,updateStatus} = require("../controllers/authController");
const express = require("express");

const authRouter = express.Router();

authRouter.route("/create-table").get(createUserTable);
authRouter.route("/delete-table").get(deleteUserTable);
authRouter.route("/user").post(addNewUser).get(getAllUsers);
authRouter.route("/unverified-users").post(getCategorisedUnverifiedUsers);
authRouter.route("/verify").post(updateStatus);
module.exports = authRouter;