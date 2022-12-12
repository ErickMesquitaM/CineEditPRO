const { getNames, getTvShow } = require("./scripts/getFiles");
const createTvShow = require("./scripts/createTvShow");

const names = getNames()
const videos = getTvShow('videos')
const subsPT = getTvShow('pt')
const subsEN = getTvShow('en')

createTvShow(names, videos, subsPT, subsEN)