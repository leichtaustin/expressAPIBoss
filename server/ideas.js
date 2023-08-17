const ideasRouter = require('express').Router;

module.exports = ideasRouter;

const { 
    addToDatabase,
    getAllFromDatabase,
    getFromDatabaseById,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
  } = require('./db');

  ideasRouter.param('ideaId', (req, res, next, id) => {
    const idea = getFromDatabaseById('ideas', id);
    if(idea) {
        req.idea = idea;
        next();
    } else {
        res.status(404).send();
    }
  });

  ideasRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('ideas'));
  });

  ideasRouter.post('/', (req, res, next) => {
    const newIdea = addToDatabase('ideas', req.body);
    req.status(201).send(newIdea);
  });

  ideasRouter.get('/:ideaId', (req, res, next) => {
    res.send(req.idea);
  });

  ideasRouter.put('/:ideaId', (req, res, next) => {
    let updatedIdeaInstance = updateInstanceInDatabase('ideas', req.body);
    res.send(updatedIdeaInstance);
  });

  ideasRouter.delete('/:ideaId', (req, res, next) => {
    const deleted = deleteFromDatabasebyId('ideas', req.params.ideasId);
    if (deleted) {
        res.status(204)
    } else {
        res.status(500)
    }
    res.send();
  });