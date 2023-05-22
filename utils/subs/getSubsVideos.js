const { exec } = require('child_process');
const error = require('../error');


function getSubsOfVideos(pathVideo) {

  return new Promise((resolve, reject) => {

    exec(`ffprobe -v quiet -print_format json -show_format -show_streams "${pathVideo}"`, (err, stdout) => {
      
      if (err) {
        console.error(err);
        return reject();
      };
    
      const videoInfo = JSON.parse(stdout);
  
      const subsInfo = videoInfo.streams.filter(info => info.codec_type === 'subtitle');


      if(subsInfo[0]){

        const subs = [];
        
        subsInfo.forEach( (sub,i) => {
          if( sub.codec_name === 'subrip'){
            subs.push(`${sub.tags.language}_${i}.srt`);

          } else {
            error('legenda "'+sub.codec_name+'" não é compativel.');
          };

        });

        resolve(subs);
  
      } else {
        resolve();

      };
    });
  });
};


module.exports = getSubsOfVideos;