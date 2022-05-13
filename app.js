import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import bodyParser from 'body-parser';

//Import Routes
import { recruiterRoutes } from './routes/Recruiter.routes.js';
import { loginRoutes } from './routes/Login.routes.js';

//Config App
const app = express();
dotenv.config()

//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Routes configuration
app.use('/recruiter', recruiterRoutes);
app.use('/login', loginRoutes);

export default app;