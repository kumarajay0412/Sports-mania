const db = require("../utils/dbProvider");
const asyncHandler = require("../middleware/asyncHandler");

exports.createFacultyTable=asyncHandler(async(req,res,next)=>{
    const result = await db.query('CREATE TABLE `mainSchema`.`Faculty` (`unique_identifier` VARCHAR(45) NOT NULL, `first_name` VARCHAR(45) NOT NULL, `last_name` VARCHAR(45) NOT NULL, `uid` VARCHAR(45) NOT NULL,PRIMARY KEY (`unique_identifier`),INDEX `faculty_fk_uid_idx` (`uid` ASC) INVISIBLE,CONSTRAINT `faculty_fk_uid`FOREIGN KEY (`uid`)REFERENCES `mainSchema`.`User` (`uid`)ON DELETE RESTRICT ON UPDATE RESTRICT);');
    if(result){
        res.status(201).json({
            success:true
        })
    }
    else{
        res.status(400).json({
            success:false
        })
    }
})

exports.deleteFacultyTable=asyncHandler(async(req,res,next)=>{
    const result = await db.query('DROP TABLE `mainSchema`.`Faculty`');
    res.status(204).json({
        success:true
    })
});

exports.createCoachTable=asyncHandler(async(req,res,next)=>{
    const result = await db.query('CREATE TABLE `mainSchema`.`Coach` (`unique_identifier` VARCHAR(45) NOT NULL, `first_name` VARCHAR(45) NOT NULL, `last_name` VARCHAR(45) NOT NULL, `uid` VARCHAR(45) NOT NULL,`course_id` VARCHAR(45) NOT NULL,PRIMARY KEY (`unique_identifier`), INDEX `course_index` (`course_id`) VISIBLE, INDEX `coach_fk_uid_idx` (`uid` ASC) INVISIBLE,CONSTRAINT `coach_fk_uid`FOREIGN KEY (`uid`)REFERENCES `mainSchema`.`User` (`uid`)ON DELETE RESTRICT ON UPDATE RESTRICT);');
    if(result){
        res.status(201).json({
            success:true
        })
    }
    else{
        res.status(400).json({
            success:false
        })
    }
})

exports.deleteCoachTable=asyncHandler(async(req,res,next)=>{
    const result = await db.query('DROP TABLE `mainSchema`.`Coach`');
    res.status(204).json({
        success:true
    })
});

exports.createSecurityTable=asyncHandler(async(req,res,next)=>{
    const result = await db.query('CREATE TABLE `mainSchema`.`Security_Personnel` (`unique_identifier` VARCHAR(45) NOT NULL, `first_name` VARCHAR(45) NOT NULL, `last_name` VARCHAR(45) NOT NULL, `uid` VARCHAR(45) NOT NULL,PRIMARY KEY (`unique_identifier`),INDEX `security_fk_uid_idx` (`uid` ASC) INVISIBLE,CONSTRAINT `security_fk_uid`FOREIGN KEY (`uid`)REFERENCES `mainSchema`.`User` (`uid`)ON DELETE RESTRICT ON UPDATE RESTRICT);');
    if(result){
        res.status(201).json({
            success:true
        })
    }
    else{
        res.status(400).json({
            success:false
        })
    }
})

exports.deleteSecurityTable=asyncHandler(async(req,res,next)=>{
    const result = await db.query('DROP TABLE `mainSchema`.`Security_Personnel`');
    res.status(204).json({
        success:true
    })
});

exports.createCoordinatorTable=asyncHandler(async(req,res,next)=>{
    const result = await db.query('CREATE TABLE `mainSchema`.`Sports_Coordinator` (`unique_identifier` VARCHAR(45) NOT NULL, `first_name` VARCHAR(45) NOT NULL, `last_name` VARCHAR(45) NOT NULL, `uid` VARCHAR(45) NOT NULL,PRIMARY KEY (`unique_identifier`),INDEX `coordinator_fk_uid_idx` (`uid` ASC) INVISIBLE,CONSTRAINT `coordinator_fk_uid`FOREIGN KEY (`uid`)REFERENCES `mainSchema`.`User` (`uid`)ON DELETE RESTRICT ON UPDATE RESTRICT);');
    if(result){
        res.status(201).json({
            success:true
        })
    }
    else{
        res.status(400).json({
            success:false
        })
    }
})

exports.deleteCoordinatorTable=asyncHandler(async(req,res,next)=>{
    const result = await db.query('DROP TABLE `mainSchema`.`Sports_Coordinator`');
    res.status(204).json({
        success:true
    })
});