const userModel = require("../models/user");
const SECRET_KEY="NOTESAPI"
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const signup = async(req,res)=>{
    //Existing user check
    //hashedpassword
    //userCreation
    //TokenGenerate

    

    const {userName ,email , password} = req.body;
    try {
        let existingUser = await userModel.findOne({ email });
        if (existingUser){
            return res.status(409).json('Email already in use');
        } 

        const hashedPassword=await bcrypt.hashSync(password, 10);

        const result = await userModel.create({
            email: email,
            password : hashedPassword,
            userName: userName
            })

        const token = jwt.sign({email:result.email,
        id:result._id},SECRET_KEY);
        res.status(201).json({user:result,token})
            

}catch(error){

    console.log(error);
    res.status(500).json({message:"something went wrong"});

 }
}
const signin= async (req,res) =>{
    const{email,password}=req.body;
    try{
        let existingUser = await userModel.findOne({ email });
        if (!existingUser){
            return res.status(404).json('User Not Found');
        }

        const matchPassword = await bcrypt.compare(password,existingUser.password)

        if(!matchPassword){
           return res.status(400).json({message:"Invalid credentials"});
        }

        const token = jwt.sign({email:existingUser.email,
            id:existingUser._id},SECRET_KEY);
            res.status(201).json({user:existingUser,token})

    }catch(error){

        console.log(error);
        res.status(500).json({message:"something went wrong"});
    }
}

module.exports={signup,signin}