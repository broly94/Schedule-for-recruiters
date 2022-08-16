"use strict";

var _express = _interopRequireDefault(require("express"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _morgan = _interopRequireDefault(require("morgan"));

require("./models/associationsModels.js");

require("./db/connection.js");

var _recruiterRoutes = require("./routes/recruiter.routes.js");

var _loginRoutes = require("./routes/login.routes.js");

var _candidatesRoutes = require("./routes/candidates.routes.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Import Routes
//Config App
const app = (0, _express.default)();

_dotenv.default.config(); //Set port


app.set('port', process.env.PORT);
const port = app.get('port') || 3000; //middlewares

app.use((0, _morgan.default)('dev'));
app.use(_express.default.json()); //Routes configuration

app.get('/api', (req, res) => res.json({
  developer: 'Leonel Carro',
  project: 'schedule for recruiters'
}));
app.use('/api/recruiter', _recruiterRoutes.recruiterRoutes);
app.use('/api/login', _loginRoutes.loginRoutes);
app.use('/api/candidate', _candidatesRoutes.candidatesRoutes); //Start server

app.listen(port, () => {
  console.log(`Server on port ${port}`);
});