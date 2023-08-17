const minionsRouter = require('express').Router();

module.exports = minionsRouter;

const { 
    addToDatabase,
    getAllFromDatabase,
    getFromDatabaseById,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
  } = require('./db');

minionsRouter.param('minionId', (req, res, next, id) => {
const minion = getFromDatabaseById('minions', id);
if(minion) {
    req.minion = minion;
    next();
} else {
    res.status(404).send();
}
});

minionsRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('minions'));
});

minionsRouter.post('/', (req, res, next) => {
    const newMinion = addToDatabase('minions', req.body);
    res.status(201).send(newMinion);
});

