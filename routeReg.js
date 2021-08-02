'use strict';

const loginRouter = require('./routes/login-route');

const routerRegistration = (app) => {


    app.use(loginRouter.router);


};

module.exports = routerRegistration;
