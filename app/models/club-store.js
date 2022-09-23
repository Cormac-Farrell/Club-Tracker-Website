'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');
const cloudinary = require('cloudinary');
const logger = require('../utilities/logger');

try {
  const env = require('../.data/.env.json');
  cloudinary.config(env.cloudinary);
}
catch(e) {
  logger.info('You must provide a Cloudinary credentials file - see README.md');
  process.exit(1);
}

const clubStore = {

  store: new JsonStore('./models/club-store.json', { clubCollection: [] }),
  collection: 'clubCollection',

  getAllClubs() {
    return this.store.findAll(this.collection);
  },

  getClub(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  addClub(club, response) {
    club.picture.mv('tempimage', err => {
        if (!err) {
          cloudinary.uploader.upload('tempimage', result => {
            console.log(result);
            club.picture = result.url;
            response();
          });
        }
      });
    this.store.add(this.collection, club);
  },

  removeClub(id) {
    const club = this.getClub(id);
    this.store.remove(this.collection, club);
  },

  removeAllClubs() {
    this.store.removeAll(this.collection);
  },

  addAthlete(id, athlete) {
    const club = this.getClub(id);
    club.athletes.push(athlete);
  },

  removeAthlete(id, athleteId) {
    const club = this.getClub(id);
    const athletes = club.athletes;
    _.remove(athletes, { id: athleteId});
  },
  
  editAthlete(id, athleteId, updatedAthlete) {
    const club = this.getClub(id);
    const athletes = club.athletes;
    const index = athletes.findIndex(athlete => athlete.id === athleteId);
    athletes[index].name = updatedAthlete.name;
    athletes[index].age = updatedAthlete.age;
    athletes[index].event = updatedAthlete.event;
    athletes[index].medals = updatedAthlete.medals;
  },
  
  getUserClubs(userid) {
    return this.store.findBy(this.collection, { userid: userid });
  },
};

module.exports = clubStore;