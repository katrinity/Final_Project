const db = require("../models");

// Defining methods for the booksController
module.exports = {
  findAll: function(query, cb, errcb) {
    db.Movie
      .find(query)
      .then(dbModel => cb(dbModel))
      .catch(err => errcb(err));
  },
  findById: function(req, res) {
    db.Movie
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Movie
      .create(req.body)
      .then(dbModel => res.json(dbModel));
  },
  update: function(req, res) {
    db.Movie
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Movie
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
