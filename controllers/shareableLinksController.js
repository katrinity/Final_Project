const db = require("../models");

module.exports = {
  findAll: function(query, cb, errcb) {
    db.ShareableLink
      .find(query)
      .then(model => cb(model))
      .catch(err => errcb(err));
  },
  findById: function(req, res) {
    db.ShareableLink
      .findById(req.params.id)
      .then(model => res.json(model))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.ShareableLink
      .create(req.body)
      .then(model => res.json(model));
  },
  update: function(req, res) {
    db.ShareableLink
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(model => res.json(model))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.ShareableLink
      .findById({ _id: req.params.id })
      .then(model => model.remove())
      .then(model => res.json(model))
      .catch(err => res.status(422).json(err));
  }
};
