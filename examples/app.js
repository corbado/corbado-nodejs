var express = require('express');
var app = express();
var cors = require('cors');
const Corbado = require('../corbado-nodejs');
const cookieParser = require('cookie-parser')
require('dotenv').config()


app.use(cors({
    credentials: true,
    origin: true,
}));
app.use(express.json());
app.use(cookieParser())

// Session management v1
/*
const projectID = process.env.PROJECT_ID_V1;
const apiSecret = process.env.API_SECRET_V1;

const config = new Corbado.Configuration(projectID, apiSecret);
const corbado = new Corbado.SDK(config);*/


// Session management v2
const projectID = process.env.PROJECT_ID_V2;
const apiSecret = process.env.API_SECRET_V2;

const config = new Corbado.Configuration(projectID, apiSecret);
const corbado = new Corbado.SDK(config);


app.get('/', function (req, res) {
    res.send('Hello World!');
});


app.get('/logged-in', async function (req, res) {

    // Session Management v1

    /* let corbadoSessionToken = req.query.corbadoSessionToken;
     let clientInfo = Corbado.getClientInfo(req);
     let response = await corbado.session.verify(corbadoSessionToken, clientInfo);

     let userData = response.data.user

     // Insert own session management here

     res.json({
         name: userData.fullName,
         email: userData.emails[0].email
     });*/


    // Session Management v2

    try {
        const usr = await corbado.session.validateShortSessionValue(req);
        res.json({
            name: usr.name,
            email: usr.email,
            phoneNumber: usr.phoneNumber,
        });
    } catch (err) {
        console.error(err)
        res.status(401).json({});
    }
})


app.listen(3005, function () {
    console.log('Example app listening on port 3005!');
});



