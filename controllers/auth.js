import bcrypt from "bcryptjs"
import User from "../model/user.js";
import jwt from "jsonwebtoken"

var salt = bcrypt.genSaltSync(4);


export const login = async (req, res) => {
    try {

        const user = await User.findOne({
            username:req.body.username
        })
        if(!user) return res.send("Username not found")

        const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password)
        if(!isPasswordCorrect) return res.send("Password is incorrect")

        const token = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.JWT ) 
        res.cookie("access_token",token, {httpOnly : true}).send(user)
        
    } catch (error) {
        console.log(error)
    }
}

export const register = async (req, res) => {
    try {
        var hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: hash,
        })

        const token = jwt.sign({id: newUser._id, isAdmin: newUser.isAdmin}, process.env.JWT ) 
        res.cookie("access_token",token, {httpOnly : true}).send(newUser)


        // res.status(200).json(newUser)
    } catch (error) {
        console.log(error)
    }
}