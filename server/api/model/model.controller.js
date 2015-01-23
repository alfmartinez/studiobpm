'use strict';

var _ = require('lodash');
var Model = require('./model.model');

// Get list of models
exports.index = function(req, res) {
  Model.find({
      'access.user': req.user._id
    })
    .exec(function(err, models) {
      if (err) {
        return handleError(res, err);
      }
      return res.json(200, models);
    });
};

// Get a single model
exports.show = function(req, res) {
  Model.findById(req.params.id, function(err, model) {
    if (err) {
      return handleError(res, err);
    }
    if (!model) {
      return res.send(404);
    }
    return res.json(model);
  });
};

// Creates a new model in the DB.
exports.create = function(req, res) {
  Model.create(req.body, function(err, model) {
    if (err) {
      return handleError(res, err);
    }
    return res.json(201, model);
  });
};

// Updates an existing model in the DB.
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Model.findById(req.params.id, function(err, model) {
    if (err) {
      return handleError(res, err);
    }
    if (!model) {
      return res.send(404);
    }
    var updated = _.merge(model, req.body);
    updated.save(function(err) {
      if (err) {
        return handleError(res, err);
      }
      return res.json(200, model);
    });
  });
};

// Deletes a model from the DB.
exports.destroy = function(req, res) {
  Model.findById(req.params.id, function(err, model) {
    if (err) {
      return handleError(res, err);
    }
    if (!model) {
      return res.send(404);
    }
    model.remove(function(err) {
      if (err) {
        return handleError(res, err);
      }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
