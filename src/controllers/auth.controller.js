const jwt = require("jsonwebtoken");
const USER = require('../models/user.model');
const ROLE = require('../models/role.model');
const {verifyPassword} = require('../helpers/utils.helper')

exports.register = async(req,res,next) => {
    try{
        const {firstName , lastName, email, password, dob, role} = req.body;
        const roleFound = await ROLE.findOne({name: role});

        if(!roleFound){
                throw new Error('Role not found')
        }
        const user = new USER({
            firstName,
            lastName,
            email,
            dob,
            password,
            role:roleFound._id
        });
        user.save();
        res.status(200).json({message:'User created successfully', data:user});
    }catch(error){
        next(error)
    }
}

exports.login = async(req,res,next) => {
    try{
        console.log('re.body',req.body);
        
        const  {email, password} = req.body;
        const userFound = await USER.findOne({email});

        if(!userFound){
            throw new Error('User not found with this email',{statusCode: 404});
        }

        const isPasswordCorrect = await verifyPassword(password, userFound.password);

        if(!isPasswordCorrect){
            throw new Error('Invalid credentials',{statusCode: 403})
        }

        const token  = await jwt.sign({id:userFound._id},process.env.SECRET, {expiresIn:'24h'});
        res.status(200).json({accessToken:token});

    }catch(error){
        next(error)
    }
}