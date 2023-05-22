const { exec } = require('child_process');
const fs = require('fs');

function createSubs(path, video, subs, sub, i) {

  return new Promise((resolve, reject) => {

    exec(`ffmpeg -y -i "${video}" -map 0:s:${i} "${path}/${sub}"`, err => {
      
      if (err) {
        console.error(err);
        return reject();
      };


      resolve();
    });
  });
};


module.exports = createSubs;