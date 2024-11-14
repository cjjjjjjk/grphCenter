import { Request, Response, Router } from "express";
import Users from "../model/Users";
import Graphs from "../model/Graphs";

const graphRoutes = Router()

// Create new Graph =======================================================
graphRoutes.post("/create", async (req: Request, res: Response) => {
    const { user_id, directed, weighted } = req.body
    try {
        const newGraph = new Graphs({ user_id, directed, weighted })
        await newGraph.save()

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err instanceof Error ? err.message : "Error create graph !"
        });
    }

})

export default graphRoutes;