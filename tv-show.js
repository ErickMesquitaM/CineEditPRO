const fs = require('fs');
const { exec } = require("child_process");

const getExt = require('./utils/getExt');
const error = require('./utils/error');
const { extVideos } = require('./utils/ext');

const readSubs = require('./utils/tv-show/readSubs');
const finish = require('./utils/tv-show/finish');
const commandTvShow = require('./utils/tv-show/cmd');
const validate = require('./utils/tv-show/validate');

const options = require('./files/tv-show/options');
const seasons = fs.readdirSync(`./files/tv-show/`).filter( season => season !== 'options.js');


if( !seasons[0] ) {
  error('Nenhuma série detectada');

} else {
  createFolders()
  createTvShow(0);
};


function createTvShow(iSe){

  const path = seasons[iSe];
  const files = fs.readdirSync(`./files/tv-show/${path}/`);

  const names = fs.readFileSync(`./files/tv-show/${path}/names.txt`, 'utf8').split(/\r?\n/);
  const videos = files.filter( file => extVideos.includes( getExt(file) ) );
  const subs = readSubs(path);

  console.log(seasons[iSe]);
  console.log('');

  if( validate(names, videos, subs) !== true) {
    error('Numero de items incorreto');

    if(seasons[iSe + 1]) {
      console.log('');
      nextSeason(iSe + 1);
    } 
  } else if(options[0]){
    const handler = options.find(opt => opt.season === path);

    if(handler){
      createEpisode(0, Number(handler.index));

    } else {
      createEpisode(0);
    };

  } else{
    createEpisode(0);
  };

  function createEpisode(iEp, epInit){
    var numEp = epInit ? iEp + epInit : iEp;

    console.log(numberEp(numEp) + ' - ' + names[iEp]);

    exec(
      commandTvShow( path, names, videos, subs, iEp, numEp ),
      err => finish(createEpisode, createTvShow, videos, seasons, iEp, iSe, epInit ? true : false, err)
    );
  };
};


function createFolders() {

  seasons.map( season => {
  
    try {
      fs.readdirSync(`/files/output/${season}`)

    } catch {
      fs.mkdir(`files/output/${season}`, { recursive: true }, err => {
        if (err) throw err;
      });

    };
  });
};


function numberEp(i){
  if(i < 9) return '0'+ (i + 1);
  else return String(i + 1);
};