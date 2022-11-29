const fs = require('fs')

function getNames(){
  return fs.readFileSync('./files/input/names.txt', 'utf8').split(/\r?\n/)
}

function getFiles(path){
  return fs.readdirSync(`./files/input/${path}/`);
}


module.exports = { getNames, getFiles }