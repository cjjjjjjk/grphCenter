import express, { Request, Response } from 'express';
import connectDB from './config/database';
import dotenv from 'dotenv';
import userRoutes from './routes/user';
import graphRoutes from './routes/graph';
import cors from 'cors';


dotenv.config();
const app = express();
const PORT = process.env.PORT;

connectDB()

app.use(express.json());
app.use(cors())

// Routes ========================================================
app.use("/api/users", userRoutes)
app.use("/api/graphs", graphRoutes)





// ===============================================================

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
