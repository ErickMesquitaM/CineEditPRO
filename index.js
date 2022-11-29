const { getNames, getFiles } = require("./scripts/getFiles");
const addSubs = require("./scripts/addSubs");

const names = getNames()
const videos = getFiles('videos')
const subsPT = getFiles('pt')
const subsEN = getFiles('EN')

addSubs(names, videos, subsPT, subsEN)