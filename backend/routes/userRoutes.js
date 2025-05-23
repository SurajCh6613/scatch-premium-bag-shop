const express = require("express");
const User = require("../models/userModel");
const router = express.Router();

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = new User({
      name,
      email,
      password,
    });

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.error("Registration error:", error); // Log error in console
    setMessage(error.message || "Something went wrong");
  }
};

router.post("/register", registerUser);

router.get("/login",(req,res)=>{
  res.send("Login User")
})

router.post("/login",async(req,res)=>{
  console.log(req.body);
  
  const {email,password} = req.body;
  const user = await User.findOne({email})

  if(!user || password!==user.password){
    return res.status(400).json({message:"Something wrong P"});
  }
  res.status(201).json({message:"You can Login"})
})

module.exports = router;
