const fs = require('fs');
const { exec } = require("child_process");

const { extVideos, extImgs, extSubs } = require('../utils/ext');
const getExt = require('../utils/getExt');
const finish = require('../utils/movies/finish');
const error = require('../utils/error');

const commandMovie = require('../utils/movies/cmd');
const encoding = require('../utils/subs/encoding');
const getSubsOfVideos = require('../utils/subs/getSubsVideos');
const createSubs = require('../utils/subs/createSubs');
const verifySubs = require('../utils/subs/verifySubs');


const videos = fs.readdirSync(`./files/movies/`);


if( !videos[0] ) {
  error('Nenhum filme encontrado');

} else {
  createMovie(0)
};


async function createMovie(i){

  const path = videos[i]

  const files = fs.readdirSync(`./files/movies/${path}`);
  const video = files.find( file => extVideos.includes( getExt(file) ) );

  console.log(`${i+1} - ${path}`);

  fs.appendFileSync('log.txt', `\n ${i+1} - ${path} \n\n` );


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
    var arrSubsVideos = undefined;

    fs.appendFileSync('log.txt', ` ARQUIVOS: ${files}` );

    fs.appendFileSync('log.txt', `\n pegou todos os arquivos necessário` );


    const subsOfVideo = getSubsOfVideos(`files/movies/${path}/${video}`).then( value => arrSubsVideos = value ).catch( err => console.error(err));

    await Promise.all([subsOfVideo]);



    if(arrSubsVideos !== undefined){
      fs.appendFileSync('log.txt', `\n teve legenda no filme` );
      fs.appendFileSync('log.txt', `\n ${arrSubsVideos}` );

      const createSubsOfVideo = arrSubsVideos.map( async (sub, i) => {
        try {
          await createSubs(`files/movies/${path}`, `files/movies/${path}/${video}`, subs, sub, i);
        
        } catch (err) {
          console.error(err);
        };
      });
      

      await Promise.all(createSubsOfVideo);

      fs.appendFileSync('log.txt', `\n criou as legendas já existentes no filme` );


      const verifySubsSizes = verifySubs(`files/movies/${path}`, arrSubsVideos, subs);
            
      await Promise.all([verifySubsSizes]);

      fs.appendFileSync('log.txt', `\n verificou sê não tem nenhuma vazia` );


    } else {
      fs.appendFileSync('log.txt', `\n não teve legenda no filme` );

    }


    const encodingSubs = subs.map( async sub => {
      try {
        await encoding('files/movies/'+path+'/', sub);
        fs.appendFileSync('log.txt', `\n ${path+'/', sub} = codificada em UTF-8 ` );
      
      } catch (err) {
        fs.appendFileSync('log.txt', `\n ${err}` );
        console.error(err);
      };
    });

    fs.appendFileSync('log.txt', `\n terminou de codificar as legendas em UTF-8 \n` );

    await Promise.all(encodingSubs);


    
    setTimeout(() => {
      exec( commandMovie(path, video, cover, subs), err => finish(createMovie, videos, i, err));
        
    }, 2000);
  };
};