const userModel = require('../models/user.model');
exports.allUsers = async(req,res)=>{
    console.log("getting all users");
}

exports.user = async(req,res)=>{
    console.log("getting single user");
}

exports.allBlogs = async(req,res)=>{
    console.log("getting every blogs of specified user");
}
