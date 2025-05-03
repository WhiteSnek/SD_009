import express from 'express';
import { PORT, NODE_ENV } from './config/env.js';
import workloadRouter from './routes/workload.js';
import cors from 'cors';
import arcjetMiddleware from './middleware/arcjetMiddleware.js';

const app = express();
app.use(cors({
    origin: 'http://frontend',
  }));
app.use(express.json());
app.use(arcjetMiddleware);

app.use('/workload', workloadRouter);

app.get('/',(req,res)=> {
    res.send("Welcome To our Backend Service");
});

app.listen(PORT,async ()=>{
    console.log(`Server Running on Port ${PORT} in ${NODE_ENV} mode`);
});


export default app;