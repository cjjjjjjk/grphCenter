import { Request, Response, Router } from "express";
import Users from "../model/Users";

const userRoutes = Router()

// Register new user
userRoutes.post("/create", async (req: Request, res: Response) => {
    const { username, password, email } = req.body;
    try {
        const newUser = new Users({ username, password, email })
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

export default userRoutes;