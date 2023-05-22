const fs = require('fs');
const { exec } = require("child_process");

const getExt = require('../utils/getExt');
const error = require('../utils/error');
const { extVideos } = require('../utils/ext');

const readSubs = require('../utils/tv-show/readSubs');
const finish = require('../utils/tv-show/finish');
const commandTvShow = require('../utils/tv-show/cmd');
const validate = require('../utils/tv-show/validate');

const encoding = require('../utils/subs/encoding');

var options = null;

if( process.argv[2] ){
  options = JSON.parse(process.argv[2])
};

const seasons = fs.readdirSync(`./files/tv-show/`).filter( season => season !== 'options.js');


( async () => {
  if( !seasons[0] ) return error('Nenhuma série encontrada');

  const promise = seasons.map( season => {

    try {
      fs.readdirSync(`./files/output/${season}`)

    } catch {
      fs.mkdir(`./files/output/${season}`, { recursive: true }, err => {
        if (err) console.error(err);
      });

    };
  });

  await Promise.all(promise);

  createTvShow(0);
} )();



async function createTvShow(iSe){

  const path = seasons[iSe];
  const files = fs.readdirSync(`./files/tv-show/${path}/`);

  const namesCharacters = fs.readFileSync(`./files/tv-show/${path}/names.txt`, 'utf8').split(/\r?\n/);
  const videos = files.filter( file => extVideos.includes( getExt(file) ) );
  const subs = readSubs(path);

  const names = namesCharacters.map( name => name.replace(/[<>:"/\\|?*\x00-\x1F]/g, '') );


  console.log('');
  console.log('');
  console.log(seasons[iSe]);
  console.log('');

  
  fs.appendFileSync('log.txt', `\n\n ${seasons[iSe]}\n` );


  if( validate(names, videos, subs) !== true) {
    error('Numero de items incorreto');

    var msnSubs = '';

    subs.map(sub => {
      msnSubs+= `"${sub.pathName}": ${sub.subs.length}, `;
    });

    console.log(`nomes: ${names.length}, videos: ${videos.length}, subs: {${msnSubs}}`);

    fs.appendFileSync('log.txt', `Problemas na quantidade de arquivos \n nomes: ${names.length}, videos: ${videos.length}, subs: {${msnSubs}} \n` );
    

    if(seasons[iSe + 1]) {
      createTvShow(iSe + 1);
    } 
  
  } else {

    fs.appendFileSync('log.txt', `\n Codificando as legendas ` );


    const encodingSubs = subs.map( async item => {

      return new Promise((resolve, reject) => {

        item.subs.map( async sub =>{
          try {
            await encoding(`/files/tv-show/${path}/${item.pathName}/`, sub);
            fs.appendFileSync('log.txt', `\n ${item.pathName+'/', sub} = codificado em UTF-8` );
            resolve();
        
          } catch (err) {
            console.error(err);
            fs.appendFileSync('log.txt', `\n ${err} \n` );

            reject();

          };
        });
      });
    });

    await Promise.all(encodingSubs);
    fs.appendFileSync('log.txt', `\n Terminou a codificação das legendas \n\n` );


    const handler = options.find(opt => opt.name === path);

    if(handler){
      createEpisode(0, Number(handler.index));

    } else {
      createEpisode(0);
    };
  };



  function createEpisode(iEp, epInit){
    var numEp = epInit ? iEp + epInit : iEp;

    console.log(numberEp(numEp) + ' - ' + names[iEp]);

    fs.appendFileSync('log.txt', `\n ${numberEp(numEp) + ' - ' + names[iEp]} \n` );


    setTimeout(() => {
      exec(
        commandTvShow( path, names, videos, subs, iEp, numEp ),
        err => finish(createEpisode, createTvShow, videos, seasons, iEp, iSe, epInit ? true : false, err)
      );

    }, 5000);
  };
};



function numberEp(i){
  if(i < 9) return '0'+ (i + 1);
  else return String(i + 1);
};