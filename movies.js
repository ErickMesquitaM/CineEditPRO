const { getMovies, getNames } = require("./scripts/getFiles");
const { createMovie } = require("./scripts/createMovie");

const movies = getMovies()

createMovie(movies)