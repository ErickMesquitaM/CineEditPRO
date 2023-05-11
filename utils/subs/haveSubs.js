const { exec } = require('child_process');


function haveSubs(path) {

  return new Promise((resolve, reject) => {

    exec(`ffprobe -v quiet -print_format json -show_format -show_streams "${path}"`, (error, stdout) => {
      
      if (error) {
        console.error(`Erro ao executar o comando ffprobe: ${error.message}`);
        return reject();
      };
    
      const videoInfo = JSON.parse(stdout);
    
      const hasSubtitles = videoInfo.streams.some(stream => stream.codec_type === 'subtitle');

      console.log(hasSubtitles)

      resolve(hasSubtitles);
    });
  });
};



module.exports = haveSubs;