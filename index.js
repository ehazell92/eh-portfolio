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
const recordRts = require("./routes/record");
const { sendMail } = require("./routes/mailer");

require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use('/api/record', recordRts);

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
        const { to, subject, msg } = req.body;
        await sendMail(to, subject, msg);
        res.status(200).json({ message: 'Sucessfully sent your email!' });
    } catch(err) {
        console.error(err);
        res.status(500).json({ error: 'Apologies, your email failed to send...' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
