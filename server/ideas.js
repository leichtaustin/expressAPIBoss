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

  