/* SERVER INSTRUCTIONS
    DEPLOY TO HEROKU
    1.  CD TO CLIENT, DELETE BUILD
    2.  MAKE CHANGES > NPM RUN BUILD in Client 
    3.  GIT ADD -A > GIT COMMIT -M 
    4.  HEROKU LOGIN
    5.  GIT PUSH HEROKU MASTER 
_________________________________________________________________
*/

const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const { sendMail } = require("./routes/mailer");
const { processWeatherRequest, processWeatherLocationRequest } = require("./routes/weather");

require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
    const appName = __dirname + "/client/build/";
    app.use(express.static(appName));
    app.get('*', (req, res) => {
        res.sendFile(appName + "index.html");
    });
}

//  *****************
//  *****************
//       ROUTES
//  *****************
//  *****************
app.post('/api/sendEmail', async (req, res) => {
    try {
        if (process.env.NODE_ENV !== 'production') {
            console.log('LOCAL DEV');
            reject('ERROR');
        } else {
            const { from, name, subject, message } = req.body;
            await sendMail(from, name, subject, message);
            res.status(200).json({ message: 'Sucessfully sent your email!' });
        }
    } catch(err) {
        console.error(err);
        res.status(500).json({ error: 'Apologies, your email failed to send...' });
    }
});

app.post('/api/getWeather', async (req, res) => {
    try {
        const selCity = req.body.city || null;
        if (selCity) {
            if (process.env.NODE_ENV !== 'production') {
                console.log('LOCAL DEV');
                reject('ERROR');
            } else {
                const cityWeatherData = await processWeatherRequest(selCity);
                res.json(cityWeatherData);
            }
        }
    } catch(err) {
        console.error(err);
        res.status(500).json({ error: 'Apologies, your request failed...' });
    }    
});
app.post('/api/getWeather/curLocation', async (req, res) => {
    try {
        const { lat, long } = req.body;
        if (lat && long) {
            if (process.env.NODE_ENV !== 'production') {
                console.log('LOCAL DEV');
                reject('ERROR');
            } else {
                const cityWeatherData = await processWeatherLocationRequest(lat, long);
                res.json(cityWeatherData);
            }
        }
    } catch(err) {
        console.error(err);
        res.status(500).json({ error: 'Apologies, your request failed...' });
    }    
});


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
