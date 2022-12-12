const fs = require('fs');


function getNames(){
  return fs.readFileSync(`./files/tv-show/names.txt`, 'utf8').split(/\r?\n/)
};

function getTvShow(path){
  return fs.readdirSync(`./files/tv-show/${path}/`);
};



function getMovies(){
  return fs.readdirSync(`./files/movies/`);
};

function getFileMovies(files, arr){

  return files.filter( file => {
    let typeFile = file.split('.').at(-1);

    for( type of arr ){
      if(type === typeFile) return true;
    };

    return false;
  });
};

function getSubsMovie(files, name){
  return files.filter( file => file.split('.')[0] === name );
};


module.exports = { getNames, getTvShow, getMovies, getFileMovies, getSubsMovie };