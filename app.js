import express from 'express';
import dotenv from 'dotenv';

//Import Routes
import {router as recuiterRoutes} from  './routes/Recruiter.routes.js';

const app = express();
dotenv.config()

//Routes configuration
app.use('/reclutadores', recuiterRoutes);

export default app;