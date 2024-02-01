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
const path = require('path');

require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());

const recordRts = require("./routes/record")
app.use('/api/record', recordRts);

// Get MongoDB driver connection
// const dbo = require("./db/conn");

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
    const appName = __dirname + "/client/build/";
    app.use(express.static(appName));
    app.get('*', (req, res) => {
        res.sendFile(appName + "index.html");
    });
}

app.listen(port, () => {
    // Perform a database connection when server starts
    // dbo.connectToServer(function (err) {
    //     if (err) console.error(err);
    // });
    console.log(`Server is running on port: ${port}`);
});