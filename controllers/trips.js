const Trip = require('../models/trip')

function indexRoute(req, res, next) {
  Trip
    .find()
    .then(trips => res.status(200).json(trips))
    .catch(next)
}

function createRoute(req, res, next) {
  Trip
    .create(req.body)
    .then(trip => res.status(201).json(trip))
    .catch(next)
}

function showRoute(req, res, next) {
  Trip
    .findById(req.params.id)
    .then(trip => res.status(200).json(trip))
    .catch(next)
}

function updateRoute (req, res, next) {
  Trip
    .findById(req.params.id)
    .then(trip => trip.set(req.body))
    .then(trip => trip.save())
    .then(trip => res.status(200).json(trip))
    .catch(next)
}

function deleteRoute (req, res, next) {
  Trip
    .findById(req.params.id)
    .then(trip => trip.remove())
    .then(() => res.sendStatus(204))
    .catch(next)

}

function commentCreateRoute(req, res, next) {
  req.body.user = req.currentUser
  Trip
    .findById(req.params.id)
    .then(trip => {
      trip.comments.push(req.body)
      return trip.save()
    })
    .then(trip => res.status(201).json(trip))
    .catch(next)
}

function commentDeleteRoute(req, res, next) {
  Trip
    .findById(req.params.id)
    .then(trip => {
      const comment = trip.comments.id(req.params.commentId)
      return comment.remove()
    })
    .then(trip => res.json(trip))
    .catch(next)
}

module.exports = {
  index: indexRoute,
  create: createRoute,
  show: showRoute,
  update: updateRoute,
  delete: deleteRoute,
  commentCreate: commentCreateRoute,
  commentDelete: commentDeleteRoute
}
