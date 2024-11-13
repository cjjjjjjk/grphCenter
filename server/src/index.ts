import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
const app = express();
dotenv.config();

const PORT = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, Express with TypeScript!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
