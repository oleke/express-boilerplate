/*
 * Created on Mon Jun 22 2020
 *
 * Author: Ogunleke Abiodun
 * Copyright (c) 2020 ALLOFFT Inc
 */

var express = require('express');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
//const querystring = require('querystring');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());

app.use('/', indexRouter);
app.use('/user', usersRouter);


module.exports = app;