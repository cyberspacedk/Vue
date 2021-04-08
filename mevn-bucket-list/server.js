const path = require('path');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const {PORT, mongoUri} = require('./config');

const logger = require('./logger');
const bucketListItemRoutes = require('./routes/api/bucketListItems');

app.use(cors());
app.use(morgan("tiny"));
app.use(bodyParser.json());

// Connect to DB 
mongoose
    .connect(mongoUri, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    .then(logger.dbConnected)
    .catch(logger.dbConnectionFailed)

app.use('/api/bucketListItems', bucketListItemRoutes);

// Serve vue
if(process.env.NODE_ENV === "production"){
    app.use(express.static("client/dist"));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"))
    })
}

app.listen(PORT, ()=> console.log("SERVER STARTED AT PORT " + PORT)) 