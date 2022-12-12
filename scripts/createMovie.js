const fs = require('fs');
const { exec } = require("child_process");

const { getFileMovies, getSubsMovie } = require("../scripts/getFiles");


const typesVideos = ['avi','mp4','mkv','m4v','wmv','mov','mpg','mpeg','asf'];
const typesImgs = ['jpg','png','svg','webp','psd'];


function createMovie(videos){
  edit(videos[0], 0);

  function edit(path, i){
    const files = fs.readdirSync(`./files/movies/${path}`);

    var video = getFileMovies(files, typesVideos)[0];
    var subPT = getSubsMovie(files, 'pt')[0];
    var subEN = getSubsMovie(files, 'en')[0];
    var cover = getFileMovies(files, typesImgs)[0];

    console.log(String(i+1) + ' - ' + path);

    const progress = exec( cmd(path) , (err, output) => {
      if (err) throw console.error(err);

      console.log('   ✅');
      console.log('');

      if(videos[i + 1]){
        edit(videos[i + 1], i + 1)
      } else {
        console.log('')
        console.log('')
        console.log('TODOS ACABADOS   ✅')
        console.log('')
      }

    });

    
    progress.stderr.on('data', data => {
      var words = data.split(' ');
      var numberIndex = words.findIndex( (word) => word.startsWith('time') );

      if(numberIndex !== -1){
        process.stdout.clearLine(0);
        process.stdout.cursorTo(0);
        process.stdout.write( words[numberIndex].slice(5) );
      };
    });


    function cmd(path){
      const fils = `-i "files/movies/${path}/${video}" -i "files/movies/${path}/${cover}" -i "files/movies/${path}/${subPT}" -i "files/movies/${path}/${subEN}" `;
      const opts = '-c:v copy -c:a copy -c:s mov_text -map 1 -map 0:v -map 0:a -map 2 -map 3 ';
      const lang = '-metadata:s:s:0 language=por -metadata:s:s:1 language=eng ';
      const outp = `"files/output/${path}.mp4"`;

      return 'ffmpeg -y '+ fils + opts + lang + outp;
    };
  };
};


module.exports = { createMovie };