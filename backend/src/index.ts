import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import routes from './routes';
import { Request, Response } from 'express';

const app = express();

app.use(cors());
app.use(express.json({ limit: '10kb' }));

app.get('/', (req: Request, res: Response) => {
    res.send('Home page');
});


app.use('/v1', routes);


export default app;
