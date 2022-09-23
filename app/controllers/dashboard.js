"use strict";

const logger = require("../utilities/logger");
const uuid = require("uuid");
const accounts = require("./accounts.js");

const clubStore = require("../models/club-store.js");

const dashboard = {
  
  index(request, response) {
    logger.info("dashboard rendering");
    const loggedInUser = accounts.getCurrentUser(request);
    if (loggedInUser) {
      const viewData = {
        title: "Club Dashboard",
        clubs: clubStore.getUserClubs(loggedInUser.id),
        fullname: loggedInUser.firstName + " " + loggedInUser.lastName
      };
      logger.info("about to render" + viewData.clubs);
      response.render("dashboard", viewData);
    } else response.redirect("/");
  },

  deleteClub(request, response) {
    const clubId = request.params.id;
    logger.debug("Deleting Club" + clubId);
    clubStore.removeClub(clubId);
    response.redirect("/dashboard");
  },

  addClub(request, response) {
    const date = new Date();
    const loggedInUser = accounts.getCurrentUser(request);
    const newClub = {
      id: uuid(),
      userid: loggedInUser.id,
      title: request.body.title,
      picture: request.files.picture,
      date: date,
      athletes: []
    };
    logger.debug("Creating a new Club" + newClub);
    clubStore.addClub(newClub, function() {
      response.redirect("/dashboard");
    });
  }
};

module.exports = dashboard;
