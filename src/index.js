import express from 'express';
import morgan from 'morgan';
import './models/associationsModels.js';
import './db/connection.js'

//Import Routes
import { recruiterRoutes } from './routes/recruiter.routes.js';
import { loginRoutes } from './routes/login.routes.js';
import { candidatesRoutes } from './routes/candidates.routes.js';

//Config App
const app = express();

//Set vars
app.set('port', process.env.PORT);
const port = app.get('port') || 3000;


//middlewares
app.use(morgan('dev'));
app.use(express.json());


//Routes configuration
app.get('/api', (req, res) => res.json({developer: 'Leonel Carro', project: 'schedule for recruiters'}));
app.use('/api/recruiter', recruiterRoutes);
app.use('/api/login', loginRoutes);
app.use('/api/candidate', candidatesRoutes);

//Start server
app.listen(port, () => {
    console.log(`Server on port ${port}`);
})