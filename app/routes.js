'use strict';

const express = require('express');
const router = express.Router();

const start = require('./controllers/start.js');
const dashboard = require('./controllers/dashboard.js');
const about = require('./controllers/about.js');
const club = require('./controllers/club.js');
const accounts = require ('./controllers/accounts.js');

router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);

router.get('/start', start.index);
router.get('/dashboard', dashboard.index);
router.get('/about', about.index);
router.get('/club/:id', club.index);

router.get('/club/:id/deleteAthlete/:athleteid', club.deleteAthlete);
router.post('/club/:id/addathlete', club.addAthlete);

router.get('/dashboard/deleteclub/:id', dashboard.deleteClub);
router.post('/dashboard/addclub', dashboard.addClub);

router.post('/club/:id/updateathlete/:athleteid', club.updateAthlete);

module.exports = router;

