const fs = require('fs');
const path = require('path');

const error = require('../utils/error');
const { rejects } = require('assert');

const folders = fs.readdirSync(`./files/subs`);

( async () => {

  if( !folders[0] ){
    error('Nenhuma legenda encontrada');

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

    changeSubs(0);
  }
})()


async function changeSubs(i){
  const folder = folders[i];
  
  fs.appendFileSync('log.txt', `\n Subs: ${folder} \n\n` );

  console.log('');
  console.log('Subs: '+folder);
  console.log('');
  console.log('');


  const fileDir = './files/subs/'+folder;
  const outputDir = './files/output/'+folder;


  const subFolders = fs.readdirSync(fileDir, { withFileTypes: true })
   .filter(dirent => dirent.isDirectory())
   .map(dirent => dirent.name);

  
  const promise = subFolders.map( subFolder => {

    return new Promise((resolve, reject) => {

      fs.appendFileSync('log.txt', `\n ${subFolder}.srt` );

      console.log(``)
      console.log('')

      const inputDir = path.join(fileDir, subFolder);
      const file = fs.readdirSync(inputDir)[0];

      const name = `${subFolder}.srt`;
      const inputPath = path.join(inputDir, file);
      const outputPath = path.join(outputDir, name);

      fs.copyFileSync(inputPath, outputPath);

      resolve();

    })
  })

  await Promise.all(promise)

  if( folders[i + 1] ) changeSubs(i + 1);
};