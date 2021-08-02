'use strict';

const bodyParser = require('body-parser');
const morgan = require('morgan');
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const config = require('config');
const httpStatusCodes = require("http-status-codes");


const app = express();


// app monitor
// require('appmetrics-dash').attach();
// require('appmetrics-prometheus').attach();

// PORT definition
const PORT = process.env.PORT || config.server.PORT;




// use the cors
app.use(cors());

// enable the body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Logging for development
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
// app.use(morgan(':method :url :response-time', {stream: logger.stream}));
morgan(':method :url :status :res[content-length] - :response-time ms')


// KEY validations and escapes
// app.all('/*', [require('./controllers/validate-api-key')]);

// route definitions
const routerReg = require('./routeReg');
routerReg(app);


//app.use(express.static(__dirname + "/dist"));

// Error Handling
// app.use((err, req, res, next) => {
//     Error.res(res, err);

// });

app.listen(PORT).on('error', (error) => {
    console.log(`[Start Server]:  ${error}`);
});
console.log(`[Start Server]: Started on port ${PORT}`);


process.on('unhandledRejection', (reason, p) => {
    console.log("Possibly Unhandled Rejection at: Promise ", p, " reason: ", reason.msg);
});
