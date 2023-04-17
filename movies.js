const fs = require('fs');
const { exec } = require("child_process");

const { extVideos, extImgs, extSubs } = require('./utils/ext');
const getExt = require('./utils/getExt');
const finish = require('./utils/movies/finish');
const error = require('./utils/error');

const { commandMovie } = require('./utils/commands');

createMovie(0)


function createMovie(i){
  const videos = fs.readdirSync(`./files/movies/`);
  const path = videos[i]

  console.log(`${i+1} - ${path}`);

  const files = fs.readdirSync(`./files/movies/${path}`);

  const video = files.find( file => extVideos.includes( getExt(file) ) )


  if(!video){
    error(`Nenhum video encontrado na pasta "${path}"`);

    if(videos[i + 1]){
      createMovie(i + 1);

    } else {
      console.log('');
      console.log('⚠️ TODOS ACABADOS, MAS TEVE ALGUM ERRO ⚠️');
    };
    
  } else {

    const cover = files.find( file => extImgs.includes( getExt(file) ) );
    const subs = files.filter( file => extSubs.includes( getExt(file) ) );

    exec( commandMovie(path, video, cover, subs), err => finish(createMovie, videos, i, err));
  };
};

// arrumar a foto de capa, para que a nova substitua antiga