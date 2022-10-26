//Requiring Module
var express = require('express');
var app = express();
var http = require('http').Server(app);

// const bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json());

//Imported the authentication and authorization module
const authentication = require('./Middleware/authentication');

const authorization = require('./Middleware/authorization');  

require('./Routes/Student')(app, authentication.authenticate, authorization.authorize);
require('./Routes/Course')(app, authentication.authenticate, authorization.authorize);

//Home Route
app.get('/',(req,res)=>{
    res.send('Homepage');
});

app.listen(3000, ()=>{
    console.log("Your server is running on port 3000");
});