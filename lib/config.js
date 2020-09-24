/*
 * Created on Tue Jun 23 2020
 *
 * Author: Ogunleke Abiodun
 * Copyright (c) 2020 ALLOFFT Inc
 */

const dotenv = require('dotenv');
dotenv.config();

module.exports = {MONGO_URL:process.env.MONGO_URL, MONGO_DEV_URL:process.env.MONGO_DEV_URL};