const express = require("express");

const app = express();

const cors = require("cors");

require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());

const recordRts = require("./routes/record")
app.use('/api/record', recordRts);

// Get MongoDB driver connection
// const dbo = require("./db/conn");

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
    console.log('_ In PROD or STAGING _');
    app.use(express.static(path.join(__dirname, "/client/build")));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname + "/client/build/index.html"));
    });
}

app.listen(port, () => {
    // Perform a database connection when server starts
    // dbo.connectToServer(function (err) {
    //     if (err) console.error(err);
    // });
    console.log(`Server is running on port: ${port}`);
});