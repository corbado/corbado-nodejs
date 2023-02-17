const express = require('express');
const app = express();
const cors = require('cors');
const Corbado = require('node-sdk');
require('dotenv').config();

const PORT = process.env.PORT || 3005;
const PROJECT_ID = process.env.PROJECT_ID;
const API_SECRET = process.env.API_SECRET;


app.use(cors());
app.use(express.json());


app.get('/', function (req, res) {
    res.send('Hello World!');
});


app.get('/logged-in', async function (req, res, next) {
    const corbado = new Corbado(PROJECT_ID, API_SECRET);
    const token = req.query.sessionToken;
    const clientInfo = corbado.utils.getClientInfo(req);

    try {
        const {data} = await corbado.sessionService.sessionTokenVerify(token, clientInfo);
        const userData = JSON.parse(data.userData);

        /*
          IMPLEMENT YOUR SESSION MANAGEMENT HERE
        */

        res.json({
            message: "The user " + userData.username + " has successfully logged in",
            result: "success"
        });
    } catch (error) {
        console.error('Error verifying session token:', error.message);
        next(error);
    }
});

app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({
        message: 'Internal server error',
        result: 'error'
    });
});

app.listen(PORT, function () {
    console.log(`Example app listening on port ${PORT}!`);
});