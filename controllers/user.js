import User from "../model/user.js";


export const getUser = async (req, res) => {
    try {
        const user = await User.find({
            _id: req.params.id
        })
        res.json(user)
    } catch (error) {
        console.log(error)
    }
}

export const getAllUser = async (req, res) => {
    try {
        // sort({_id:-1}) ====== for getting newest data first from db 
        const users = await User.find({}).sort({
            _id: -1
        })
        res.json(users)
    } catch (error) {
        console.log(error)
    }
}

export const updateUser = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {
            new: true
        })
        if (!updatedUser) res.send("failed")
        res.json(updatedUser)
    } catch (error) {
        console.log(error)
    }
}

export const deleteUser = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndRemove(req.params.id)
        if (!updatedUser) res.send("failed")
        res.send(updatedUser)
    } catch (error) {
        console.log(error)
    }
}