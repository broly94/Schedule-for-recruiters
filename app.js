import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import './models/indexModels.js';

//Import Routes
import { recruiterRoutes } from './routes/Recruiter.routes.js';
import { loginRoutes } from './routes/Login.routes.js';
import { applicantsRoutes } from './routes/applicants.routes.js';

//Config App
const app = express();
dotenv.config()

//middlewares
app.use(morgan('dev'));
app.use(express.json());

//Routes configuration
app.get('/', (req, res) => res.json({developer: 'Leonel Carro', project: 'schedule for recruiters'}));
app.use('/recruiter', recruiterRoutes);
app.use('/login', loginRoutes);
app.use('/applicants', applicantsRoutes);

export default app;