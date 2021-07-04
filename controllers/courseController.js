const db = require("../utils/dbProvider");
const helper = require("../utils/helper");
const config = require("../config");
const asyncHandler = require("../middleware/asyncHandler");
const { v4: uuidv4 } = require("uuid");
exports.createCourseTable=asyncHandler(async(req,res,next)=>{
    const result = await db.query('CREATE TABLE `mainSchema`.`Course` (`course_id` VARCHAR(45) NOT NULL,`course_name` VARCHAR(45) NOT NULL,`start_date` DATE NOT NULL,`end_date` DATE NOT NULL,`credits` TINYINT NOT NULL,PRIMARY KEY (`course_id`));')
    if(result){
        res.status(201).json({
            success:true
        })
    }
    else{
        res.status(500).json({
            success:false
        })
    }
})


exports.deleteCourseTable=asyncHandler(async(req,res,next)=>{
    const result = await db.query('DROP TABLE `mainSchema`.`Course`');
    res.status(204).json({
        success:true
    })
});

exports.addNewCourse = asyncHandler(async(req,res,next)=>{
    const course_id = uuidv4();
    console.log(req.body);
    const result = await db.query('INSERT INTO `mainSchema`.`Course` (`course_id`, `course_name`, `start_date`,`end_date`,`credits`) VALUES (?, ? ,?, ? , ?);',[
        course_id,req.body.course_name,req.body.start_date,req.body.end_date,req.body.credit.name
    ]);
    if(result.affectedRows){
        res.status(201).json({
            success:true,
        })
    }
    else{
        res.status(400).json({
            success:false,
            message:result.message
        })
    }
})