const db = require("../utils/dbProvider");
const helper = require("../utils/helper");
const config = require("../config");
const asyncHandler = require("../middleware/asyncHandler");

exports.createUserTable=asyncHandler(async(req,res,next)=>{
    const result = await db.query('CREATE TABLE `mainSchema`.`User` (`uid` VARCHAR(45) NOT NULL,`first_name` VARCHAR(45) NOT NULL,`last_name` VARCHAR(45) NOT NULL,`profile` VARCHAR(45) NOT NULL,`unique_identifier` VARCHAR(45) NOT NULL,`status` VARCHAR(45) NOT NULL,PRIMARY KEY (`uid`));')
    if(result){
        const result2 = await db.query('ALTER TABLE `mainSchema`.`User` ADD INDEX `profile_index` (`profile`)');
        if(result2){
            res.status(201).json({
                success:true
            })
        }
        else{
            res.status(500).json({
                success:false
            })
        }

    }
    else{
        res.status(400).json({
            success:false
        })
    }
})


exports.deleteUserTable=asyncHandler(async(req,res,next)=>{
    const result = await db.query('DROP TABLE `mainSchema`.`User`');
    res.status(204).json({
        success:true
    })
});

exports.addNewUser = asyncHandler(async(req,res,next)=>{
    console.log(req.body);
    const result = await db.query('INSERT INTO `mainSchema`.`User` (`uid`, `first_name`, `last_name`,`profile`,`unique_identifier`,`status`) VALUES (?, ? ,?, ? , ?,?);',[
        req.body.uid,req.body.firstName,req.body.lastName,req.body.profile,req.body.uniqueIdentifier,req.body.status
    ]);
    console.log(result);
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

exports.getAllUsers=asyncHandler(async(req,res,next)=>{
    try{
        const result = await db.query('SELECT * FROM `mainSchema`.`User` WHERE profile !=  ? ',["Admin"]);
        const data = helper.emptyOrRows(result);
        if(data.length){
            res.status(200).json({
                success:true,
                data,
            })
        }
        else{
            res.status(404).json({
                success:false,
                message: "No users other than admin in the database"
            });
        }
    }
    catch(err){
        next(err);
    }
})

exports.getCategorisedUnverifiedUsers = asyncHandler(async(req,res,next)=>{
    try{
        const result =  await db.query('SELECT * FROM `mainSchema`.`User` WHERE profile = ? AND status = ?',[req.body.profile,"unverified"]);
        const data = helper.emptyOrRows(result);
        res.status(200).json({
            success:true,
            data,
        })
    }
    catch(err){
        next(err);
    }
})

exports.updateStatus = asyncHandler(async(req,res,next)=>{
    try{
        const result =  await db.query('UPDATE `mainSchema`.`User` SET status = ? WHERE uid = ?',["verified",req.body.uid]);
        if(result.affectedRows){
            switch(req.body.profile){
                case 'Faculty':
                    try{
                        const result2 = await db.query('INSERT INTO `mainSchema`.`Faculty` (`unique_identifier`, `first_name`, `last_name`,`uid`) VALUES (?, ? ,?, ?);',[req.body.unique_identifier,req.body.first_name,req.body.last_name,req.body.uid]);
                        console.log(result2);
                        if(result2.affectedRows){
                            res.status(200).json({
                                success:true
                            })
                        }
                    }
                    catch(err){
                        next(err);
                    }
                    finally{
                        break;
                    }
                case 'Security Personnel':
                    try{
                        const result2 = await db.query('INSERT INTO `mainSchema`.`Security_Personnel` (`unique_identifier`, `first_name`, `last_name`,`uid`) VALUES (?, ? ,?, ?);',[req.body.unique_identifier,req.body.first_name,req.body.last_name,req.body.uid]);
                        console.log(result2);
                        if(result2.affectedRows){
                            res.status(200).json({
                                success:true
                            })
                        }
                    }
                    catch(err){
                        next(err);
                    }
                    finally{
                        break;
                    }
                case 'Coach':
                    try{
                        const result2 = await db.query('INSERT INTO `mainSchema`.`Coach` (`unique_identifier`, `first_name`, `last_name`,`uid`,`course_id`) VALUES (?, ? ,?, ?, ?);',[req.body.unique_identifier,req.body.first_name,req.body.last_name,req.body.uid,req.body.courseID]);
                        console.log(result2);
                        if(result2.affectedRows){
                            res.status(200).json({
                                success:true
                            })
                        }
                    }
                    catch(err){
                        next(err);
                    }
                    finally{
                        break;
                    }
                case 'Sports_Coordinator':
                    try{
                        const result2 = await db.query('INSERT INTO `mainSchema`.`Sports_Coordinator` (`unique_identifier`, `first_name`, `last_name`,`uid`) VALUES (?, ? ,?, ?);',[req.body.unique_identifier,req.body.first_name,req.body.last_name,req.body.uid]);
                        console.log(result2);
                        if(result2.affectedRows){
                            res.status(200).json({
                                success:true
                            })
                        }
                    }
                    catch(err){
                        next(err);
                    }
                    finally{
                        break;
                    }
            }
            
        }
        res.status(200).json({
            success:true
        })
    }
    catch(err){
        next(err);
    }
})