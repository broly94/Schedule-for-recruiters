import app from './app.js'

//Set vars
app.set('port', process.env.PORT);
const port = app.get('port') || 3000;

//Start server
app.listen(port, () => {
    console.log(`Server on port ${port}`);
})