const fs = require('fs');
const jschardet = require('jschardet');

const util = require('util');
const exec = util.promisify(require('child_process').exec);



async function encoding(path, sub) {
  const buffer = fs.readFileSync(path+sub);

  const result = jschardet.detect(buffer);
  const isUTF8 = result ? result.encoding !== 'UTF-8' : false;


  return new Promise((resolve, reject) => {

    if(isUTF8){

      fs.rename(path+sub, path+'old-'+sub, async err => {
      
        if (err) reject(err);
      
        else {

          try {
            await run(`powershell.exe -Command "Get-Content -Path '${path+'old-'+sub}' -Encoding Default | Set-Content -Path '${path+sub}' -Encoding UTF8"`);

          } catch (err) {
            console.error(err);
          };

          resolve();
        };
      });

    } else {
      resolve();

    };

  });
};

async function run(command) {
  try {
    return { stdout, stderr } = await exec(command);

  } catch (err) {
    console.error(err);

  };
};


module.exports = encoding;