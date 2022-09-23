"use strict";

const logger = require("../utilities/logger");
const uuid = require("uuid");
const clubStore = require("../models/club-store");
const accounts = require("./accounts.js");

const club = {
  index(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const clubId = request.params.id;
    logger.debug("Club id = " + clubId);
    if (loggedInUser) {
      const viewData = {
        title: "Club",
        club: clubStore.getClub(clubId),
        fullname: loggedInUser.firstName + " " + loggedInUser.lastName
      };
      response.render("club", viewData);
    } else response.redirect("/");
  },
  deleteAthlete(request, response) {
    const clubId = request.params.id;
    const athleteId = request.params.athleteid;
    logger.debug("Deleting Athlete" + athleteId + "from Club" + clubId);
    club.remove(clubId, athleteId);
    response.redirect("/club/" + clubId);
  },
  addAthlete(request, response) {
    const clubId = request.params.id;
    const club = clubStore.getClub(clubId);
    const newAthlete = {
      id: uuid(),
      name: request.body.name,
      age: request.body.age,
      event: request.body.event,
      medals: request.body.medals
    };
    clubStore.addAthlete(clubId, newAthlete);
    response.redirect("/club/" + clubId);
  },
  updateAthlete(request, response) {
    const clubId = request.params.id;
    const athleteId = request.params.athleteid;
    logger.debug("updating athlete " + athleteId);
    const updatedathlete = {
      name: request.body.name,
      age: request.body.age,
      event: request.body.event,
      medals: request.body.medals
    };
    clubStore.editAthlete(clubId, athleteId, updatedathlete);
    response.redirect("/club/" + clubId);
  }
};

module.exports = club;
