const express = require('express');
const app = express();
const cors = require('cors');
const Corbado = require('node-sdk');


app.use(cors());
app.use(express.json());


app.get('/', function (req, res) {
    res.send('Hello World!');
});


app.get('/logged-in', async function (req, res) {

    const corbado = new Corbado('pro-15532438046016049903','dyJACyayAB8boJFPxtuVNCgb3HUo2f');

    let token = req.query.sessionToken;
    let clientInfo = corbado.utils.getClientInfo(req);

    let {data} = await corbado.sessionService.sessionTokenVerify(token, clientInfo);

    console.log(data)
    let userData = JSON.parse(data.userData);

    /*
        IMPLEMENT YOUR SESSION MANAGEMENT HERE
     */

    res.json({
        message: "The user " + userData.username + " has successfully logged in",
        result: "success"
    });
})


app.listen(3005, function () {
    console.log('Example app listening on port 3005!');
});



