const movies = require("../models/movies");
const CustomError = require("../classes/CustomError");

function index(req, res) {
  const response = {
    totalCount: movies.length,
    data: [...movies],
  };
  res.json(response);
}

function show(req, res) {
  const id = parseInt(req.params.id);
  const item = movies.find((item) => item._id === id);
  if (!item) {
    throw new CustomError("L'elemento non esiste", 404);
  }
  res.json({ success: true, item });
}

function store(req, res) {
  let newId = 0;
  for (let i = 0; i < movies.length; i++) {
    if (movies[i]._id > newId) {
      newId = movies[i]._id;
    }
  }
  newId += 1;

  // new data is in req.body
  const newItem = {
    _id: newId,
    title: req.body.title,
  };

  movies.push(newItem);
  res.status(201).json(newItem);
}

function update(req, res) {
  const id = parseInt(req.params._id);
  const item = movies.find((item) => item._id === id);
  if (!item) {
    throw new CustomError("L'elemento non esiste", 404);
  }

  //console.log(req.body);
  for (key in item) {
    if (key !== "_id") {
      item[key] = req.body[key];
    }
  }

  //console.log(movies);
  res.json(item);
}
function destroy(req, res) {
  const id = parseInt(req.params._id);
  const index = movies.findIndex((item) => item._id === id);
  if (index !== -1) {
    movies.splice(index, 1);
    res.sendStatus(204);
  } else {
    throw new CustomError("L'elemento non esiste", 404);
  }
}

module.exports = { index, show, store, update, destroy };
