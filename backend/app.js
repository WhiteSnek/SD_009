import express from 'express';
import { PORT, NODE_ENV } from './config/env.js';
import workloadRouter from './routes/workload.js';
const app = express();
app.use(express.json());

app.use('/workload', workloadRouter);

app.get('/',(req,res)=> {
    res.send("Welcome To our Backend Service");
});

app.listen(PORT,async ()=>{
    console.log(`Server Running on Port ${PORT} in ${NODE_ENV} mode`);
});


export default app;