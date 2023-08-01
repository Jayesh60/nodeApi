import express from "express"
import { deleteUser, getAllUser, getUser, updateUser } from "../controllers/user.js"
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verify.js"

const router = express.Router()


// read  
router.get("/user/:id",verifyToken, getUser)

// read all 
router.get("/users",verifyToken, getAllUser)

// update 
router.patch("/user/:id",verifyUser, updateUser)

// delete 
router.delete("/user/:id",verifyUser, deleteUser)

export default router