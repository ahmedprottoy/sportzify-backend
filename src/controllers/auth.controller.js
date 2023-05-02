const userService = require('../services/user.service');

exports.signUp = async (req,res) =>{
    try{
        const user = await userService.createUser(req.body,res);
        // res.status(201).json();
    }catch(err){
        console.log(err)
        res.status(500).json({err});
    }
}

exports.signIn = async (req,res) =>{
    console.log("hitting sign in route");
}
exports.signOut = async (req,res) =>{
    console.log("hitting sign out route");
}