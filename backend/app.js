const express = require('express');

require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const routes = require('./routes');
const app = express();



const { environment } = require('././config');
const isProduction = environment === 'production';

app.use(cookieParser());
app.use(express.json());

if (!isProduction) {
    app.use(cors());
};

app.use(helmet.crossOriginResourcePolicy({
    policy:'cross-origin'
}));

app.use(csurf({
    cookie: {
        sameSite: isProduction && 'Lax',
        secure: isProduction,
        httpOnly: true
    }
}));

app.use(routes);

module.exports = app;
