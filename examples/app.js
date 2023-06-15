import express from 'express';
import cors from 'cors';
import {SDK, Configuration} from '../corbado-nodejs';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

dotenv.config()

const app = express();

app.use(cors({
    credentials: true,
    origin: true,
}));
app.use(express.json());
app.use(cookieParser())


const projectID = process.env.PROJECT_ID;
const apiSecret = process.env.API_SECRET;

const config = new Configuration(projectID, apiSecret);
const corbado = new SDK(config);


app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.get('/logged-in', async (req, res) => {

    // BRING YOUR OWN SESSION MANAGEMENT

    /* let corbadoSessionToken = req.query.corbadoSessionToken;
     let clientInfo = SDK.getClientInfo(req);
     let response = await corbado.authtoken.validate(corbadoSessionToken, clientInfo);

     let userData = response.data.user

     // Insert own session management here

     res.json({
         name: userData.fullName,
         email: userData.emails[0].email
     });*/


    // CORBADO SESSION MANAGEMENT

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


app.listen(3005, () => {
    console.log('Example app listening on port 3005!');
});



