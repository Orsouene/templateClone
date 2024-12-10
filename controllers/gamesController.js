const games = require("../models/games");
const CustomError = require("../classes/CustomError");

function index(req, res) {
  const response = {
    totalCount: games.length,
    data: [...games],
  };
  res.json(response);
}

function show(req, res) {
  const id = parseInt(req.params.id);
  const item = games.find((item) => item._id === id);
  if (!item) {
    throw new CustomError("L'elemento non esiste", 404);
  }
  res.json({ success: true, item });
}

function store(req, res) {
  let newId = 0;
  for (let i = 0; i < games.length; i++) {
    if (games[i]._id > newId) {
      newId = games[i]._id;
    }
  }
  newId += 1;

  // new data is in req.body
  const newItem = {
    _id: newId,
    title: req.body.title,
  };

  games.push(newItem);
  res.status(201).json(newItem);
}

function update(req, res) {
  const id = parseInt(req.params._id);
  const item = games.find((item) => item._id === id);
  if (!item) {
    throw new CustomError("L'elemento non esiste", 404);
  }

  //console.log(req.body);
  for (key in item) {
    if (key !== "_id") {
      item[key] = req.body[key];
    }
  }

  //console.log(games);
  res.json(item);
}
function destroy(req, res) {
  const id = parseInt(req.params._id);
  const index = games.findIndex((item) => item._id === id);
  if (index !== -1) {
    games.splice(index, 1);
    res.sendStatus(204);
  } else {
    throw new CustomError("L'elemento non esiste", 404);
  }
}

module.exports = { index, show, store, update, destroy };
