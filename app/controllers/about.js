'use strict';

const logger = require('../utilities/logger');
const developerStore = require('../models/developer-store.js');
const accounts = require ('./accounts.js');

const about = {
  
  index(request, response) {
    const loggedInUser = accounts.getCurrentUser(request); 
    logger.info('about rendering');
    if (loggedInUser) {
      const viewData = {
        title: 'About the Club Tracker App',
        developers: developerStore.getAllDevelopers(),
        fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
      };
      response.render('about', viewData);
    }
    else response.redirect('/');    
  },
  
};

module.exports = about;