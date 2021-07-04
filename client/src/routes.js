import React from "react";

// import Unauthorized from "./views/Unauthorized/Unauthorized";

const Homepage = React.lazy(()=>import("./views/Homepage/Homepage"));
const Login = React.lazy(()=>import("./views/Login/Login"));
const ResetPassword = React.lazy(()=>import("./views/ResetPassword/ResetPassword"));
const Signup = React.lazy(()=>import("./views/Signup/Signup"));
const EmailVerification = React.lazy(()=>import("./views/EmailVerification/EmailVerification"));
const Unauthorized = React.lazy(()=>import("./views/Unauthorized/Unauthorized"));
const PageError = React.lazy(()=>import("./views/PageError/PageError"));
const viewUsers = React.lazy(()=>import("./views/ViewUsers/ViewUsers"));
const verifyUsers = React.lazy(()=>import("./views/VerifyUsers/VerifyUsers"));
const addCourse = React.lazy(()=>import("./views/AddCourse/AddCourse"));
const routes = [
    {
        path:"/",
        component:Homepage
    },
    {
        path:"/login",
        component:Login,
        noAuth:true
    },
    {
        path:"/reset-password",
        component:ResetPassword,
        noAuth:true
    },
    {
        path:"/signup",
        component:Signup,
        noAuth:true
    },
    {
        path:"/email-verification",
        component:EmailVerification,
    },
    {
        path:"/unauthorized",
        component:Unauthorized,
        noAuth:true,
    },
    {
        path:"/404",
        component:PageError,
        noAuth:true,
    },
    {
        path:"/view-users",
        component:viewUsers,
        jumbo:true,
        heading:"User List",
    },
    {
        path:"/verify-users",
        component:verifyUsers,
        jumbo:true,
        heading: "Verify User"
    },
    {
        path:"/create-course",
        component:addCourse,
        jumbo:true,
        heading:"Add Course"
    }
];

export default routes;