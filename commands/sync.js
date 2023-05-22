const fs = require('fs');

const encoding = require('../utils/subs/encoding');
const synchronization = require('../utils/subs/synchronization');

const error = require('../utils/error');

const folders = fs.readdirSync('./files/subs/');

var argv = process.argv.slice(2)[0].split('=')[1];


( async () => {

  if( !argv || isNaN(argv)  ){
    console.log('argumento: '+argv)
    error('SEM MILISSEGUNDOS PARA AUTERAR')

  } else if(!folders[0]){
    error('SEM PASTA DE LEGENDAS')

  } else {

    const promise = folders.map( folder => {

      try {
        fs.readdirSync(`./files/output/${folder}`)

      } catch {
        fs.mkdir(`./files/output/${folder}`, { recursive: true }, err => {
          if (err) console.error(err);
        });

      };
    });

    await Promise.all(promise);

    argv = Number( argv );

    sync(0);
  };
})();



async function sync(i){
  const path = folders[i];

  console.log('');
  console.log(path);
  console.log('');

  fs.appendFileSync('log.txt', `\n ${path} \n` );


  const subs = fs.readdirSync('./files/subs/'+path+'/');

  if(!subs[0]) {
    error('SEM LEGENDAS NA PASTA "'+ path +'"')
    fs.appendFileSync('log.txt', ` SEM LEGENDAS NA PASTA \n\n` );

    next(i);

  } else {

    const encodingSubs = subs.map( async sub => {

      return new Promise( async (resolve, reject) => {

        try {
          await encoding(`./files/subs/${path}/`, sub);
          fs.appendFileSync('log.txt', ` ${sub} = UTF-8 \n` );
          resolve();
        
        } catch (err) {
          fs.appendFileSync('log.txt', `\n\n ${err}\n` );
          console.error(err);
          reject();
        }
      });
    });

    await Promise.all(encodingSubs);

    fs.appendFileSync('log.txt', `\n terminou a codificação \n\n` );



    const changeSub = subs.map( async sub => {

      return new Promise( async (resolve, reject) => {

        try {
          await synchronization(path, sub, argv);
          fs.appendFileSync('log.txt', ` ${sub} = SINCRONIZADO  \n` );
          
          resolve();
        
        } catch (err) {
          fs.appendFileSync('log.txt', `\n ${err} \n` );
          console.error(err);
          reject();
        }
      });

    });

    await Promise.all(changeSub);

    fs.appendFileSync('log.txt', `\n todos sincronizados \n` );

    setTimeout( async () => {
      next(i);
    }, 3000);
  }
};

function next(i){

  if( folders[i + 1] ){
    fs.appendFileSync('log.txt', `\n --------------------------------------------- \n` );
    sync(i + 1);
  
  } else {
    fs.appendFileSync('log.txt', `\n ============================================== \n` );

    console.log('');
    console.log('✅ TODOS ACABADOS ✅');
    console.log('');
  }
}