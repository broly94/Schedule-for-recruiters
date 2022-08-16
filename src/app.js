import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import './models/associationsModels.js';

//Import Routes
import { recruiterRoutes } from './routes/recruiter.routes.js';
import { loginRoutes } from './routes/login.routes.js';
import { candidatesRoutes } from './routes/candidates.routes.js';

//Config App
const app = express();
dotenv.config()

//middlewares
app.use(morgan('dev'));
app.use(express.json());

//Routes configuration
app.get('/api', (req, res) => res.json({developer: 'Leonel Carro', project: 'schedule for recruiters'}));
app.use('/api/recruiter', recruiterRoutes);
app.use('/api/login', loginRoutes);
app.use('/api/candidate', candidatesRoutes);

export default app;