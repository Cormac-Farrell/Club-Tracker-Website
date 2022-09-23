'use strict';

const logger = require('../utilities/logger');
const clubStore = require('../models/club-store.js');
const accounts = require ('./accounts.js');

const start = {
  
  index(request, response) {
    
    const loggedInUser = accounts.getCurrentUser(request);
    logger.info('start rendering');
    
    if(loggedInUser){
      
      const clubs = clubStore.getAllClubs();
      let numClubs = clubs.medalswon;
      let numAthletes = 0;
      for (let i in clubs) {
        numAthletes = numAthletes + clubs[i].athletes.medalswon;
      }

      const viewData = {
        title: 'Welcome to the Club Tracker App!',
        totalClubs: numClubs,
        totalAthletes: numAthletes,
        fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
      };

      response.render('start', viewData);
    }
    else response.redirect('/');
  },
};

module.exports = start;