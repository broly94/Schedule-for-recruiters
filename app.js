import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';

//Import Routes
import { recruiterRoutes } from './routes/Recruiter.routes.js';
import { loginRoutes } from './routes/Login.routes.js';
import { employeesRoutes } from './routes/Employees.routes.js';


//Config App
const app = express();
dotenv.config()

//middlewares
app.use(morgan('dev'));
app.use(express.json());

//Routes configuration
app.use('/recruiter', recruiterRoutes);
app.use('/login', loginRoutes);
app.use('/employees', employeesRoutes);

export default app;