/*
 * Created on Mon Jun 22 2020
 *
 * Author: Ogunleke Abiodun
 * Copyright (c) 2020 ALLOFFT Inc
 */

var express = require('express');
var router = express.Router();
var debug = require('debug')('backend:index');
var {Connection} = require('../lib/db');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/test', function(req, res) {
  if(Connection.isConnected()){
    res.send("Connected to DB");
  }
  else{
    res.send("Not Connected to DB");
  }
  
});


module.exports = router;
