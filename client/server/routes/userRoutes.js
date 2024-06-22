const router = require('express').Router();
const User = require('../models/userModel.js'); 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middlewares/authMiddleware.js');

//Registration

router.post('/register', async (req,res)=>{
    
    try {
        const user = await User.findOne({email: req.body.email});
        if(user)
        {
            throw new Error("User already Exist");
        }
        const salt = await bcrypt.genSalt(11);
        const hashPassword = await bcrypt.hash(req.body.password, salt); 
        req.body.password = hashPassword

        const newUser= new User(req.body);
        await newUser.save();
        res.send({
            success: true,
            message:"User created Successfully"
        })

    } catch (error) {
        res.send({
            success: false,
            message: error.message
        });
    }
});

//login

router.post('/login', async(req,res)=>{
    try {
        const user = await User.findOne({email: req.body.email});
        if(!user)
        {
            throw new Error("User Not Found");
        }
        if(user.status !== 'active')
        {
            throw new Error('The Users Account is blocked, Please Contact admin');
        }
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if(!validPassword)
        {
            throw new Error("Invalid Password");
        }

        //create token......
        const token = jwt.sign({_id:user._id},process.env.TOKEN_SECRET,{expiresIn: '30d'});
        res.send({
            success: true,
            message:"User Logged In Successfull",
            data: token
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        });
    }
});

router.get('/get-current-user',authMiddleware, async (req,res)=>{
    try {
        const user = await User.findById(req.body.userId);
        res.send({
            success: true,
            message:"User fetch Successfully",
            data:user
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
});

router.get('/get-users',authMiddleware, async (req,res)=>{
    try {
        const users = await User.find();
        res.send({
            success:true,
            message:"Users Fetched Successfully",
            data:users,
        });
    } catch (error) {
        res.send({
            success:false,
            message:error.message,
        });
    }
});

router.put('/update-user-status/:id', authMiddleware,async(req,res)=>{
    try {
        await User.findByIdAndUpdate(req.params.id,req.body);
        res.send({
            success:true,
            message:"User Status Updated Successfully",
        });
    } catch (error) {
        res.send({
            success:false,
            message:error.message
        });
    }
});

module.exports = router;