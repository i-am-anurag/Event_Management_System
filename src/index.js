const express = require('express');
const bodyParser = require('body-parser');

const {connect,PORT} = require('./config/serverConfig');

const appRoutes = require('./routes/index');


const serverStart = ()=>{
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.use('/',appRoutes);
    
    
    app.listen(PORT,async()=>{
        console.log('Server is running on port No:',PORT);
        await connect();
        console.log("Mongo db is connected");
    });
}

serverStart();