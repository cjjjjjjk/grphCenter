import { Request, Response, Router } from "express";
import Users from "../model/Users";

import bcrypt from 'bcrypt'
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken'
dotenv.config();

const userRoutes = Router()
// Hash password ============================================
const HashPassword = async function (textPassword: string) {
    const salt = bcrypt.genSaltSync(Number(process.env.SALTROUNDS))
    const hash: string = bcrypt.hashSync(textPassword, salt)
    return hash
}


// Register new user ========================================
userRoutes.post("/create", async (req: Request, res: Response) => {
    const { username, password, email } = req.body;
    try {
        const passWord_hasshed = await HashPassword(password)
        const newUser = new Users({ username, password: passWord_hasshed, email })

        await newUser.save()
        res.status(201).json({
            success: true,
            message: "User created successfully",
            user: newUser,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err instanceof Error ? err.message : "Error creating user",
        });
    }
})

// Login ====================================================
userRoutes.post("/login", async (req: Request, res: Response) => {
    const { username, password } = req.body;
    try {
        if (!password) throw new Error('Password can not be empty !')

        const user = await Users.findOne({ username })
        if (!user) throw new Error(`No user match with username: ${username}`)
        const checkPassword = bcrypt.compareSync(password, user?.password)


        if (!checkPassword) throw new Error('Compare password false !')

        const user_token = jwt.sign({
            _id: user._id,
            username: user.username,
            useremail: user.email,
        }, `${process.env.SCRETKEY || "abc-123"}`, { expiresIn: `${process.env.TOKENEXPIRED || "1h"}` })

        res.json({
            success: true,
            message: "Login sucess !",
            token: user_token
        })
    } catch (err) {
        res.json({
            success: false,
            message: err instanceof Error ? err.message : 'Server: Login false',
        })
    }
})

export default userRoutes;