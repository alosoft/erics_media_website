let express = require('express');
let router = express.Router();
let Home = require('../models/home');
let methodOverride = require('method-override');
let middleware = require('../middleware');